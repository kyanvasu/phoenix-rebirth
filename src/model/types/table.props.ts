import { ColumnDef, TableOptions } from '@tanstack/react-table';

export interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
  options?: Options;
}

type Options = Omit<
  TableOptions<any>,
  'data' | 'columns' | 'getCoreRowModel' | 'getPaginationRowModel'
>;
