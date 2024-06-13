import { Button } from "../base";
import { ButtonProps } from "@/model/types/button.props";

export function Link(props: ButtonProps) {
  return <Button variant="link" {...props} />;
}
