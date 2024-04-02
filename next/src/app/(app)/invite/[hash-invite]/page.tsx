'use client';
import React from 'react';
import { Auth } from '@kanvas/phoenix/client';
import { useParams, useRouter } from 'next/navigation';

export default function Invite() {
  const params = useParams();
  const hash: string = params['hash-invite'];
  const router = useRouter();
  return (
    <>
      <Auth.InvitePage redirect={() => router.push('/dashboard')} hash={hash} allow_phone/>
    </>
  );
}
