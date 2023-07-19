import { IconProps } from "./icon.props";

export interface SidebarItem {
  key: string;
  title: string;
  Icon: (props: IconProps) => JSX.Element;
}