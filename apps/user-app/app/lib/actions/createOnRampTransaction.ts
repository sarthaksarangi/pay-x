"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id) {
    return {
      message: "Unauthenticated Request",
    };
  }

  const token = (Math.random() * 1000).toString();

  const transaction = await prisma.$transaction(async (tx) => {
    const txnEntry = await tx.onRampTransaction.create({
      data: {
        userId: Number(session.user.id),
        status: "Processing",
        startTime: new Date(),
        token: token,
        amount: amount * 100,
        provider,
      },
    });

    const lockedBalUpdate = await tx.balance.update({
      where: {
        userId: Number(session.user.id),
      },
      data: {
        locked: Number(amount) * 100,
      },
    });
    console.log(txnEntry, lockedBalUpdate);

    if (txnEntry && lockedBalUpdate) {
      return {
        txnEntry,
        lockedBalUpdate,
      };
    }
  });

  if (transaction) {
    return {
      message: "Success",
    };
  } else
    return {
      error: "Error while processing transaction.",
    };
}
