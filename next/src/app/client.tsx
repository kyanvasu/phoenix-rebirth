"use client";

import { ClientCoreStore } from "@kanvas/phoenix/client";
import { PropsWithChildren } from "react";
import { sdk } from "./layout";
import { Provider } from "jotai";
import { BaseTheme } from "@kanvas/phoenix";
import { ThemeTypes } from "@kanvas/phoenix/model/types/theme.config";

export default function RootClientLayout({ children }: PropsWithChildren) {
  const customStylesConfig: ThemeTypes = {
    emptyState: {
      ...BaseTheme.emptyState,
      title: "font-semibold text-base-neutral-grey-50",
    },
  };
  return (
    <Provider>
      <ClientCoreStore sdk={sdk} theme={customStylesConfig}>
        <>{children}</>
      </ClientCoreStore>
    </Provider>
  );
}
