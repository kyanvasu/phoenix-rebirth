'use client';
import source from '../../../data/dummy-leads.json';
import { Atoms } from '@kanvas/phoenix';
import { Table } from '@kanvas/phoenix/client';

const columns = [
  { key: 'title', title: 'Lead Name' },
  { key: 'company', title: 'Company' },
  { key: 'description', title: 'description' },
  { key: 'modified-by', title: 'modified by' },
  { key: 'uw-note', title: 'uw notes' },
  { key: 'status', title: 'status' },
  { key: 'create-date', title: 'created date' },
];
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
    icon: <Atoms.Icons.PlusCircle />,
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
export default function Leads() {
  return (
    <>
      <Table
        columns={columns}
        data={source}
        enableCheckbox
        badges={statusBadges}
      />
    </>
  );
}
