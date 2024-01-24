import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import React from 'react';
import { useAuth } from '../../../model/interactions/use-auth';
import { useClientContext } from '../../../model/store/core.store/client.store';
import { Form } from '../../../components/molecules';
import { Body, Button, Heading } from '../../../components/atoms';
import Spinner from '../../../components/atoms/icons/spinner';
import { translate } from '../../../translate';
import { AuthPageTypes } from '../../../model/types';

interface props {
  redirect: () => void;
  hash: string;
}
export function useInvite({ redirect, hash }: props) {
  const { sdk } = useClientContext();
  const {
    operations: { processInvite },
  } = useAuth({ sdk });

  const onSubmit = async (values: {
    password: string;
    password_confirmation: string;
    firstname: string;
    lastname: string;
  }) => {
    if (!hash) {
      throw new Error(translate('auth.invite.hashError'));
    }
    try {
      console.log(hash, values);
      const resp = await processInvite({
        invite_hash: hash,
        password: values.password,
        firstname: values.firstname,
        lastname: values.lastname,
      });
      console.log(resp);
      redirect();
    } catch (error) {
      console.error('Error processing invite:', error);
      // Handle the error appropriately here, e.g. show an error message to the user
    }
  };

  const validationSchema = yup.object().shape({
    firstname: yup
      .string()
      .required(translate('auth.signUp.requiredFirstName')),
    lastname: yup.string(),
    password: yup
      .string()
      .min(8)
      .required(translate('auth.signUp.requiredPassword')),
    password_confirmation: yup
      .string()
      .required(translate('auth.signUp.requiredPasswordConfirmation'))
      .oneOf([yup.ref('password')], translate('auth.signUp.passwordMatch')),
  });

  const formikProps = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      password: '',
      password_confirmation: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit,
  });

  const { values, handleChange, handleSubmit, errors, isSubmitting } =
    formikProps;

  return {
    models: { values, errors, loading: isSubmitting },
    operations: { handleChange, handleSubmit },
  };
}

export function InvitePage({ redirect, hash }: props) {
  const { models, operations } = useInvite({ redirect, hash });
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
}

function FormComponent({ theme, models, operations }: FormComponentProps) {
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

function AuthInputFields({ theme, models, operations }: FormComponentProps) {
  return (
    <div className={theme.group.columns}>
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
