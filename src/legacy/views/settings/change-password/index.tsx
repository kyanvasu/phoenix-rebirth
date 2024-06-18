import { useClientContext } from "../../../../model/store/core.store/client.store";
import { TextInput } from "../../../../legacy/components/molecules/form";
import Spinner from "../../../../legacy/components/atoms/icons/spinner";
import { useAuth } from "../../../../model/interactions/use-auth";
import { Body, Button } from "../../../../legacy/components/atoms";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";

function useChangePassword() {
  const { sdk } = useClientContext();
  const initialValues = {
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  };
  const {
    operations: { changePassword },
  } = useAuth({ sdk });

  const validationSchema = yup.object().shape({
    current_password: yup
      .string()
      .min(8)
      .required("Current password is a required field"),
    new_password: yup
      .string()
      .min(8)
      .required("New password must be at least 8 characters"),
    confirm_new_password: yup
      .string()
      .required("Confirm and new password must be equals")
      .oneOf([yup.ref("new_password")]),
  });

  async function onSubmit(values: typeof initialValues) {
    try {
      await changePassword({
        ...values,
      });
      toast.success("Your password was updated sucessfully");
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
    <section className="flex flex-col px-5 py-5">
      <Toaster position="top-right" reverseOrder={false} />
      <Body.Two className="text-base-neutral-grey-100 mb-14">
        Change your password
      </Body.Two>

      <form
        className="flex flex-col gap-y-9"
        onSubmit={operations.handleSubmit}
      >
        <TextInput
          type="password"
          label={"Current Password"}
          placeholder={"Enter your current password"}
          name="current_password"
          onChange={operations.handleChange}
          value={models.values.current_password}
          helpText={models.errors.current_password}
          error={!!models.errors.current_password}
          required
        />
        <TextInput
          type="password"
          label={"New Password"}
          placeholder={"Enter your new password"}
          name="new_password"
          onChange={operations.handleChange}
          value={models.values.new_password}
          helpText={models.errors.new_password}
          error={!!models.errors.new_password}
          required
        />
        <TextInput
          type="password"
          label={"Confirm Password"}
          placeholder={"Confirm your new password"}
          name="confirm_new_password"
          onChange={operations.handleChange}
          value={models.values.confirm_new_password}
          helpText={models.errors.confirm_new_password}
          error={!!models.errors.confirm_new_password}
          required
        />

        <Button.Solid
          className="justify-center w-full"
          disabled={models.loading}
        >
          {models.loading ? <Spinner /> : "Change Password"}
        </Button.Solid>
      </form>
    </section>
  );
}
