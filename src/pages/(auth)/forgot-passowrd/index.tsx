import { useFormik } from 'formik';
import Link from 'next/link';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import * as yup from 'yup';
import { useClientContext } from '../../../model/store/core.store/client.store';
import { useAuth } from '../../../model/interactions/use-auth';
import React from 'react';
import { Body, Button, Heading, Icons } from '../../../components/atoms';
import { Form } from '../../../components/molecules';
import { toast } from 'react-hot-toast';
import { translate } from '../../../translate';

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
    email: yup.string().email().required(translate('auth.email.required')),
  });

  async function onSubmit(values: typeof initialValues) {
    const { email } = values;

    try {
      await operations.forgotPassword(email);
      router.push(`/forgot-password/${email}`);
      toast.success(translate('auth.sendEmail.success'));
    } catch {
      setErrors({
        email: translate('auth.sendEmail.error'),
      });
      toast.error(translate('auth.sendEmail.error'));
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
  const { theme } = useClientContext();
  return (
    <div className={theme.auth.container}>
      <section className={theme.auth.groupTheme.columns}>
        <Link href='/sign-in'>
          <Button.Link>
            <Icons.ArrowLeft />
          </Button.Link>
        </Link>
        <Heading.Four className={theme.auth.title}>
          {translate('auth.forgotPassword.title')}
        </Heading.Four>

        <Body.Two>{translate('auth.forgotPassword.description')}</Body.Two>
      </section>
      <form
        className={theme.auth.formTheme.container}
        onSubmit={operations.handleSubmit}
      >
        <Form.TextInput
          theme={theme.auth.textInputTheme}
          label={translate('auth.email.label')}
          placeholder={translate('auth.email.placeholder')}
          name='email'
          value={models.values.email}
          error={!!models.errors.email}
          helpText={models.errors.email}
          onChange={operations.handleChange}
          required
        />

        <Button.Solid
          className={theme.auth.formTheme.button}
          size='small'
          type='submit'
        >
          {translate('auth.sendEmail.buttonLabel')}
        </Button.Solid>
      </form>
    </div>
  );
}
