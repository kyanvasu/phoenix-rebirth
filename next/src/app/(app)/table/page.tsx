import React from 'react';
import { Table } from '@kanvas/phoenix/components/organism';


const handleEdit = (row: any) => {
  console.log('Edit:', row);
  // Lógica para editar la fila
};

const handleDelete = (row: any) => {
  console.log('Delete:', row);
  // Lógica para eliminar la fila
};

const data: never[] = [
  // Tus datos
];

const columns: never[] = [
  // Tus columnas
];

const MyTableComponent: React.FC = () => (
  <Table
    data={data}
    columns={columns}
    actionsIcon={<></>}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
);

export default MyTableComponent;
