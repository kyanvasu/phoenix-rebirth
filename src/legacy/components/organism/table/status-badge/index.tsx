import { StatusBadgeTypes } from "../../../../../model/types";
import { BaseTheme } from "../../../../../theme";
import { Badge } from "../../../atoms/badge";
import { PropsWithChildren } from "react";
import classNames from "classnames";

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
