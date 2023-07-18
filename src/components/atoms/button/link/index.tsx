import React from 'react';
import { ButtonProps } from '../../../../model/types/button.props';
import { Button } from '../base';

export function Link(props: ButtonProps) {
  return <Button variant='link' {...props} />;
}
