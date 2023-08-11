import React, { useState } from 'react';
import { TableBody } from './body';
import { TableContainer } from './container';
import { TableHeader } from './header';
import { TableFooter } from './footer';
import { TableProps, TableRowProps } from '../../../model/types/table.props';

export function Table(props: TableProps) {
  const { data } = props;

  const [checked, setChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState<TableRowProps[]>([]);

  function toggleAll() {
    setSelectedRows(checked ? [] : data);
    setChecked(!checked);
  }

  return (
    <TableContainer>
      <TableHeader toggleAll={toggleAll} checked={checked} {...props} />

      <TableBody
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        {...props}
      />

      <TableFooter data={data.length} />
    </TableContainer>
  );
}
