import React from "react";
import { Button } from "../base";
import { ButtonProps } from "@/model/types/button.props";

export function Outline(props: ButtonProps) {
  return <Button variant="outline" {...props} />;
}
