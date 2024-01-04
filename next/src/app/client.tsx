"use client";

import { ClientCoreStore } from "@kanvas/phoenix/client";
import { PropsWithChildren } from "react";
import { sdk } from "./layout";
import { Provider } from "jotai";
import { DefaultStylesConfig } from "@kanvas/phoenix";
import { StylesConfigTypes } from "@kanvas/phoenix/model/types/default-styles-config";

export default function RootClientLayout({ children }: PropsWithChildren) {
  const customStylesConfig: StylesConfigTypes = {
    emptyState: {
      ...DefaultStylesConfig.emptyState,
      title: "font-semibold text-base-neutral-grey-50",
    },
  };
  return (
    <Provider>
      <ClientCoreStore sdk={sdk} stylesConfig={customStylesConfig}>
        <>{children}</>
      </ClientCoreStore>
    </Provider>
  );
}
