import React, { createContext, useContext, useEffect, useState } from 'react';
import { Configuration, CoreProps } from '../../types';

const CoreContext = createContext<Configuration>({
  sdk: undefined
});

/**
 * Client component that handles the initial configuration of the package
 * @param props required properties
 * @returns JSX.Element
 */
export function ClientCoreStore({ sdk, children }: CoreProps) {
  const [data, setData] = useState<Configuration>({ sdk: undefined });

  useEffect(() => {
    setData({ sdk });
  }, [sdk]);
  
  return (
    <CoreContext.Provider value={data}>
      {children}
    </CoreContext.Provider>
  );
}

export function useClientContext() {
  const context = useContext(CoreContext);
  return context;
}