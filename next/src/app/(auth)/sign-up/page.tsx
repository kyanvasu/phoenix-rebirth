'use client';
import { Auth } from '@kanvas/phoenix/client';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  return <Auth.RegisterPage redirect={() => router.push('/home')} />;
}
