"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ComponentProps } from "react";
import { Show } from "@/lib/server";
import { cn } from "@/lib/utils";

type CheckboxProps = ComponentProps<typeof Checkbox>;

export interface FormCheckboxFieldProps extends CheckboxProps {
  disabled?: boolean;
  optional?: "true";
  topError?: "true";
  helptext?: string;
  checked: boolean;
  error?: number;
  label: string;
  name: string;
}

export function FormCheckboxField({
  label,
  name,
  optional,
  error,
  helptext,
  topError,
  disabled,
  checked,
  ...rest
}: FormCheckboxFieldProps) {
  const isOptional = optional === "true";
  const isTopError = topError === "true";
  const isError = error === 1;

  return (
    <div
      className={cn("flex items-center space-x-2 my-2 w-full", {
        "animate-shake": isError,
      })}
    >
      <Checkbox
        {...rest}
        className={cn({ "border-destructive": isError })}
        disabled={disabled}
        checked={checked}
        id={name}
      />
      <label
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          {
            "flex flex-row space-x-2": isError,
            "flex flex-col space-x-2 items-start relative": isTopError,
          },
        )}
        htmlFor={name}
      >
        <span>{label}</span>

        <Show when={isOptional} deps={[optional]}>
          <span className="text-foreground/60">(optional)</span>
        </Show>

        <Show when={isError} deps={[error]}>
          <div
            className={cn("text-destructive text-xs", {
              "absolute  top-4 w-max max-w-40 -left-2": isTopError,
            })}
          >
            {helptext}
          </div>
        </Show>
      </label>
    </div>
  );
}
