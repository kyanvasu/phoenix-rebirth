import React, { createContext, useContext } from "react";
import { CoreProps } from "../types";
import KanvasCore from "@kanvas/core";

interface Configuration {
  sdk?: KanvasCore;
}

const CoreContext = createContext<Configuration>({
  sdk: undefined,
})

export default function CoreStore({ sdk, children }: CoreProps) {
  return (
    <CoreContext.Provider value={{ sdk }}>
      {children}
    </CoreContext.Provider>
  );
}

export const useCoreContext = useContext(CoreContext);