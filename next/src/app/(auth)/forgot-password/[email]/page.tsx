"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { EmailPage } from "@kanvas/phoenix/views/auth/email";

export default function EmailPagE() {
  const router = useRouter();
  const params = useParams();
  return (
    <EmailPage
      params={params.email}
      router={router}
      //this url image is for testing purpouses
      img="https://agent-platform.vercel.app/_next/image?url=%2Fimages%2Fimg_message_mail.png&w=256&q=75"
    />
  );
}
