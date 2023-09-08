'use client';

import { Molecules } from '@kanvas/phoenix/client';
import { Atoms, DropdwonItemInterface } from '@kanvas/phoenix';

const items: DropdwonItemInterface[] = [
  {
    Icon: <Atoms.Icons.Archive size={16} className='stroke-inherit' />,
    text: 'Edit',
    key: 'edit'
  },
  {
    Icon: <Atoms.Icons.Trash size={16} className='stroke-inherit' />,
    text: 'Delete',
    key: 'delete'
  }
];

export default function ClientComponent() {
  const handleChange = (item: DropdwonItemInterface) => {
    console.log(item);
  }

  return (
    <Molecules.Dropdown items={items} onChange={handleChange}>
      <div className='p-3 bg-slate-400'></div>
    </Molecules.Dropdown>
  )
}