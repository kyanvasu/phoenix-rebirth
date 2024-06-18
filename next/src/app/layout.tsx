import "./globals.css";
import KanvasCore from "@kanvas/core";
// import RootClientLayout from "./client";
// import { ServerCoreStore } from "@kanvas/phoenix/server";
import { PropsWithChildren } from "react";

export const sdk = new KanvasCore({
  key: "",
  url: "",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="flex min-h-screen min-w-full">{children}</body>
    </html>
  );
}
