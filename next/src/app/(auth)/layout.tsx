import { Templates } from '@kanvas/phoenix';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Templates.AuthLayout
      backgroundImage={
        <img
          src='https://agent-platform.vercel.app/_next/image?url=%2Fbackgrounds%2Flogin.jpg&w=1920&q=75&dpl=dpl_6XpLGimjoibSLGwr7Gxouqqntusr'
          alt=''
          className='bg-cover w-full h-full'
        />
      }
    >
      {children}
    </Templates.AuthLayout>
  );
}
