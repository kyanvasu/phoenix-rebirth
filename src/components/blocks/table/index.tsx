"use client";

import {
  Table as TTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  TableOptions,
  flexRender,
  useReactTable,
  Table as ITable,
} from "@tanstack/react-table";

import { WithSlotsProps, For, Show, Slot, WithSlots } from "@/lib/server";
import { DependencyList, useMemo, memo, JSX } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const _deps: DependencyList = [];

const TableHeaderMemo = memo(TableHeader);
const TableBodyMemo = memo(TableBody);
const TableCellMemo = memo(TableCell);
const TableHeadMemo = memo(TableHead);
const TableRowMemo = memo(TableRow);
const TableMemo = memo(TTable);

export function columnsBuilder<T extends any = any>(
  columns: T[],
  deps?: DependencyList
) {
  const cached = useMemo(() => columns, deps ?? _deps);

  return cached;
}

const empty: any[] = [];

export function useTable<T extends any = any>(options: TableOptions<T>) {
  const { data, ...rest } = options;

  // fixes: https://github.com/TanStack/table/issues/4240#issuecomment-1200916069
  const table = useReactTable({
    data: data.length === 0 ? empty : data,
    ...rest,
  });

  return {
    table,
  };
}

export const TABLE_SLOTS = ["top", "bottom"] as const;

export type TableSlots = (typeof TABLE_SLOTS)[number];

export interface Props<T extends any = any> extends WithSlotsProps<TableSlots> {
  table: ITable<T>;
  empty?: JSX.Element;
  isFetching: boolean;
  oneElement?: boolean;
  spinner?: () => JSX.Element;
}

function RawTable(props: Props) {
  return (
    <Show
      when={!props.isFetching}
      deps={[props.isFetching]}
      fallback={
        <div
          className={
            "mx-auto w-full flex justify-center items-center flex-col mt-5"
          }
        >
          <TableSkeleton spinner={props.spinner} />
        </div>
      }
    >
      <div className="w-full max-w-screen-2xl mx-auto">
        <Show when={!!props?.slots.top} deps={[props?.slots.top]}>
          <>{props?.slots?.top ?? null}</>
        </Show>

        <div className="rounded-md border">
          <TableMemo>
            <TableHeaderMemo className="bg-accent">
              <For each={props.table.getHeaderGroups()}>
                {(headerGroup) => (
                  <TableRowMemo key={headerGroup.id}>
                    <For each={headerGroup.headers}>
                      {(header, { index }) => (
                        <TableHeadMemo
                          key={header.id}
                          className={cn({
                            "text-center":
                              index > 0 &&
                              index < headerGroup.headers.length - 1,
                            "text-end":
                              !props.oneElement &&
                              index === headerGroup.headers.length - 1,
                            "rounded-tl-md": index === 0,
                            "rounded-tr-md":
                              index === headerGroup.headers.length - 1,
                          })}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHeadMemo>
                      )}
                    </For>
                  </TableRowMemo>
                )}
              </For>
            </TableHeaderMemo>

            <TableBodyMemo>
              <Show
                when={props.table.getRowModel().rows?.length >= 1}
                deps={[props.table.getRowModel().rows]}
                fallback={
                  <Show
                    when={!!props.empty}
                    deps={[props.empty]}
                    fallback={
                      <TableRowMemo>
                        <TableCellMemo
                          colSpan={props.table.getAllColumns().length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCellMemo>
                      </TableRowMemo>
                    }
                  >
                    <>{props.empty ?? null}</>
                  </Show>
                }
              >
                <For each={props.table.getRowModel().rows}>
                  {(row) => (
                    <TableRowMemo
                      data-state={row.getIsSelected() && "selected"}
                      key={row.id}
                    >
                      <For each={row.getVisibleCells()}>
                        {(cell, { index }) => (
                          <TableCellMemo
                            key={cell.id}
                            className={cn({
                              "text-center":
                                index > 0 &&
                                index < row.getVisibleCells().length - 1,
                              "text-end":
                                !props.oneElement &&
                                index === row.getVisibleCells().length - 1,
                            })}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCellMemo>
                        )}
                      </For>
                    </TableRowMemo>
                  )}
                </For>
              </Show>
            </TableBodyMemo>
          </TableMemo>
        </div>

        <Show when={!!props?.slots?.bottom} deps={[props?.slots?.bottom]}>
          <>{props?.slots?.bottom ?? null}</>
        </Show>
      </div>
    </Show>
  );
}

const TableSkeleton = (props: { spinner?: () => JSX.Element }) => (
  <div className="w-full">
    <div className="flex flex-row w-full justify-between">
      <div className="flex flex-row space-x-3 w-8/12">
        <Skeleton className="h-8 w-8/12 lg:w-4/12 dark:bg-muted dark:border-none bg-muted border border-border/40" />
        <Skeleton className="h-8 w-4/12 lg:w-2/12 dark:bg-muted dark:border-none bg-muted border border-border/40 ml-4" />
      </div>

      <Skeleton className="h-8 w-4/12 lg:w-2/12 ml-4 dark:border-none border border-primary/10" />
    </div>

    <div className="relative border border-border/70 h-[520px] lg:h-[540px] w-full mt-5 rounded-lg flex flex-col">
      <For each={[...Array(11)]}>
        {(_, { index, key }) => (
          <div
            key={`skeleton-${key}`}
            className={cn(
              "border-border/70 h-14 flex flex-row w-full items-center justify-between",
              {
                "bg-muted/70 rounded-t-lg": index === 0,
                "border-b": index < 10,
              }
            )}
          ></div>
        )}
      </For>

      <div className="bg-background absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {props.spinner ? <props.spinner /> : null}
      </div>
    </div>

    <div className=" flex flex-row justify-between mt-5">
      <div />

      <div className=" flex flex-row space-x-4">
        <Skeleton className="h-8 w-14 dark:bg-muted dark:border-none bg-muted border border-border/40" />
        <Skeleton className="h-8 w-14 dark:bg-muted dark:border-none bg-muted border border-border/40" />
      </div>
    </div>
  </div>
);

export function TableSlot(props: {
  name: TableSlots;
  children: React.ReactNode;
}) {
  return <Slot<TableSlots> {...props} />;
}

const Table = WithSlots(RawTable, TABLE_SLOTS);

export { Table };
