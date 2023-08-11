import React, { PropsWithChildren } from 'react';
import { Badge } from '../../../atoms/badge';

interface Props extends PropsWithChildren {
  icon?: any;
  className: string;
}

export function StatusBadge({ className, icon, children }: Props) {
  return (
    <Badge variant='round' icon={icon} reverse className={className}>
      {children}
    </Badge>
  );
}
