'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Molecules } from '@kanvas/phoenix';

function useEmailPage() {
  const router = useRouter();
  const params = useParams();

  const email = decodeURIComponent(params.email);

  const message = `We've sent an email to ${email} 
  with password reset instructions..`;

  const handleClick = () => {
    router.push('/sign-in');
  };

  return {
    models: {
      message,
    },
    operations: {
      handleClick,
    },
  };
}
export default function EmailPage() {
  const { models, operations } = useEmailPage();
  return (
    <section className='mb-24'>
      <Molecules.EmptyState
        image='https://agent-platform.vercel.app/_next/image?url=%2Fimages%2Fimg_message_mail.png&w=256&q=75'
        title='An email was send'
        subtitle={models.message}
        label='Return to login'
        onClick={operations.handleClick}
        showButton
      />
    </section>
  );
}
