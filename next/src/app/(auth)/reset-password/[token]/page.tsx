"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { ResetPasswordPage } from "@kanvas/phoenix/views/auth/reset-password";

export default function EmailPage() {
  const router = useRouter();
  const params = useParams();
  return <ResetPasswordPage params={params.token} router={router} />;
}
