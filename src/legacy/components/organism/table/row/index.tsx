import classNames from "classnames";
import React from "react";

export function TRow(props: React.TableHTMLAttributes<HTMLTableRowElement>) {
  const { className, children } = props;
  return (
    <tr
      className={classNames("font-normal border-b text-body-md", className, {
        "text-base-neutral-grey-70 border-base-neutral-grey-30 hover:bg-base-neutral-grey-20":
          !className,
      })}
    >
      {children}
    </tr>
  );
}
