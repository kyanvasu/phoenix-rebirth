import React, { createContext, useContext, useEffect, useState } from "react";
import { ConfigurationClient, CoreClientProps } from "../../types";
import { DefaultStylesConfig } from "../../../theme";

const CoreContext = createContext<ConfigurationClient>({
  sdk: undefined,
  stylesConfig: DefaultStylesConfig,
});

/**
 * Client component that handles the initial configuration of the package
 * @param props required properties
 * @returns JSX.Element
 */
export function ClientCoreStore({
  sdk,
  stylesConfig,
  children,
}: CoreClientProps) {
  const [data, setData] = useState<ConfigurationClient>({
    sdk,
    stylesConfig: DefaultStylesConfig,
  });

  useEffect(() => {
    setData({ sdk, stylesConfig: stylesConfig ?? DefaultStylesConfig });
  }, [sdk, stylesConfig]);

  return <CoreContext.Provider value={data}>{children}</CoreContext.Provider>;
}

export function useClientContext() {
  const context = useContext(CoreContext);
  return context;
}
