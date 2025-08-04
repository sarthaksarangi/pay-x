"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import p2pTransfer from "../app/lib/actions/p2pTransfer";

export default function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState<number>(0);
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
          onChange={(amount) => setAmount(Number(amount))}
        />
        <div className="pt-4 flex justify-center">
          <Button
            onClick={async () => {
              await p2pTransfer(number, Number(amount) * 100);
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
}
