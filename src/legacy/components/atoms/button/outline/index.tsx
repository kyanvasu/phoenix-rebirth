import React from "react";
import { ButtonProps } from "../../../../model/types/button.props";
import { Button } from "../base";

export function Outline(props: ButtonProps) {
  return <Button variant="outline" {...props} />;
}
