import KanvasCore from "@kanvas/core";
import { PropsWithChildren } from "react";
import { StylesConfigTypes } from "./default-styles-config";

export interface Configuration {
  sdk?: KanvasCore;
}

export interface CoreProps extends PropsWithChildren {
  sdk: KanvasCore;
}

export interface CoreClientProps extends CoreProps {
  stylesConfig?: StylesConfigTypes;
}

export interface ConfigurationClient extends Configuration {
  stylesConfig: StylesConfigTypes;
}