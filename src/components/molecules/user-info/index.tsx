import React from 'react';
import { Body } from '../../atoms';

export default function UserInfo() {
  return (
    <div className='flex items-center gap-3 cursor-pointer'>
      <div className='bg-base-primary-70 h-6 w-6 rounded-full'></div>
      <Body.Three>Cameron Williamson</Body.Three>
    </div>
  );
}