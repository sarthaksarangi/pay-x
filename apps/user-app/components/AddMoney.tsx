"use client";

import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Select } from "@repo/ui/select";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";
import { useRouter } from "next/navigation";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

const AddMoney = () => {
  const [amount, setAmount] = useState<number>(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [redirectURL, setRedirectURL] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const router = useRouter();

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChange={(amount) => {
            setAmount(Number(amount));
          }}
        />
      </div>
      <div className="py-4 text-left">Bank</div>
      <Select
        onSelect={(value) => {
          setRedirectURL(
            SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl
          );
          setProvider(
            SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
          );
        }}
        options={SUPPORTED_BANKS.map((x) => ({
          key: x.name,
          value: x.name,
        }))}
      />
      <div className="flex justify-center pt-4">
        <Button
          onClick={async () => {
            const res = await createOnRampTransaction(amount, provider);
            if (res.message === "Success") {
              router.refresh(); // 🔄 re-fetch server components
            }
          }}
        >
          Add Money
        </Button>
      </div>
    </Card>
  );
};

export default AddMoney;
