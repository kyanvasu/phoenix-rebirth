"use client";

import { ClientCoreStore } from "@kanvas/phoenix/client";
import { PropsWithChildren } from "react";
import { sdk } from "./layout";
import { Provider } from "jotai";
import { BaseTheme } from "@kanvas/phoenix/theme";
import { ThemeTypes } from "@kanvas/phoenix/model/types/theme.config";

export default function RootClientLayout({ children }: PropsWithChildren) {
  const customStylesConfig: ThemeTypes = {
    ...BaseTheme,
    emptyState: {
      ...BaseTheme.emptyState,
      title: "font-semibold text-base-neutral-grey-50",
    },
  };
  return (
    <Provider>
      {/* @ts-ignore */}
      <ClientCoreStore sdk={sdk} theme={customStylesConfig}>
        {/* @ts-ignore */}
        <>{children}</>
      </ClientCoreStore>
    </Provider>
  );
}
