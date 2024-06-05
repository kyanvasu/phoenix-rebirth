import React from "react";
import { ButtonProps } from "../../../../../model/types/button.props";
import { Button } from "../base";

export function Solid(props: ButtonProps) {
  return <Button variant="solid" {...props} />;
}
