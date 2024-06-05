import React from "react";
import { Body } from "../../../atoms";
import classNames from "classnames";

interface Props {
  data: number;
  className?: string;
}
export function TableFooter({ data, className }: Props) {
  return (
    <tfoot
      className={classNames("h-[60px", className, {
        "text-base-neutral-grey-100": !className,
      })}
    >
      <tr>
        <td colSpan={3} className="pl-3">
          <Body.Two>`Showing 1 to 10 of {data} results`</Body.Two>
        </td>
      </tr>
    </tfoot>
  );
}
