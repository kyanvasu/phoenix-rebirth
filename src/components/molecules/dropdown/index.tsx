import { Popover } from "@headlessui/react";
import React, { PropsWithChildren } from "react";
import { DropdwonItemInterface } from "../../../model/types";
import classNames from "classnames";

interface Props extends PropsWithChildren {
  items: DropdwonItemInterface[];
  onChange?: (value: DropdwonItemInterface) => void;
  className?: string;
};

export default function Dropdown(props: Props) {
  const { children, className, items = [], onChange } = props;

  const classname = classNames(
    'absolute  rounded-sm border  shadow-elevation-3',
    className,
    className, {
    'bg-base-neutral-white border-base-primary-30 text-base-neutral-grey-60 stroke-base-neutral-grey-60 hover:text-base-primary-60 hover:stroke-base-primary-60': !className,
  }
  );

  return (
    <Popover className="relative select-none w-min">
      <Popover.Button className="outline-none">
        {children}
      </Popover.Button>

      <Popover.Panel className={classname}>
        <ul className="list-none p-0 m-0">
          {items.map((value) => <DropdownItem {...value} onClick={() => onChange?.(value)} />)}
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

  const classname = classNames(
    'flex gap-2 py-1.5 px-[18px] min-w-[167px] cursor-pointer items-center',
    'text-base-neutral-grey-60 stroke-base-neutral-grey-60 hover:text-base-primary-60 hover:stroke-base-primary-60',
  );

  const handleClick = () => onClick?.();

  return (
    <li onClick={handleClick} className={classname}>
      {Icon && Icon}
      <span className="text-body-md text-inherit">{text}</span>
    </li>
  );
}