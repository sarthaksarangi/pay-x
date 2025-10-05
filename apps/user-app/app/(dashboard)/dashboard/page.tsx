import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Home from "./Home";
import { getOnRampTransactions } from "../transfer/page";

export default async function () {
  const session = await getServerSession(authOptions);
  const transactions = await getOnRampTransactions();
  return (
    <div>
      <Home name={session?.user.name || ""} transactions={transactions} />
    </div>
  );
}
