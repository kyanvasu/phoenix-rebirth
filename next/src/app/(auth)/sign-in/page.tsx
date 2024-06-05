"use client";
import React from "react";
import { LoginPage } from "@kanvas/phoenix/views/(auth)/login";
import { useRouter } from "next/navigation";

export default function LoginPagep() {
  const router = useRouter();
  return <LoginPage redirect={() => router.push("/home")} />;
}
