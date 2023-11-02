import React from 'react';
import Spinner from '../../../atoms/icons/spinner';
import { Table } from '../table';
import ListEmptyMessage from '../../../atoms/icons/list-empty-message';
type PropsEmptyTable = {
  loading: boolean;
  columns: any[];
  text: string;
  img?: any;
};

const EmptyTable = (props: PropsEmptyTable) => {
  const { loading, columns, text, img } = props;
  return (
    <div>
      <Table columns={columns} data={[]} />
      <div className='grid place-items-center mt-6'>
        {loading ? (
          <Spinner size={40} />
        ) : (
          <div>
            <div>{img ?? <ListEmptyMessage size={220} className='mb-5' />}</div>
            <div className='grid place-items-center'>
              <p className='text-base-neutral-grey-80'>{text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyTable;
