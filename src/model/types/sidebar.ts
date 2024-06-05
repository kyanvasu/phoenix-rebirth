import { IconProps } from "./icon.props";

export interface Item {
  key: string;
  link: string;
  title: string;
  Icon: (props: IconProps) => JSX.Element;
}

export interface SidebarItem extends Item {
  children?: SidebarItem[];
}
