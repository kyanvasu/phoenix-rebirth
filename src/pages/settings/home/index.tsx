import React from 'react';
import { Profile } from '../../../components/molecules';
import { Body, Button } from '../../../components/atoms';
import ChevronRight from '../../../components/atoms/icons/chevron-right';
import Icons from '../../../components/atoms/icons';
import { UserData } from '@kanvas/core';
import { useAuth } from '../../../model/interactions/use-auth';
import { useClientContext } from '../../../model/store/core.store/client.store';

export interface ViewsProps {
  view: number;
  profile?: UserData;
  handleView: (index: number) => void;
  support?: string;
}
/**
 * SettingsView component displays user settings options.
 * @param {number} props.view - The current view index.
 * @param {UserData} props.profile - User profile data.
 * @param {string} props.support - email support
 * @param {Function} props.handleView - Callback function to change the view.
 * @returns {JSX.Element} - The rendered component.
 */
export function SettingsView({
  handleView,
  profile,
  support,
}: ViewsProps): JSX.Element {
  const { sdk } = useClientContext();
  const { operations } = useAuth({ sdk });
  return (
    <>
      <section
        onClick={() => {
          handleView(1);
        }}
        className='flex items-center justify-between p-5 cursor-pointer'
      >
        <Profile
          name={`${profile?.firstname} ${profile?.lastname}`}
          Size='small'
          role={profile?.mainRole}
        />
        <Button.Link className='outline-none'>
          <ChevronRight size={20} />
        </Button.Link>
      </section>

      <section className='flex flex-col h-[400px] justify-between p-5'>
        <article>
          <Body.Two className='font-normal'>App settings</Body.Two>

          <Button.Link
            onClick={() => {
              handleView(2);
            }}
            className='text-base-neutral-grey-90 hover:text-base-primary-80'
          >
            <Icons.Padlock size={20} />
            Password & Privacy
          </Button.Link>
        </article>

        <article>
          <Button.Link
            className='text-base-neutral-grey-90 hover:text-base-primary-80'
            size='medium'
            onClick={async () => {
              await operations.logout();
              location.href = '/sign-in';
            }}
          >
            <Icons.Logout size={20} />
            Logout
          </Button.Link>

          {support && (
            <Button.Link
              onClick={() => {
                handleView(3);
              }}
              className='text-base-neutral-grey-90 hover:text-base-primary-80'
              size='medium'
            >
              <Icons.Mail size={20} />
              Support
            </Button.Link>
          )}
        </article>
      </section>
    </>
  );
}
