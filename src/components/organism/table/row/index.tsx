import classNames from 'classnames';
import React from 'react';
import { TableRowProps, Base } from '../../../../model/types/table.props';

export function TableRow(props: TableRowProps & Base) {
  const { children } = props;

  return (
    <tr
      className={classNames(
        'font-normal border-b text-body-md text-base-neutral-grey-70 border-base-neutral-grey-30 hover:bg-base-neutral-grey-20'
      )}
    >
      {children}
    </tr>
  );
}
