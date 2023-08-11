import React from 'react';
import { TableProps, TableRowProps } from '../../../../model/types/table.props';
import { TableRow } from '../row';
import { TableCell } from '../cell';
import { CheckboxInput } from '../../../molecules/form';

interface props extends TableProps {
  selectedRows: TableRowProps[];
  setSelectedRows: (params: any) => void;
}


export function TableBody(props: props) {
  const { data, columns, enableCheckbox, selectedRows, setSelectedRows } =
    props;

  return (
    <tbody>
      {data.map((row, index) => (
        <TableRow row={row} key={index} {...props}>
          {enableCheckbox && (
            <td
              className='flex justify-center p-3'
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRows(
                  selectedRows.includes(row)
                    ? selectedRows.filter((l) => l !== row)
                    : [...selectedRows, row]
                );
              }}
            >
              <CheckboxInput
                className='cursor-pointer'
                checked={selectedRows.includes(row)}
              />
            </td>
          )}

          {columns.map((column, index) => {
            return (
              <TableCell
                key={column.key}
                column={column}
                row={row}
                isLastItem={index === columns.length - 1}
                {...props}
              />
            );
          })}
        </TableRow>
      ))}
    </tbody>
  );
}
