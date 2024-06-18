import { createContext, useContext } from "react";
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
export function ClientCoreStore({ sdk, theme, children }: CoreClientProps) {
  return (
    <CoreContext.Provider
      value={{
        sdk,
        theme: theme ?? BaseTheme,
      }}
    >
      {children}
    </CoreContext.Provider>
  );
}

export function useClientContext() {
  const context = useContext(CoreContext);
  return context;
}
