import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import React from 'react';
import { useAuth } from '../../../model/interactions/use-auth';
import { useClientContext } from '../../../model/store/core.store/client.store';
import { Form } from '../../../components/molecules';
import { Body, Button, Heading } from '../../../components/atoms';
import { useUser } from '../../../model/interactions/use-user';
import Spinner from '../../../components/atoms/icons/spinner';
import { translate } from '../../../translate';
import { AuthPageTypes } from '../../../model/types';

interface props {
  redirect: () => void;
  allow_phone?: boolean
  customFields?: {
    name: string;
    data: any;
  }[];
  handleCaptcha?: () => Promise<boolean | undefined>;
}

export function useSignUp({ redirect, customFields, handleCaptcha }: props) {
  const { sdk } = useClientContext();

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone:''
  };

  const {
    operations: { register },
  } = useAuth({ sdk });
  const { operations: userOperations } = useUser({ sdk });

  const validationSchema = yup.object().shape({
    firstname: yup
      .string()
      .required(translate('auth.signUp.requiredFirstName')),
    lastname: yup.string(),
    email: yup
      .string()
      .email()
      .required(translate('auth.signUp.requiredEmail')),
    password: yup
      .string()
      .min(8)
      .required(translate('auth.signUp.requiredPassword')),
    password_confirmation: yup
      .string()
      .required(translate('auth.signUp.requiredPasswordConfirmation'))
      .oneOf([yup.ref('password')], translate('auth.signUp.passwordMatch')),
    phone: yup
    .string()
    .min(10)
  });

  async function onSubmit(values: typeof initialValues) {
    try {
      if (handleCaptcha) {
        const captchaSuccess = await handleCaptcha();
        if (!captchaSuccess) {
          throw new Error(translate('auth.invite.captchaError'));
        }
      }

      await register({
        ...values,
        custom_fields: customFields,
      });
      const profile = await userOperations.getUserInfo();
      localStorage.setItem('user', JSON.stringify(profile));
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
export function RegisterPage({
  redirect,
  customFields = [],
  handleCaptcha,
  allow_phone
}: props) {
  const { models, operations } = useSignUp({
    redirect,
    customFields,
    handleCaptcha,
  });
  const { theme } = useClientContext();
  return (
    <div className={theme.auth.container}>
      <div>
        <Heading.Five className={theme.auth.title}>
          {translate('auth.signUp.title')}
        </Heading.Five>
      </div>

      <FormComponent
        theme={theme.auth}
        models={models}
        operations={operations}
      />
    </div>
  );
}

interface FormComponentProps {
  theme: AuthPageTypes;
  models: any;
  operations?: any;
  allow_phone?: boolean;
}

function FormComponent({ theme, models, operations,allow_phone }: FormComponentProps) {
  return (
    <form className={theme.form.container} onSubmit={operations.handleSubmit}>
      <div className={theme.group.container}>
        <NameInputFields
          models={models}
          operations={operations}
          theme={theme}
        />
        <AuthInputFields
          models={models}
          operations={operations}
          theme={theme}
          allow_phone={allow_phone}
        />
      </div>

      <ActionForm models={models} theme={theme} />
    </form>
  );
}

function NameInputFields({ theme, models, operations }: FormComponentProps) {
  return (
    <div className={theme.group.rows}>
      <Form.TextInput
        theme={theme.textInput}
        type='text'
        label={translate('auth.firstName.label')}
        placeholder={translate('auth.firstName.placeholder')}
        value={models.values.firstname}
        onChange={operations.handleChange}
        name='firstname'
        helpText={models.errors.firstname}
        error={!!models.errors.firstname}
      />

      <Form.TextInput
        theme={theme.textInput}
        type='text'
        label={translate('auth.lastName.label')}
        placeholder={translate('auth.lastName.placeholder')}
        value={models.values.lastname}
        onChange={operations.handleChange}
        name='lastname'
      />
    </div>
  );
}

function AuthInputFields({ theme, models, operations,allow_phone }: FormComponentProps) {
  return (
    <div className={theme.group.columns}>
      <Form.TextInput
        theme={theme.textInput}
        type='email'
        placeholder={translate('auth.email.placeholder')}
        label={translate('auth.email.label')}
        value={models.values.email}
        onChange={operations.handleChange}
        name='email'
        helpText={models.errors.email}
        error={!!models.errors.email}
      />
      {allow_phone && (<Form.TextInput
        theme={theme.textInput}
        type='text'
        label={translate('auth.phone.label')}
        placeholder={translate('auth.phone.placeholder')}
        value={models.values.phone}
        onChange={operations.handleChange}
        name='phone'
      />)}
      <Form.TextInput
        theme={theme.textInput}
        type='password'
        label={translate('auth.password.label')}
        placeholder={translate('auth.password.placeholder')}
        value={models.values.password}
        onChange={operations.handleChange}
        name='password'
        helpText={models.errors.password}
        error={!!models.errors.password}
      />

      <Form.TextInput
        theme={theme.textInput}
        type='password'
        label={translate('auth.password.confirm')}
        placeholder={translate('auth.password.placeholder')}
        value={models.values.password_confirmation}
        onChange={operations.handleChange}
        name='password_confirmation'
        helpText={models.errors.password_confirmation}
        error={!!models.errors.password_confirmation}
      />
    </div>
  );
}

function ActionForm({ theme, models }: FormComponentProps) {
  return (
    <div className={theme.group.columns}>
      <Button.Solid
        className={theme.form.button}
        size='small'
        type='submit'
        disabled={models.loading}
      >
        {models.loading ? <Spinner /> : translate('auth.signUp.buttonLabel')}
      </Button.Solid>

      <span className={theme.form.span}>
        <Body.Three className={theme.form.title}>
          {translate('auth.signIn.haveAccount')}
        </Body.Three>

        <Link className={theme.form.link} href='/sign-in'>
          {translate('auth.signUp.signInLink')}
        </Link>
      </span>
    </div>
  );
}
