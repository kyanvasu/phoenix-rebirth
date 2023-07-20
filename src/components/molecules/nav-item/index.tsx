import React from "react";
import { IconProps } from "../../../model/types";
import classnames from 'classnames';

type Props = {
  title: string;
  active?: boolean;
  link: string;
  Icon: (props: IconProps) => JSX.Element;
};

export default function NavItem({ Icon, title, link, active }: Props) {
  const iconColor = !active ? 'stroke-white' : 'stroke-base-primary-100';

  const container = classnames(
    'rounded-md',
    {
      'bg-base-primary-90 text-base-primary-30 hover:text-white': !active,
      'bg-base-primary-10 text-base-primary-100': active,
    }
  );

  return (
    <li className={container}>
      <a href={link} className='flex flex-row gap-2.5 py-2.5 px-3.5'>
        <Icon className={iconColor} size={20} />
        <span className='text-body-md font-semibold'>
          {title}
        </span>
      </a>
    </li>
  );
}