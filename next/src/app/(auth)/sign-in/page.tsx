'use client';
import React from 'react';
import { Auth } from '@kanvas/phoenix/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  return <Auth.LoginPage redirect={() => router.push('/home')} />;
}
