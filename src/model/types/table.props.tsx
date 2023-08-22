import { PropsWithChildren } from 'react';

export interface Base extends PropsWithChildren {
  enableCheckbox?: boolean;
  enableSubPages?: boolean | string;
  enableActions?: boolean;
  badges?: Record<
    string,
    {
      label: string;
      icon?: React.ReactNode;
      className?: string;
    }
  >;
}
export type Variant = 'profile' | 'text';

export interface TableColumnProps {
  key: string;
  title: string;
}

export interface TableRowProps {
  [key: string]: any;
}

export interface TableProps extends Base {
  columns: TableColumnProps[];
  variant?: Variant;
  data: TableRowProps[];
  pages?: number;
}
