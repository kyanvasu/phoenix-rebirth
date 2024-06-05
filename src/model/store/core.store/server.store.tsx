import React from "react";
import { Configuration, CoreProps } from "../../types";
import { CoreContext } from "../../services/core.context";
import { BaseTheme } from "../../../theme";

/**
 * Server component that handles the initial configuration of the package
 * @param props required properties
 * @returns JSX.Element
 */
export function ServerCoreStore(
  { sdk, children, theme = BaseTheme }: CoreProps,
) {
  CoreContext.instance().set({ sdk, theme });
  return <>{children}</>;
}

export function useServerContext(): Configuration {
  const context = CoreContext.instance().get();
  return context;
}
