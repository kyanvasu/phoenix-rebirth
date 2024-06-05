import React, { PropsWithChildren } from "react";
import { Badge } from "../../../atoms/badge";
import { StatusBadgeTypes } from "../../../../../model/types";
import classNames from "classnames";
import { BaseTheme } from "../../../../../theme";

interface Props extends PropsWithChildren {
  icon?: any;
  theme?: StatusBadgeTypes;
}

export function StatusBadge({ icon, children, theme }: Props) {
  return (
    <Badge
      icon={icon}
      reverse
      theme={{
        button: classNames(BaseTheme.badge.button, theme?.styles),
      }}
    >
      {children}
    </Badge>
  );
}
