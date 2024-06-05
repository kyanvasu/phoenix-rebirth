import classNames from "classnames";
import React from "react";

export function TCell(props: React.TableHTMLAttributes<HTMLTableCellElement>) {
  const { className, children, ...others } = props;
  return (
    <td
      className={classNames("px-3 py-2 whitespace-nowrap", className)}
      {...others}
    >
      {children}
    </td>
  );
}
