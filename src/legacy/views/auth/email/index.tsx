import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import EmptyState from "@/legacy/components/molecules/empty-state";
import { useClientContext } from "@/client";
import { translate } from "@/translate";
import React from "react";

interface props {
  router: AppRouterInstance;
  params: string;
  img?: string;
}

export function useEmailPage({ router, params }: props) {
  const email = decodeURIComponent(params);

  const message = translate("auth.resetPassword.emailSent", { email });

  const handleClick = () => {
    router.push("/sign-in");
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
        image={img ?? ""}
        title={translate("auth.sendEmail.sendTitle")}
        subtitle={models.message}
        label={translate("auth.resetPassword.buttonLabel")}
        onClick={operations.handleClick}
        showButton
      />
    </section>
  );
}
