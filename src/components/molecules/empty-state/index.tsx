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
  const { theme } = useClientContext();

  return (
    <article
      className={classNames(theme.emptyState.container, className)}
      {...rest}
    >
      <img src={image} width={226} height={226} alt="" />
      <section>
        <Body.Three className={theme.emptyState.title}>
          {title}
        </Body.Three>
        <Body.Three className={theme.emptyState.subtitle}>
          {subtitle}
        </Body.Three>
      </section>
      {showButton && <Button.Solid onClick={onClick}>{label}</Button.Solid>}
    </article>
  );
}
