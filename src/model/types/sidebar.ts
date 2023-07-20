import { IconProps } from "./icon.props";

export interface SidebarItem {
  key: string;
  link: string;
  title: string;
  Icon: (props: IconProps) => JSX.Element;
}