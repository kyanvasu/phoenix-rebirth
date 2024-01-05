import { Popover } from "@headlessui/react";
import React, { PropsWithChildren } from "react";
import { DropdwonItemInterface } from "../../../model/types";
import classNames from "classnames";
import { useClientContext } from "../../../client";

interface Props extends PropsWithChildren {
  items: DropdwonItemInterface[];
  onChange?: (value: DropdwonItemInterface) => void;
  className?: string;
}

export default function Dropdown(props: Props) {
  const { theme } = useClientContext();
  const { children, className, items = [], onChange } = props;
  return (
    <Popover className={theme.dropdown.container}>
      <Popover.Button className={theme.dropdown.button}>
        {children}
      </Popover.Button>

      <Popover.Panel className={classNames(theme.dropdown.panel, className)}>
        <ul className={theme.dropdown.list}>
          {items.map((value) => (
            <DropdownItem {...value} onClick={() => onChange?.(value)} />
          ))}
        </ul>
      </Popover.Panel>
    </Popover>
  );
}

interface ItemProps extends DropdwonItemInterface {
  onClick?: VoidFunction;
}

function DropdownItem(props: ItemProps) {
  const { text, Icon, onClick } = props;

  const { theme } = useClientContext();

  const itemClassname = classNames(
    theme.dropdown.item.container,
    theme.dropdown.item.hover
  );

  const handleClick = () => onClick?.();

  return (
    <li onClick={handleClick} className={itemClassname}>
      {Icon && Icon}
      <span className={theme.dropdown.item.text}>{text}</span>
    </li>
  );
}
