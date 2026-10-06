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
  createPaginatedRowModel,
  createSortedRowModel,
  flexRender,
  type ReactTable,
  type RowData,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFns,
  type Table as ITable,
  type TableFeatures,
  type TableOptions as TanStackTableOptions,
  useTable as useTanStackTable,
} from "@tanstack/react-table";

import { For, Show, Slot, WithSlots, WithSlotsProps } from "@/lib/server";
import { DependencyList, JSX, memo, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// What every table gets. The rest of TanStack Table (filtering, column
// visibility, grouping, ...) is opt-in through the `features` option, so a
// table only ships the features it uses. Registering all of them, as
// useLegacyTable does, more than doubles the size of this block.
const baseFeatures = {
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  sortFns,
};

export type TableBaseFeatures = typeof baseFeatures;

export type TableOptions<
  T extends RowData,
  F extends TableFeatures = {},
> =
  // NoInfer: F is decided by the `features` option alone, not by the options
  // whose types depend on it (state, on*Change, ...).
  & Omit<TanStackTableOptions<TableBaseFeatures & NoInfer<F>, T>, "features">
  & {
    /** Extra TanStack features, on top of sorting, pagination and selection. */
    features?: F;
    /** Turns client-side sorting on. Any value works, as it did with v8. */
    getSortedRowModel?: unknown;
    /** Turns client-side pagination on. Any value works, as it did with v8. */
    getPaginationRowModel?: unknown;
    /** Ignored, the core row model is always on. Kept for v8 call sites. */
    getCoreRowModel?: unknown;
  };

export type TableInstance<
  T extends RowData,
  F extends TableFeatures = {},
> = ReactTable<TableBaseFeatures & F, T> & {
  /** v8's `table.getState()`. v9 exposes the same value as `table.state`. */
  getState: () => ReactTable<TableBaseFeatures & F, T>["state"];
};

const _deps: DependencyList = [];

const TableHeaderMemo = memo(TableHeader);
const TableBodyMemo = memo(TableBody);
const TableCellMemo = memo(TableCell);
const TableHeadMemo = memo(TableHead);
const TableRowMemo = memo(TableRow);
const TableMemo = memo(TTable);

export function columnsBuilder<T extends any = any>(
  columns: T[],
  deps?: DependencyList,
) {
  const cached = useMemo(() => columns, deps ?? _deps);

  return cached;
}

const empty: any[] = [];

// Two signatures on purpose. With a single one, F needs a default for calls
// that pass no `features`, and that default makes TypeScript give up on
// inferring F when the features are written inline.
export function useTable<T extends RowData = any>(
  options: TableOptions<T> & { features?: undefined },
): { table: TableInstance<T> };
export function useTable<T extends RowData, F extends TableFeatures>(
  options: TableOptions<T, F> & { features: F },
): { table: TableInstance<T, F> };
export function useTable(options: any): { table: any } {
  const {
    data,
    features: extraFeatures,
    getCoreRowModel: _getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    ...rest
  } = options as TableOptions<any, any>;

  // TanStack reads the features once, when the table is created.
  const [features] = useState(() => ({
    ...baseFeatures,
    ...(getSortedRowModel ? { sortedRowModel: createSortedRowModel() } : {}),
    ...(getPaginationRowModel
      ? { paginatedRowModel: createPaginatedRowModel() }
      : {}),
    ...extraFeatures,
  }));

  const table = useTanStackTable(
    {
      ...rest,
      // fixes: https://github.com/TanStack/table/issues/4240#issuecomment-1200916069
      data: data.length === 0 ? empty : data,
      features,
    },
    (state) => state,
  );

  return {
    table: useMemo(() => ({ ...table, getState: () => table.state }), [table]),
  };
}

export const TABLE_SLOTS = ["top", "bottom"] as const;

export type TableSlots = (typeof TABLE_SLOTS)[number];

export interface Props<
  T extends RowData = any,
  F extends TableFeatures = any,
> extends WithSlotsProps<TableSlots> {
  table: ITable<F, T>;
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
          className={"mx-auto w-full flex justify-center items-center flex-col mt-5"}
        >
          <TableSkeleton spinner={props.spinner} />
        </div>
      }
    >
      <div className="w-full max-w-(--breakpoint-2xl) mx-auto">
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
                            "text-center": index > 0 &&
                              index < headerGroup.headers.length - 1,
                            "text-end": !props.oneElement &&
                              index === headerGroup.headers.length - 1,
                            "rounded-tl-md": index === 0,
                            "rounded-tr-md":
                              index === headerGroup.headers.length - 1,
                          })}
                        >
                          {header.isPlaceholder ? null : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                  {(row) => {
                    // These two only exist when their feature is registered:
                    // column visibility is opt-in, and the table may come from
                    // a consumer's own useTable without row selection.
                    const cells = row.getVisibleCells?.() ?? row.getAllCells();

                    return (
                      <TableRowMemo
                        data-state={row.getIsSelected?.() && "selected"}
                        key={row.id}
                      >
                        <For each={cells}>
                          {(cell, { index }) => (
                            <TableCellMemo
                              key={cell.id}
                              className={cn({
                                "text-center": index > 0 &&
                                  index < cells.length - 1,
                                "text-end": !props.oneElement &&
                                  index === cells.length - 1,
                              })}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCellMemo>
                          )}
                        </For>
                      </TableRowMemo>
                    );
                  }}
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
              },
            )}
          >
          </div>
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

// WithSlots erases the row and feature types, and v9 tables are invariant in
// both: a typed table no longer fits a `table: Table<any>` prop. Keep them on
// the public type.
const Table = WithSlots(RawTable, TABLE_SLOTS) as <
  T extends RowData = any,
  F extends TableFeatures = any,
>(
  props: Omit<Props<T, F>, "slots"> & { children: React.ReactNode },
) => JSX.Element;

export { Table };
