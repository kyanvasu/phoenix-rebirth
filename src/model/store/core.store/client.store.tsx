import React, { createContext, useContext, useEffect, useState } from "react";
import { ConfigurationClient, CoreClientProps } from "../../types";
import { BaseTheme } from "../../../theme";

const CoreContext = createContext<ConfigurationClient>({
  sdk: undefined,
  theme: BaseTheme,
});

/**
 * Client component that handles the initial configuration of the package
 * @param props required properties
 * @returns JSX.Element
 */
export function ClientCoreStore({
  sdk,
  theme,
  children,
}: CoreClientProps) {
  const [data, setData] = useState<ConfigurationClient>({
    sdk,
    theme: BaseTheme,
  });

  useEffect(() => {
    setData({ sdk, theme: theme ?? BaseTheme });
  }, [sdk, theme]);

  return <CoreContext.Provider value={data}>{children}</CoreContext.Provider>;
}

export function useClientContext() {
  const context = useContext(CoreContext);
  return context;
}
