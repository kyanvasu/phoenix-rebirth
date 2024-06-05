"use client";
import React from "react";
import { Body, Button } from "../../atoms";
import { EmptyStateTypes } from "../../../../model/types";
import { BaseTheme } from "../../../../theme";
interface Props extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: string;
  image: string;
  showButton?: boolean;
  label?: string;
  theme?: EmptyStateTypes;
}

export default function EmptyState({
  image,
  title,
  subtitle,
  showButton = false,
  label,
  onClick,
  className,
  theme,
  ...rest
}: Props) {
  const styles = theme || BaseTheme.emptyState;

  return (
    <article className={styles?.container} {...rest}>
      <img src={image} width={226} height={226} alt="" />
      <section>
        <Body.Three className={styles?.title}>{title}</Body.Three>
        <Body.Three className={styles?.subtitle}>{subtitle}</Body.Three>
      </section>
      {showButton && (
        <Button.Solid className={styles?.button} onClick={onClick}>
          {label}
        </Button.Solid>
      )}
    </article>
  );
}
