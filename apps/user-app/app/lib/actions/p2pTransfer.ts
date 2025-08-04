"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const fromUserId = session.user.id;
  if (!fromUserId) {
    return {
      message: "Error while sending.",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "No such user found",
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"  = ${Number(fromUserId)} FOR UPDATE`;
    const fromBalance = await tx.balance.findUnique({
      where: {
        userId: Number(fromUserId),
      },
    });

    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }
    const updatedFrom = await tx.balance.update({
      where: { userId: Number(fromUserId) },
      data: { amount: { decrement: amount } },
    });

    const updatedTo = await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });

    const txn = await tx.p2pTransfer.create({
      data: {
        amount: amount,
        timestamp: new Date(),
        toUserId: updatedTo.userId,
        fromUserId: updatedFrom.userId,
      },
    });
    return {
      from: updatedFrom,
      to: updatedTo,
      txn,
    };
  });
  console.log("result", result);
}
