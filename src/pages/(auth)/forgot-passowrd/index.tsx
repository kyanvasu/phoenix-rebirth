import { useFormik } from 'formik';
import Link from 'next/link';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import * as yup from 'yup';
import { useClientContext } from '../../../model/store/core.store/client.store';
import { useAuth } from '../../../model/interactions/use-auth';
import React from 'react';
import { Body, Button, Heading, Icons } from '../../../components/atoms';
import { Form } from '../../../components/molecules';

interface props {
  router: AppRouterInstance;
}
function useForgotPassword({ router }: props) {
  const { sdk } = useClientContext();

  const initialValues = {
    email: '',
  };

  const { operations } = useAuth({ sdk });
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
  });

  async function onSubmit(values: typeof initialValues) {
    const { email } = values;

    try {
      await operations.forgotPassword(email);
      router.push(`/forgot-password/${email}`);
    } catch {
      setErrors({
        email: 'Invalid email',
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
      loading: isSubmitting,
    },
    operations: {
      handleChange,
      handleSubmit,
    },
  };
}
export function ForgotPasswordPage({ router }: props) {
  const { models, operations } = useForgotPassword({ router });
  return (
    <>
      <section className='mb-24'>
        <Link href='/sign-in'>
          <Button.Link>
            <Icons.ArrowLeft />
          </Button.Link>
        </Link>
        <Heading.Four className='my-3 font-bold text-base-neutral-grey-100'>
          Forgot Password
        </Heading.Four>

        <Body.Two>
          Enter your email and we will send you a link to reset your password.
        </Body.Two>
      </section>
      <form
        className='flex flex-col gap-y-[38px]'
        onSubmit={operations.handleSubmit}
      >
        <Form.TextInput
          label='Email'
          placeholder='enter your email address'
          name='email'
          value={models.values.email}
          error={!!models.errors.email}
          helpText={models.errors.email}
          onChange={operations.handleChange}
          required
        />

        <Button.Solid
          className='justify-center w-full mt-3'
          size='small'
          type='submit'
        >
          Send
        </Button.Solid>
      </form>
    </>
  );
}
