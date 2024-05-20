import React from 'react';
import { flexRender } from '@tanstack/react-table';
import classNames from 'classnames';
import { TContainer } from './container';
import { THeader } from './header';
import { TRow } from './row';
import { TBody } from './body';
import { TCell } from './cell';
import { TableProps } from '../../../model/types/table.props';
import { useTable } from '../../../model/interactions/use-table';
import ActionIcon from '../../atoms/action-icons';

export const Table: React.FC<TableProps> = ({ data, columns, options = {}, actionsIcon, onEdit, onDelete }) => {
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
                  scope="col"
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
              {actionsIcon && (onEdit || onDelete) && (
                <TCell className="text-center">
                  <ActionIcon
                    icon={actionsIcon}
                    onEdit={onEdit ? () => onEdit(row) : undefined}
                    onDelete={onDelete ? () => onDelete(row) : undefined}
                  />
                </TCell>
              )}
            </TRow>
          ))}
        </TBody>
      </TContainer>
      <div className="h-4" />
    </>
  );
};
