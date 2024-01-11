
import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useClientContext } from '../../../model/store/core.store/client.store';
import { useAuth } from '../../../model/interactions/use-auth';
import { Body, Button, Heading } from '../../../components/atoms';
import { Form } from '../../../components/molecules';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { translate } from '../../../translate';
import { toast } from 'react-hot-toast';

interface props {
  router: AppRouterInstance;
  params: string;
}

export const RESET_PASSWORD_SUCCESSFUL = 'reset_password_successful';

export function useResetPassword({ router, params }: props) {
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
      sessionStorage.setItem('reset_password_successful', 'true');
      toast.success(translate('auth.password.resetSuccess'));
      router.push('/sign-in');
    } catch (err: any) {
      setErrors({
        new_password: err.message,
      });
      toast.error(translate('auth.password.resetError'));
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
  const { theme } = useClientContext();

  return (
    <div className={theme.auth.container}>
      <section className={theme.auth.group.columns}>
        <Heading.Four className={theme.auth.title}>
          {translate('auth.password.reset')}
        </Heading.Four>

        <Body.Two>{translate('auth.password.validation')}</Body.Two>
      </section>

      <form
        className={theme.auth.form.container}
        onSubmit={operations.handleSubmit}
      >
        <Form.TextInput
          theme={theme.auth.textInput}
          label={translate('auth.newPassword.label')}
          type='password'
          placeholder={translate('auth.newPassword.placeholder')}
          value={models.values.new_password}
          onChange={operations.handleChange}
          name='new_password'
          helpText={models.errors.new_password}
          error={!!models.errors.new_password}
        />

        <Form.TextInput
          theme={theme.auth.textInput}
          label={translate('auth.repeatPassword.label')}
          type='password'
          placeholder={translate('auth.repeatPassword.placeholder')}
          value={models.values.verify_password}
          onChange={operations.handleChange}
          name='verify_password'
          helpText={models.errors.verify_password}
          error={!!models.errors.verify_password}
        />

        <Button.Solid className={theme.auth.form.button} size='small'>
          {translate('auth.newPassword.buttonLabel')}
        </Button.Solid>
      </form>
    </div>
  );
}
