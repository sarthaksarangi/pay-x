import express from "express";
import db from "@repo/db/client";
const app = express();
const PORT = 3003;

app.post("/hdfc-webhook", async (req, res) => {
  // Handle HDFC webhook logic here
  const paymentInfo = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  //Update the balance in the database
  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInfo.userId,
        },
        data: {
          amount: {
            increment: paymentInfo.amount,
          },
        },
      }),

      db.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "Success",
          amount: paymentInfo.amount,
        },
      }),
    ]);
    res.json({
      message: "Captured",
    });
  } catch (error) {
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
