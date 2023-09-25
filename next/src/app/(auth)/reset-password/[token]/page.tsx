'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Auth } from '@kanvas/phoenix/client';

export default function EmailPage() {
  const router = useRouter();
  const params = useParams();
  return <Auth.ResetPasswordPage params={params.token} router={router} />;
}