import React from 'react';
import classNames from 'classnames';
import { TableProps } from '../../../../model/types/table.props';
import { CheckboxInput } from '../../../molecules/form';

interface Props extends TableProps {
  toggleAll: () => void;
  checked?: boolean
}

export function TableHeader(props: Props) {
  const { columns, enableActions = false, toggleAll, enableCheckbox, checked } = props;

  return (
    <thead className='font-bold bg-base-neutral-grey-10 text-base-neutral-grey-80 text-body-md'>
      <tr>
        {enableCheckbox && (
          <th
            scope='col'
            className='flex justify-center p-3 text-left'
            onClick={(e) => {
              e.stopPropagation();
              toggleAll()
            }}
          >
            <CheckboxInput checked={checked} />
          </th>
        )}
        <th scope='col' className='p-3 text-left'>
          {columns[0].title}
        </th>

        {columns.slice(1).map((column, index) => (
          <th
            key={column.key}
            scope='col'
            className={classNames('p-3', {
              'text-right': index === columns.length - 2 && !enableActions,
              'text-left': index != columns.length - 2 && enableActions,
            })}
          >
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
