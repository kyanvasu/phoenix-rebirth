import React from 'react';

import { useFormik } from 'formik';

import * as yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '../../../model/interactions/use-auth';
import { useClientContext } from '../../../client';
import { Body, Button } from '../../../components/atoms';
import { TextInput } from '../../../components/molecules/form';
import Spinner from '../../../components/atoms/icons/spinner';

function useChangePassword() {
  const { sdk } = useClientContext();
  const initialValues = {
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  };
  const {
    operations: { changePassword },
  } = useAuth({ sdk });

  const validationSchema = yup.object().shape({
    current_password: yup.string().min(8).required('Current password is a required field'),
    new_password: yup.string().min(8).required('New password must be at least 8 characters'),
    confirm_new_password: yup
      .string()
      .required()
      .oneOf([yup.ref('new_password')], 'Confirm and new password must be equals'),
  });

  async function onSubmit(values: typeof initialValues) {
    try {
      await changePassword({
        ...values,
      });
      toast.success('Your password was updated sucessfully');
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

export function ChangePasswordView() {
  const { models, operations } = useChangePassword();

  return (
    <section className='flex flex-col px-5 py-5'>
      <Toaster position='top-right' reverseOrder={false} />
      <Body.Two className='text-base-neutral-grey-100 mb-14'>
        Select the store you want to use
      </Body.Two>

      <form
        className='flex flex-col gap-y-9'
        onSubmit={operations.handleSubmit}
      >
        <TextInput
          type='password'
          label={'Current Password'}
          placeholder={'Enter your current password'}
          name='current_password'
          onChange={operations.handleChange}
          value={models.values.current_password}
          helpText={models.errors.current_password}
          error={!!models.errors.current_password}
          required
        />
        <TextInput
          type='password'
          label={'New Password'}
          placeholder={'Enter your new password'}
          name='new_password'
          onChange={operations.handleChange}
          value={models.values.new_password}
          helpText={models.errors.new_password}
          error={!!models.errors.new_password}
          required
        />
        <TextInput
          type='password'
          label={'Confirm Password'}
          placeholder={'Confirm your new password'}
          name='confirm_new_password'
          onChange={operations.handleChange}
          value={models.values.confirm_new_password}
          helpText={models.errors.confirm_new_password}
          error={!!models.errors.confirm_new_password}
          required
        />

        <Button.Solid
          className='justify-center w-full'
          disabled={models.loading}
        >
          {models.loading ? <Spinner /> : 'Change Password'}
        </Button.Solid>
      </form>
    </section>
  );
}
