import React from 'react';
import { Body } from '../../../atoms';

export function TableFooter({ data }: { data: number }) {
  return (
    <tfoot className='h-[60px] text-base-neutral-grey-100'>
      <tr>
        <td colSpan={3} className='pl-3'>
          <Body.Two>`Showing 1 to 10 of {data} results`</Body.Two>
        </td>
      </tr>
    </tfoot>
  );
}
