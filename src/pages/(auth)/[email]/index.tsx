import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { EmptyState } from '../../../components/molecules';

interface props {
  router: AppRouterInstance;
  params: string;
}

function useEmailPage({ router, params }: props) {
  const email = decodeURIComponent(params);

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
export function EmailPage({ router, params }: props) {
  const { models, operations } = useEmailPage({ router, params });
  return (
    <section className='mb-24'>
      <EmptyState
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
