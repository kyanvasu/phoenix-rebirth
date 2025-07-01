"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";
import { Show } from "@/lib/server";
import { cn } from "@/lib/utils";

export interface FormInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  optional?: "true";
  helptext?: string;
  infoText?: string;
  error?: number;
  label: string;
  name: string;
}

export function FormInputField({
  label,
  id,
  optional,
  error,
  infoText,
  helptext,
  ...rest
}: FormInputFieldProps) {
  const isOptional = optional === "true";
  const isError = error === 1;

  return (
    <div
      className={cn("flex flex-col w-full space-y-2", {
        "animate-shake": isError,
      })}
    >
      <label htmlFor={id} className="text-base flex flex-row">
        <p className="flex flex-row items-center">
          {label}

          <Show when={!!infoText} deps={[infoText]}>
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <InfoIcon className="ml-2 h-4 w-4 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{infoText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Show>
        </p>

        <Show when={isOptional} deps={[optional]}>
          <span className="text-foreground/60 ml-1">(optional)</span>
        </Show>
      </label>

      <Input
        {...rest}
        className={cn("w-full", { "border-destructive": isError })}
        id={id}
      />

      <Show when={isError} deps={[error]}>
        <div className="text-destructive text-xs">{helptext}</div>
      </Show>
    </div>
  );
}
