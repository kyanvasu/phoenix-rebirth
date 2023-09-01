import { flexRender } from '@tanstack/react-table';
import React from 'react';
import { TContainer } from './container';
import { THeader } from './header';
import { TRow } from './row';
import { TBody } from './body';
import { TCell } from './cell';
import classNames from 'classnames';
import { TableProps } from '../../../model/types/table.props';
import { useTable } from '../../../model/interactions/use-table';
export function Table({ data, columns, options = {} }: TableProps) {
  const {
    models: { table },
  } = useTable({ data, columns, options });

  return (
    <>
      <TContainer>
        <THeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  scope='col'
                  className={`p-3 ${
                    header.index === headerGroup.headers.length - 1
                      ? 'text-right'
                      : 'text-left'
                  }`}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </TRow>
          ))}
        </THeader>
        <TBody>
          {table.getRowModel().rows.map((row) => (
            <TRow key={row.id}>
              {row.getVisibleCells().map((cell, index) => (
                <TCell
                  key={cell.id}
                  className={classNames({
                    'text-right': index === row.getVisibleCells().length - 1,
                    'text-left': index !== row.getVisibleCells().length - 1,
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TCell>
              ))}
            </TRow>
          ))}
        </TBody>
      </TContainer>
      <div className='h-4' />
      <div className='flex items-center justify-center'>
        <button
          className='border rounded p-1'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          className='border rounded p-1'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
      </div>
    </>
  );
}
