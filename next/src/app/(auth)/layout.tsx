import AuthLayout from "@kanvas/phoenix/legacy/templates/auth-layout";
import React from "react";

export default function AuthLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout
      backgroundImage={
        <img
          src="https://agent-platform.vercel.app/_next/image?url=%2Fbackgrounds%2Flogin.jpg&w=1920&q=75&dpl=dpl_6XpLGimjoibSLGwr7Gxouqqntusr"
          alt=""
          className="bg-cover w-full h-full"
        />
      }
    >
      {children}
    </AuthLayout>
  );
}
