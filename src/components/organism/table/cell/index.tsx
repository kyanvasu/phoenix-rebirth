import React from 'react';
import {
  Base,
  TableColumnProps,
  TableRowProps,
} from '../../../../model/types/table.props';
import { StatusBadge } from '../status-badge';
import classNames from 'classnames';
import Link from 'next/link';

interface props extends Base {
  column: TableColumnProps;
  row: TableRowProps;
  isLastItem?: boolean;
}

function useTableCell({ row, column }: props) {
  const content = row[column.key];
  return {
    models: {
      content,
    },
  };
}

export function TableCell({
  column,
  row,
  isLastItem,
  enableSubPages,
  badges,
}: props) {
  const { models } = useTableCell({ row, column });
  return (
    <td
      className={classNames('px-3 py-2 whitespace-nowrap', {
        'text-right': isLastItem,
      })}
    >
      <Link
        href={enableSubPages ? '/' : ''}
        className={classNames({ 'cursor-default': !enableSubPages })}
      >
        {/* @ts-ignore */}
        {column.key === 'status' ? (
          <StatusBadge
            icon={badges![models.content].icon}
            // @ts-ignore
            className={badges![models.content].className}
          >
            {models.content}
          </StatusBadge>
        ) : (
          models.content
        )}
      </Link>
    </td>
  );
}
