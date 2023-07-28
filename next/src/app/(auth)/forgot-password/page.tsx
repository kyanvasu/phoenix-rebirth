'use client';
import { Auth } from '@kanvas/phoenix/client';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  return <Auth.ForgotPasswordPage router={router} />;
}
