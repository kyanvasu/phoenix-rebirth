import KanvasCore from "@kanvas/core";
import { PropsWithChildren } from "react";
import { ThemeTypes } from "./theme.config";

export interface Configuration {
  sdk?: KanvasCore;
}

export interface CoreProps extends PropsWithChildren {
  sdk: KanvasCore;
}

export interface CoreClientProps extends CoreProps {
  theme?: ThemeTypes;
}

export interface ConfigurationClient extends Configuration {
  theme: ThemeTypes;
}