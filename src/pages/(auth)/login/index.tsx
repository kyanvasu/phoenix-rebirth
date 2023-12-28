import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { Heading, Button, Body } from '../../../components/atoms';
import { Form } from '../../../components/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../../model/interactions/use-auth';
import { useClientContext } from '../../../model/store/core.store/client.store';
import { useUser } from '../../../model/interactions/use-user';
import Spinner from '../../../components/atoms/icons/spinner';

// TODO: add translates
interface props {
  redirect: () => void;
}
function useSignIn({ redirect }: props) {
  const { sdk } = useClientContext();
  const [checkboxState, setCheckboxState] = useState(true);
  const { operations: userOperations } = useUser({ sdk });
  function handleToggle() {
    setCheckboxState(!checkboxState);
  }

  const initialValues = {
    email: '',
    password: '',
  };

  const { operations } = useAuth({ sdk });
  const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required field'),
    password: yup.string().required('Password is required field'),
  });

  async function onSubmit(values: typeof initialValues) {
    try {
      await operations.login(values.email, values.password);
      const profile = await userOperations.getUserInfo();
      localStorage.setItem('user', JSON.stringify(profile));
      redirect();
    } catch {
      setErrors({
        email: 'Invalid email or password',
      });
    }
  }
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
    isSubmitting,
  } = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit,
  });

  return {
    models: {
      values,
      errors,
      isSubmitting,
      checkboxState,
    },
    operations: {
      handleChange,
      handleSubmit,
      handleToggle,
    },
  };
}

export function LoginPage({ redirect }: props) {
  const { models, operations } = useSignIn({ redirect });
  return (
    <div>
      <Heading.Five className='mt-6 mb-10 font-bold text-base-neutal-grey-100'>
        Sign in to your account
      </Heading.Five>
      <form
        className='flex flex-col gap-y-[38px]'
        onSubmit={operations.handleSubmit}
      >
        <Form.TextInput
          type='email'
          label={'Email'}
          placeholder={'email'}
          name='email'
          required
          value={models.values.email}
          onChange={operations.handleChange}
          error={!!models.errors.email}
          helpText={models.errors.email}
        />
        <Form.TextInput
          type='password'
          name='password'
          label='Password'
          placeholder='password'
          required
          value={models.values.password}
          onChange={operations.handleChange}
          error={!!models.errors.password}
          helpText={models.errors.password}
        />

        <div>
          <div className='flex flex-row justify-between'>
            <Form.CheckboxInput
              id='remember-me'
              label={'Remember me'}
              checked={models.checkboxState}
              onChange={operations.handleToggle}
            />

            <Link
              className='font-semibold text-base-primary-100 text-body-md'
              href='/forgot-password'
            >
              Forgot Password ?
            </Link>
          </div>

          <Button.Solid
            className='justify-center w-full my-6'
            size='small'
            type='submit'
            disabled={models.isSubmitting}
          >
            {models.isSubmitting ? <Spinner /> : 'Sign In'}
          </Button.Solid>

          <span className='flex flex-row gap-x-4'>
            <Body.Three className='text-base-neutral-grey-80'>
              Don't Have an account ?
            </Body.Three>

            <Link
              className='font-semibold text-base-primary-100 text-body-md'
              href='/sign-up'
            >
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
