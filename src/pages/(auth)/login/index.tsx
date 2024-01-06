import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { Heading, Button, Body } from '../../../components/atoms';
import { Form } from '../../../components/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../../model/interactions/use-auth';
import { useClientContext } from '../../../client';
import { useUser } from '../../../model/interactions/use-user';
import Spinner from '../../../components/atoms/icons/spinner';
import { translate } from '../../../translate';
import { LoginPageStyles } from '../../../model/types';

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
    email: yup
      .string()
      .email()
      .required(translate('auth.signIn.emailRequired')),
    password: yup.string().required(translate('auth.signIn.passwordRequired')),
  });

  async function onSubmit(values: typeof initialValues) {
    try {
      await operations.login(values.email, values.password);
      const profile = await userOperations.getUserInfo();
      localStorage.setItem('user', JSON.stringify(profile));
      redirect();
    } catch {
      setErrors({
        email: translate('auth.signIn.invalidInput'),
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
  const { theme } = useClientContext();
  return (
    <div className={theme.login.container}>
      <Heading.Five className={theme.login.title}>
        {translate('auth.signIn.account')}
      </Heading.Five>
      <LoginForm theme={theme.login} operations={operations} models={models} />
    </div>
  );
}

interface FormProps {
  theme: LoginPageStyles;
  operations: any;
  models: any;
}

const LoginForm: React.FC<FormProps> = ({ theme, operations, models }) => {
  return (
    <form className={theme.container} onSubmit={operations.handleSubmit}>
      <Form.TextInput
        type='email'
        label={translate('auth.email.label')}
        theme={theme.textInputTheme}
        placeholder={translate('auth.email.placeholder')}
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
        theme={theme.textInputTheme}
        label={translate('auth.password.label')}
        placeholder={translate('auth.password.placeholder')}
        required
        value={models.values.password}
        onChange={operations.handleChange}
        error={!!models.errors.password}
        helpText={models.errors.password}
      />

      <ActionForm theme={theme} operations={operations} models={models} />
    </form>
  );
};

const ActionForm: React.FC<FormProps> = ({ theme, operations, models }) => {
  return (
    <div className={theme.formTheme.container}>
      <div className={theme.checkBoxTheme.container}>
        <Form.CheckboxInput
          id='remember-me'
          theme={theme.checkBoxTheme}
          label={translate('auth.rememberMe')}
          checked={models.checkboxState}
          onChange={operations.handleToggle}
        />

        <Link className={theme.formTheme.link} href='/forgot-password'>
          {translate('auth.signIn.forgotPasswordLabel')}
        </Link>
      </div>

      <Button.Solid
        className={theme.formTheme.button}
        size='small'
        type='submit'
        disabled={models.isSubmitting}
      >
        {models.isSubmitting ? (
          <Spinner />
        ) : (
          translate('auth.signIn.buttonLabel')
        )}
      </Button.Solid>

      <span className={theme.formTheme.span}>
        <Body.Three className={theme.formTheme.title}>
          {translate('auth.signIn.noHaveAccount')}
        </Body.Three>

        <Link className={theme.formTheme.link} href='/sign-up'>
          {translate('auth.signIn.signUpLink')}
        </Link>
      </span>
    </div>
  );
};
