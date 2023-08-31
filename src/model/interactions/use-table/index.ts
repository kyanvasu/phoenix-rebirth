import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { TableProps } from '../../types/table.props';

export function useTable({ data, columns, options }: TableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...options,
  });

  return {
    models: {
      table,
    },
  };
}
