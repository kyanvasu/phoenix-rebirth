import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../../../model/interactions/use-user';
import { useClientContext } from '../../../model/store/core.store/client.store';
import Profile from '../../../components/molecules/profile';
import { TextInput } from '../../../components/molecules/form';
// import Select from '../../../components/molecules/select';
import { Button } from '../../../components/atoms';
import { UserData } from '@kanvas/core';

export interface Props {
  profile?: UserData;
  setProfile?: any;
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function useProfile({ profile, setProfile }: Props) {
  const { sdk } = useClientContext();
  const {
    operations: { updateUserData },
  } = useUser({ sdk });

  const {
    id: userId,
    firstname,
    lastname,
    email,
    contact,
    custom_fields,
  } = profile!;

  const contact_email = custom_fields.data.find(
    ({ name }) => name === 'contact_email'
  )?.value;
  const landing = custom_fields.data.find(
    ({ name }) => name === 'landing_page'
  )?.value;

  const initialValues = {
    firstname,
    lastname,
    cell_phone_number: contact.cell_phone_number ?? '',
    phone_number: contact.phone_number ?? '',
    email,
    contact_email: contact_email ?? '',
    landing: landing ?? 'No landing pages',
  };

  const validationSchema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    cell_phone_number: yup
      .string()
      .matches(phoneRegExp, 'Invalid Phone Format')
      .nullable(),
    phone_number: yup
      .string()
      .matches(phoneRegExp, 'Invalid Phone Format')
      .nullable(),
    email: yup.string().email().required(),
    contact_email: yup.string().email().nullable(),
    landing: yup.string(),
  });

  const formikProps = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  async function onSubmit(values: any): Promise<void> {
    try {
      const { contact_email, email, landing, ...payload } = values;
      if (!dirty) return;

      const updatedUser = {
        custom_fields: [
          {
            name: 'contact_email',
            data: contact_email,
          },
          {
            name: 'landing_page',
            data: landing,
          },
        ],
        ...payload,
      };

      const updatedProfile = await updateUserData({ userId, updatedUser });
      setProfile(updatedProfile!);

      toast.success('Successfully updated your profile');
    } catch (error: any) {
      if (
        error.message ===
        'ApolloError: Validation failed for the field [updateUser].'
      )
        toast.error('Display Name is already taken');

      setErrors({ email: error.message });
      console.error(error);
    }
  }

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
    isSubmitting,
    setFieldValue,
    dirty,
  } = formikProps;

  return {
    models: {
      values,
      errors,
      loading: isSubmitting,
      haveChanges: dirty,
      initialValues,
      profile,
    },
    operations: { handleChange, handleSubmit, setFieldValue },
  };
}

export function ProfileView({ profile, setProfile }: Props) {
  const { models, operations } = useProfile({profile, setProfile});

  return (
    <section className='flex flex-col px-6 py-5'>
      <Toaster position='top-right' reverseOrder={false} />

      <Profile
        className='mb-5'
        Size='medium'
        name={`${models.profile?.firstname} ${models.profile?.lastname}`}
      />

      <form
        className='flex flex-col gap-y-5'
        onSubmit={operations.handleSubmit}
      >
        <TextInput
          name='firstname'
          type='text'
          label='Name'
          placeholder='Introduce your name'
          onChange={operations.handleChange}
          value={models.values.firstname}
          helpText={models.errors.firstname}
          error={!!models.errors.firstname}
          required
        />
        <TextInput
          name='lastname'
          type='text'
          label='Last Name'
          placeholder='Introduce your last name'
          onChange={operations.handleChange}
          value={models.values.lastname}
          helpText={models.errors.lastname}
          error={!!models.errors.lastname}
          required
        />
        <TextInput
          name='cell_phone_number'
          type='tel'
          label='Cellphone number'
          placeholder='Your phone number'
          onChange={operations.handleChange}
          value={models.values.cell_phone_number}
          helpText={models.errors.cell_phone_number}
          error={!!models.errors.cell_phone_number}
        />
        <TextInput
          name='phone_number'
          type='tel'
          label='Work phone number'
          placeholder='Work phone number'
          onChange={operations.handleChange}
          value={models.values.phone_number}
          helpText={models.errors.phone_number}
          error={!!models.errors.phone_number}
        />
        <TextInput
          name='email'
          type='email'
          placeholder='Email'
          label='Account Email'
          onChange={operations.handleChange}
          value={models.values.email}
          helpText={models.errors.email}
          error={!!models.errors.email}
          disabled
        />
        {/* <Select
          options={[]}
          name='landing'
          label='Select Landing Page'
          value={models.values.landing}
          setFieldValue={operations.setFieldValue}
        /> */}
        <TextInput
          name='contact_email'
          type='email'
          label='Contact Email'
          placeholder='example@example.com'
          onChange={operations.handleChange}
          value={models.values.contact_email}
          helpText={models.errors.contact_email as string}
          error={!!models.errors.contact_email}
        />
        <Button.Solid
          className='justify-center w-full'
          size='medium'
          type='submit'
          disabled={!models.haveChanges}
        >
          Save
        </Button.Solid>
      </form>
    </section>
  );
}