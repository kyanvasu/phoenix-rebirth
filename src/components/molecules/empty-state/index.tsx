import React from "react";
import classNames from "classnames";
import { Body, Button } from "../../atoms";
import { useClientContext } from "../../../client";

interface Props extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: string;
  image: string;
  showButton?: boolean;
  label?: string;
}

export default function EmptyState({
  image,
  title,
  subtitle,
  showButton = false,
  label,
  onClick,
  className,
  ...rest
}: Props) {
  const { stylesConfig } = useClientContext();

  return (
    <article
      className={classNames(stylesConfig.emptyState.container, className)}
      {...rest}
    >
      <img src={image} width={226} height={226} alt="" />
      <section>
        <Body.Three className={stylesConfig.emptyState.title}>
          {title}
        </Body.Three>
        <Body.Three className={stylesConfig.emptyState.subtitle}>
          {subtitle}
        </Body.Three>
      </section>
      {showButton && <Button.Solid onClick={onClick}>{label}</Button.Solid>}
    </article>
  );
}
