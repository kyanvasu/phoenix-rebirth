
import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useClientContext } from '../../../model/store/core.store/client.store';
import EmptyState from '../../../components/molecules/empty-state';
import { translate } from '../../../translate';

interface props {
  router: AppRouterInstance;
  params: string;
  img?: string;
}

export function useEmailPage({ router, params }: props) {
  const email = decodeURIComponent(params);

  const message = translate('auth.resetPassword.emailSent', { email });

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
export function EmailPage({ router, params, img }: props) {
  const { models, operations } = useEmailPage({ router, params });
  const { theme } = useClientContext();
  return (
    <section className={theme.auth.container}>
      <EmptyState
        theme={theme.auth.emptyState}
        image={img ?? ''}
        title={translate('auth.sendEmail.sendTitle')}
        subtitle={models.message}
        label={translate('auth.resetPassword.buttonLabel')}
        onClick={operations.handleClick}
        showButton
      />
    </section>
  );
}
