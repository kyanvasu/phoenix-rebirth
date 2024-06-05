import classNames from "classnames";
import React from "react";
import { PropsWithChildren } from "react";
import { HelpText as IHelpText } from "../../../../model/types";
import { BaseTheme } from "../../../../theme";

interface props extends PropsWithChildren {
  error?: boolean;
  theme?: IHelpText;
}

export function HelpText({ children, error, theme }: props) {
  const styles = theme || BaseTheme.helpText;
  return <p className={classNames({ [styles.error]: error })}>{children}</p>;
}
