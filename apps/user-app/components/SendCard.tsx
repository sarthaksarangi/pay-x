"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import p2pTransfer from "../app/lib/actions/p2pTransfer";
import { useRouter } from "next/navigation";

export default function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSend = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const result = await p2pTransfer(number, Number(amount) * 100);
      setMessage(result?.message || "Unknown error");

      if (result?.message === "Success") {
        router.refresh();
      }
    } catch (error) {
      setMessage("An error occurred");
      console.error("Transfer error:", error);
    } finally {
      setIsLoading(false);
      console.log("Debug:", {
        number,
        amount,
        isLoading,
        numberCheck: !number,
        amountCheck: !amount,
        amountNumberCheck: Number(amount) <= 0,
      });
    }
  };

  return (
    <Card title="P2P Transfer">
      <div className="min-w-72 pt-2">
        <TextInput
          type="tel"
          label="Number"
          placeholder="Enter the Phone Number"
          onChange={(num) => setNumber(num)}
        />
        <TextInput
          type="number"
          label="Amount"
          placeholder="Enter the Amount"
          onChange={(amt) => setAmount(Number(amt))}
        />

        {message && (
          <div
            className={`mt-2 p-2 rounded ${
              message === "Success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <div className="pt-4 flex justify-center">
          <Button onClick={handleSend} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
