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
import { AuthPageStyles } from '../../../model/types';

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
  });

  async function onSubmit(values: typeof initialValues) {
    try {
      await register({
        ...values,
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
export function RegisterPage({ redirect }: props) {
  const { models, operations } = useSignUp({ redirect });
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
  theme: AuthPageStyles;
  models: any;
  operations?: any;
}

const FormComponent: React.FC<FormComponentProps> = ({
  theme,
  models,
  operations,
}) => {
  return (
    <form
      className={theme.formTheme.container}
      onSubmit={operations.handleSubmit}
    >
      <div className={theme.groupTheme.container}>
        <NameInputFields
          models={models}
          operations={operations}
          theme={theme}
        />
        <AuthInputFields
          models={models}
          operations={operations}
          theme={theme}
        />
      </div>

      <ActionForm models={models} theme={theme} />
    </form>
  );
};

const NameInputFields: React.FC<FormComponentProps> = ({
  theme,
  models,
  operations,
}) => {
  return (
    <div className={theme.groupTheme.rows}>
      <Form.TextInput
        theme={theme.textInputTheme}
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
        theme={theme.textInputTheme}
        type='text'
        label={translate('auth.lastName.label')}
        placeholder={translate('auth.lastName.placeholder')}
        value={models.values.lastname}
        onChange={operations.handleChange}
        name='lastname'
      />
    </div>
  );
};

const AuthInputFields: React.FC<FormComponentProps> = ({
  theme,
  models,
  operations,
}) => {
  return (
    <div className={theme.groupTheme.columns}>
      <Form.TextInput
        theme={theme.textInputTheme}
        type='email'
        placeholder={translate('auth.email.placeholder')}
        label={translate('auth.email.label')}
        value={models.values.email}
        onChange={operations.handleChange}
        name='email'
        helpText={models.errors.email}
        error={!!models.errors.email}
      />

      <Form.TextInput
        theme={theme.textInputTheme}
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
        theme={theme.textInputTheme}
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
};

const ActionForm: React.FC<FormComponentProps> = ({ theme, models }) => {
  return (
    <div className={theme.groupTheme.columns}>
      <Button.Solid
        className={theme.formTheme.button}
        size='small'
        type='submit'
        disabled={models.loading}
      >
        {models.loading ? <Spinner /> : translate('auth.signUp.buttonLabel')}
      </Button.Solid>

      <span className={theme.formTheme.span}>
        <Body.Three className={theme.formTheme.title}>
          {translate('auth.signIn.haveAccount')}
        </Body.Three>

        <Link className={theme.formTheme.link} href='/sign-in'>
          {translate('auth.signUp.signInLink')}
        </Link>
      </span>
    </div>
  );
};
