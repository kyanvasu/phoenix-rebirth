"use client";
import { RegisterPage } from "@kanvas/phoenix/views/(auth)/register";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  return <RegisterPage redirect={() => router.push("/home")} />;
}
