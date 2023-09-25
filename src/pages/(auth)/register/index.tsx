import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import React from 'react';
import { useAuth } from '../../../model/interactions/use-auth';
import { useClientContext } from '../../../model/store/core.store/client.store';
import { Form } from '../../../components/molecules';
import { Body, Button, Heading } from '../../../components/atoms';

interface props {
  redirect: () => void;
}
function useSignUp({ redirect }: props) {
  const { sdk } = useClientContext();

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const {
    operations: { register },
  } = useAuth({ sdk });

  const validationSchema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email(),
    password: yup.string().min(8).required(),
    password_confirmation: yup
      .string()
      .required()
      .oneOf([yup.ref('password')]),
  });

  async function onSubmit(values: typeof initialValues) {
    try {
      await register({
        ...values,
      });
      redirect();
    } catch (err: any) {
      setErrors({
        email: err.message,
      });
    }
  }

  const formikProps = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit,
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
    isSubmitting,
  } = formikProps;

  return {
    models: { values, errors, loading: isSubmitting },
    operations: { handleChange, handleSubmit },
  };
}
export function RegisterPage({ redirect }: props) {
  const { models, operations } = useSignUp({ redirect });
  return (
    <div>
      <Heading.Five className='mt-6 mb-10 font-bold text-base-neutal-grey-100'>
        Create an account
      </Heading.Five>

      <form
        className='flex flex-col gap-y-[38px]'
        onSubmit={operations.handleSubmit}
      >
        <Form.TextInput
          label={'First Name'}
          placeholder='Add your First Name'
          value={models.values.firstname}
          onChange={operations.handleChange}
          name='firstname'
          helpText={models.errors.firstname}
          error={!!models.errors.firstname}
        />

        <Form.TextInput
          type='text'
          placeholder={'Add your Last Name'}
          label={'Last Name'}
          value={models.values.lastname}
          onChange={operations.handleChange}
          name='lastname'
        />

        <Form.TextInput
          type='email'
          placeholder={'Add your email'}
          label={'email'}
          value={models.values.email}
          onChange={operations.handleChange}
          name='email'
          helpText={models.errors.email}
          error={!!models.errors.email}
        />

        <Form.TextInput
          type='password'
          label={'password'}
          placeholder={'Enter your password'}
          value={models.values.password}
          onChange={operations.handleChange}
          name='password'
          helpText={models.errors.password}
          error={!!models.errors.password}
        />
        <Form.TextInput
          type='password'
          label={'Confirm password'}
          placeholder={'Enter your password'}
          value={models.values.password_confirmation}
          onChange={operations.handleChange}
          name='password_confirmation'
          helpText={models.errors.password_confirmation}
          error={!!models.errors.password_confirmation}
        />

        <div>
          <Button.Solid
            className='justify-center w-full my-6'
            size='small'
            type='submit'
          >
            Sign Up
          </Button.Solid>

          <span className='flex flex-row gap-x-4'>
            <Body.Three className='text-base-neutral-grey-80'>
              Have an account?
            </Body.Three>

            <Link
              className='font-semibold text-base-primary-100 text-body-md'
              href='/sign-in'
            >
              Sign In
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}