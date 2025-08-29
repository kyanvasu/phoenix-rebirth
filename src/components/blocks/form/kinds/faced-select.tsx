"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn, toListValues, useSet } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { For, Show } from "@/lib/server";
import { Check } from "lucide-react";
import { useEffect } from "react";

interface FormFacetedSelectProps {
  options: Array<{ name: string; value: string; disabled?: boolean }>;
  onValueChange: (e: string) => void;
  value: string[] | string;
  placeholder: string;
  truncateAt?: number;
  disabled?: boolean;
  helptext?: string;
  topError?: "true";
  error?: number;
  label: string;
}

export function FormFacetedSelect({
  options,
  truncateAt,
  onValueChange,
  value,
  disabled,
  label,
  error,
  helptext,
  placeholder,
}: FormFacetedSelectProps) {
  const _value = (
    typeof value === "string" ? toListValues(value) : value
  ).filter((v) => v.trim() !== "");

  const selectedValues = useSet<string>(_value ?? []);

  truncateAt ??= 5;

  const isError = error === 1;

  useEffect(() => {
    onValueChange?.(selectedValues.values().join(","));
  }, [selectedValues.value.size]);

  return (
    <div className="flex flex-col w-full space-y-2">
      <label className="text-base">{label}</label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "h-8 border border-border w-full flex-row justify-start font-normal group",
              {
                "border-destructive": isError,
              },
            )}
            disabled={disabled}
            variant="outline"
          >
            <Show
              when={selectedValues.size() > 0}
              deps={[selectedValues.size()]}
              fallback={
                <div className="flex flex-row">
                  <span>{placeholder}</span>
                </div>
              }
            >
              <>
                <div className="flex flex-row">
                  <span>{label}</span>
                  <Separator
                    orientation="vertical"
                    className="mx-2 h-4 group-hover:bg-primary/30 mt-0.5"
                  />
                </div>

                <Badge className="rounded-sm px-1 font-normal lg:hidden">
                  {selectedValues.size()}
                </Badge>

                <div className="hidden space-x-1 lg:flex">
                  <Show
                    when={selectedValues.size() >= truncateAt}
                    deps={[selectedValues.size(), truncateAt]}
                    fallback={
                      <For
                        each={options.filter((option) =>
                          selectedValues.has(option.value)
                        )}
                      >
                        {(option) => (
                          <Badge
                            className="rounded-sm px-1 font-normal"
                            key={option.value}
                          >
                            {option.name}
                          </Badge>
                        )}
                      </For>
                    }
                  >
                    <Badge className="rounded-sm px-1 font-normal capitalize">
                      {selectedValues.size()} selected {label}
                    </Badge>
                  </Show>
                </div>
              </>
            </Show>
          </Button>
        </PopoverTrigger>

        <Show when={isError} deps={[error]}>
          <p className={cn("text-destructive text-xs")}>{helptext}</p>
        </Show>

        <PopoverContent className="w-50 p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${label}`} />
            <CommandList className="max-h-full">
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup className="max-h-75 overflow-y-auto overflow-x-hidden">
                <For each={options}>
                  {(option) => {
                    const isSelected = selectedValues.has(option.value);

                    return (
                      <CommandItem
                        disabled={option.disabled}
                        key={option.value}
                        onSelect={() => {
                          if (isSelected) {
                            selectedValues.delete(option.value);
                          } else {
                            selectedValues.add(option.value);
                          }
                        }}
                      >
                        <div
                          className={cn(
                            "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible",
                          )}
                        >
                          <Check className="size-4" aria-hidden="true" />
                        </div>

                        <span>{option.name}</span>
                      </CommandItem>
                    );
                  }}
                </For>
              </CommandGroup>

              <Show
                when={selectedValues.size() > 0}
                deps={[selectedValues.size()]}
              >
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => selectedValues.clear()}
                      className="justify-center text-center capitalize"
                    >
                      Clear {label}
                    </CommandItem>
                  </CommandGroup>
                </>
              </Show>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
