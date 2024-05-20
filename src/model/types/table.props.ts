import { ColumnDef, TableOptions } from '@tanstack/react-table';

export interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
  options?: Options;
  actionsIcon?: React.ReactNode;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

type Options = Omit<
  TableOptions<any>,
  'data' | 'columns' | 'getCoreRowModel' | 'getPaginationRowModel'
>;
