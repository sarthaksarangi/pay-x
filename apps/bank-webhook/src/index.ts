import express from "express";
import db from "@repo/db/client";
const app = express();
const PORT = 3003;
app.use(express.json());

app.post("/hdfc-webhook", async (req, res) => {
  try {
    // Handle HDFC webhook logic here
    console.log(req.body);
    const paymentInformation: {
      token: string;
      userId: string;
      amount: string;
    } = {
      token: req.body.token,
      userId: req.body.user_identifier,
      amount: req.body.amount,
    };

    //Update the balance in the database

    const data = await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
          locked: {
            decrement: Number(paymentInformation.amount),
          },
        },
      }),

      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
          amount: Number(paymentInformation.amount),
        },
      }),
    ]);
    res.json({
      data,
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
