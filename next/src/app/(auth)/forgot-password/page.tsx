"use client";
import { ForgotPasswordPage } from "@kanvas/phoenix/views/(auth)/forgot-passowrd";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPagE() {
  const router = useRouter();
  return <ForgotPasswordPage router={router} />;
}
