import React from "react";
import { type Table } from "@tanstack/react-table";
import { Button } from "../../../atoms";

interface Props {
  table: Table<any>;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

export function Pagination({ table, handleNextPage, handlePrevPage }: Props) {
  return (
    <div className="flex items-center justify-end space-x-1">
      <Button.Outline
        size="small"
        onClick={() => {
          handlePrevPage();
          table.previousPage();
        }}
      >
        Previous
      </Button.Outline>

      <Button.Outline
        size="small"
        onClick={() => {
          handleNextPage();
          table.nextPage();
        }}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button.Outline>
    </div>
  );
}
