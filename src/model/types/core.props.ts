import KanvasCore from "@kanvas/core";
import { PropsWithChildren } from "react";

export interface CoreProps extends PropsWithChildren {
  sdk: KanvasCore;
}