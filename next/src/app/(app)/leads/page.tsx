'use client';
import { IndeterminateCheckbox } from '@/components/molecules/indeterminate-checkbox';
import source from '../../../data/dummy-leads.json';
import { Atoms, Molecules, Organism } from '@kanvas/phoenix';
import { Table } from '@kanvas/phoenix/client';
import { useState } from 'react';

const statusBadges = {
  Lost: {
    label: 'Lost',
    className: 'bg-base-semantic-error-50 hover:bg-base-semantic-error-50',
    icon: <Atoms.Icons.MinusCircle />,
  },
  Won: {
    label: 'Won',
    className: 'bg-base-semantic-success-50 hover:bg-base-semantic-success-50',
    icon: <Atoms.Icons.CheckCircle />,
  },
  Open: {
    label: 'Open',
    className: 'bg-base-primary-80 hover:bg-base-primary-80',
    icon: <Atoms.Icons.PlusCircle className='stroke-white' />,
  },
  Visiting: {
    label: 'Visiting',
    className:
      'bg-white hover:bg-white text-base-primary-80 border-2 border-base-primary-80',
    icon: <Atoms.Icons.CheckCircle className='stroke-base-primary-80' />,
  },
  Active: {
    label: 'Active',
    className: 'bg-base-primary-80 hover:bg-base-primary-80',
  },
  Pending: {
    label: 'Pending',
    className: 'bg-base-semantic-error-50 hover:bg-base-semantic-error-50',
  },
};

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllPageRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllPageRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className='px-1'>
        <Molecules.Form.CheckboxInput
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            // indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: () => 'Title',
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: 'company',
    header: () => 'Company',
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: 'description',
    header: () => 'Description',
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: 'uw-note',
    header: () => 'uw notes',
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: 'status',
    header: () => 'Status',
    cell: (info: any) => (
      <Organism.Table.StatusBadge
        className={statusBadges[info.renderValue()].className}
        icon={statusBadges[info.renderValue()].icon}
      >
        {info.renderValue()}
      </Organism.Table.StatusBadge>
    ),
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: 'create-date',
    header: () => 'Created date',
    footer: (props: any) => props.column.id,
  },
];

export default function Leads() {
  const [rowSelection, setRowSelection] = useState({});
  const options = {
    enableRowSelection: true,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  };

  return (
    <>
      <Table columns={columns} data={source} options={options} />
    </>
  );
}
