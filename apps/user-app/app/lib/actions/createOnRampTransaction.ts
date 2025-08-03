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

  const transaction = await prisma.onRampTransaction.create({
    data: {
      userId: Number(session.user.id),
      status: "Processing",
      startTime: new Date(),
      token: token,
      amount: amount * 100,
      provider,
    },
  });

  if (transaction) {
    return {
      message: "Success",
    };
  }
  console.log(transaction);
  return {
    error: "Error while processing transaction.",
  };
}
