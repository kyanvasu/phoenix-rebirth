'use client'
import { DashboardCard } from "@/components/molecules/dashboard-card";
import { Atoms } from "@kanvas/phoenix";
import { Table } from "@kanvas/phoenix/client";


const handleEdit = (row: any) => {
  console.log("Edit:", row);
};

const handleDelete = (row: any) => {
  console.log("Delete:", row);
};

const columns = [
  {
    header: 'ID',
    accessorKey: 'id',
    cell: (info: any) => info.getValue(),
  },
  {
    header: 'Nombre',
    accessorKey: 'name',
    cell: (info: any) => info.getValue(),
  },
  {
    header: 'Correo',
    accessorKey: 'email',
    cell: (info: any) => info.getValue(),
  },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Sam Johnson', email: 'sam.johnson@example.com' },
];
export default function DashboardPage() {
  return (
    <section className="flex flex-col h-full px-12 py-6 gap-y-3 bg-base-neutral-grey-10">
      <Atoms.Heading.Three className="font-bold">Dashboard</Atoms.Heading.Three>

      <article>
        <section className="grid grid-cols-3 gap-x-6">
          <DashboardCard
            title={"Leads Created"}
            icon={<Atoms.Icons.Briefcase />}
            amount={1000}
          />
          <DashboardCard
            title={"Leads Closed"}
            icon={<Atoms.Icons.Briefcase />}
            amount={300}
          />
          <DashboardCard
            title={"Agents Sponsored"}
            icon={<Atoms.Icons.Users />}
            amount={50}
          />
        </section>
        <Table
          data={data}
          columns={columns}
          actionsIcon={<Atoms.Icons.Users />}
          onEdit={handleEdit}
          onDelete={handleDelete}
          
        />
      </article>
    </section>
  );
}
