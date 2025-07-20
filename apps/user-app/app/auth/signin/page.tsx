import { signIn, getSession } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
}
