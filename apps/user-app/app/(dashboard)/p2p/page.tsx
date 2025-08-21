import prisma from "@repo/db/client";
import SendCard from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import P2pTransactions from "../../../components/P2pTransactions";

async function getTransactions() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    console.log("No valid session");
    return [];
  }
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { toUserId: Number(session?.user?.id) },

        { fromUserId: Number(session?.user?.id) },
      ],
    },
    include: {
      fromUser: {
        select: {
          name: true,
        },
      },
      toUser: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log(transactions);
  return transactions.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    fromUser: t.fromUser?.name ?? "Unknown",
    toUser: t.toUser?.name ?? "Unknown",
  }));
}

export default async function Page() {
  const transactions = await getTransactions();

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        <SendCard />

        <P2pTransactions transactions={transactions} />
      </div>
    </div>
  );
}
