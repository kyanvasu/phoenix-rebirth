import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useClientContext } from '../../../model/store/core.store/client.store';
import { useAuth } from '../../../model/interactions/use-auth';
import { Body, Button, Heading } from '../../../components/atoms';
import { Form } from '../../../components/molecules';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

interface props {
  router: AppRouterInstance;
  params: string;
}

function useResetPassword({ router, params }: props) {
  const { sdk } = useClientContext();

  const initialValues = {
    new_password: '',
    verify_password: '',
  };

  const { operations } = useAuth({ sdk });

  const validationSchema = yup.object().shape({
    new_password: yup.string().min(8).required(),
    verify_password: yup
      .string()
      .required()
      .oneOf([yup.ref('new_password')], 'Password must match'),
  });

  async function onSubmit(values: typeof initialValues) {
    try {
      await operations.resetPassword({
        hash_key: params,
        ...values,
      });
      sessionStorage.setItem('reset_password_sucessful', 'true');
      router.push('/sign-in');
    } catch (err: any) {
      setErrors({
        new_password: err.message,
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

export function ResetPasswordPage({ router, params }: props) {
  const { models, operations } = useResetPassword({ router, params });

  return (
    <>
      <section className='mb-24'>
        <Heading.Four className='my-3 font-bold'>Reset Password</Heading.Four>

        <Body.Two>Your password must be 8 characters long.</Body.Two>
      </section>

      <form
        className='flex flex-col gap-y-[38px]'
        onSubmit={operations.handleSubmit}
      >
        <Form.TextInput
          label='New Password'
          type='password'
          placeholder='Enter your new password'
          value={models.values.new_password}
          onChange={operations.handleChange}
          name='new_password'
          helpText={models.errors.new_password}
          error={!!models.errors.new_password}
        />

        <Form.TextInput
          label='Repeat new password'
          type='password'
          placeholder='Repeat password'
          value={models.values.verify_password}
          onChange={operations.handleChange}
          name='verify_password'
          helpText={models.errors.verify_password}
          error={!!models.errors.verify_password}
        />

        <Button.Solid className='justify-center w-full mt-3' size='small'>
          Create password
        </Button.Solid>
      </form>
    </>
  );
}
