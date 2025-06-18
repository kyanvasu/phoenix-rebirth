"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { For, Show } from "@/lib/server";
import { cn } from "@/lib/utils";

interface FormSelectFieldProps {
  options: Array<{ name: string; value: string; disabled?: boolean }>;
  onValueChange: (e: string) => void;
  disabled?: boolean;
  placeholder: string;
  helptext?: string;
  error?: number;
  value?: string;
  label: string;
}

export function FormSelectField({
  error,
  label,
  helptext,
  options,
  placeholder,
  onValueChange,
  disabled,
  value,
}: FormSelectFieldProps) {
  const isError = error === 1;

  placeholder ??= value!;

  return (
    <div className={cn("flex flex-col w-full space-y-2")}>
      <label className="text-base">{label}</label>

      <Select onValueChange={onValueChange} disabled={disabled} value={value}>
        <SelectTrigger
          className={cn(
            { "border border-destructive animate-shake": isError },
            "w-full"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            <For each={options}>
              {(item) => (
                <SelectItem
                  key={item.name + item.value}
                  disabled={item.disabled}
                  value={item.value}
                >
                  {item.name}
                </SelectItem>
              )}
            </For>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Show when={isError} deps={[error]}>
        <p className={cn("text-destructive text-xs")}>{helptext}</p>
      </Show>
    </div>
  );
}
