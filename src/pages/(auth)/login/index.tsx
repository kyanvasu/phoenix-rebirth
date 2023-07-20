import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { Heading, Button, Body } from '../../../components/atoms';
import { Form } from '../../../components/molecules';

// TODO: add translates
function useSignIn() {
  const [checkboxState, setCheckboxState] = useState(true);

  function handleToggle() {
    setCheckboxState(!checkboxState);
  }

  return {
    models: {
      checkboxState,
    },
    operations: {
      handleToggle,
    },
  };
}

export function LoginPage() {
  const { models, operations } = useSignIn();
  return (
    <div>
      <Heading.Five className='mt-6 mb-10 font-bold text-base-neutal-grey-100'>
        Sign in to your account
      </Heading.Five>
      <form className='flex flex-col gap-y-[38px]'>
        <Form.TextInput
          type='email'
          label={'email'}
          placeholder={'email'}
          name='email'
        />
        <Form.TextInput
          type='password'
          name='password'
          label='password'
          placeholder='password'
          required
        />

        <div>
          <div className='flex flex-row justify-between'>
            <Form.CheckboxInput
              id='remember-me'
              label={'remember me'}
              checked={models.checkboxState}
              required
              onChange={operations.handleToggle}
            />

            <Link
              className='font-semibold text-base-primary-100 text-body-md'
              href='/forgot-password'
            >
              Forgot Password
            </Link>
          </div>

          <Button.Solid
            className='justify-center w-full my-6'
            size='small'
            type='submit'
          >
            Sign In
          </Button.Solid>

          <span className='flex flex-row gap-x-4'>
            <Body.Three className='text-base-neutral-grey-80'>
              Don't Have an account?
            </Body.Three>

            <Link
              className='font-semibold text-base-primary-100 text-body-md'
              href='/sign-up'
            >
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
