import { useClientContext } from "../../../../model/store/core.store/client.store";
import { Body, Button, Heading } from "../../../../legacy/components/atoms";
import Spinner from "../../../../legacy/components/atoms/icons/spinner";
import { useUser } from "../../../../model/interactions/use-user";
import { useAuth } from "../../../../model/interactions/use-auth";
import { Form } from "../../../../legacy/components/molecules";
import { AuthPageTypes } from "../../../../model/types";
import { translate } from "../../../../translate";
import { useFormik } from "formik";
import { useState } from "react";
import Link from "next/link";
import * as yup from "yup";

interface props {
  redirect: () => void;
}

export function useSignIn({ redirect }: props) {
  const { sdk } = useClientContext();
  const [checkboxState, setCheckboxState] = useState(true);
  const { operations: userOperations } = useUser({ sdk });
  function handleToggle() {
    setCheckboxState(!checkboxState);
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const { operations } = useAuth({ sdk });
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(translate("auth.signIn.emailRequired")),
    password: yup.string().required(translate("auth.signIn.passwordRequired")),
  });

  async function onSubmit(values: typeof initialValues) {
    try {
      await operations.login(values.email, values.password);
      const profile = await userOperations.getUserInfo();
      localStorage.setItem("user", JSON.stringify(profile));
      redirect();
    } catch {
      setErrors({
        email: translate("auth.signIn.invalidInput"),
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
    <div className={theme.auth.container}>
      <div>
        <Heading.Five className={theme.auth.title}>
          {translate("auth.signIn.account")}
        </Heading.Five>
      </div>
      <FormComponent
        theme={theme.auth}
        operations={operations}
        models={models}
      />
    </div>
  );
}

interface FormComponentProps {
  theme: AuthPageTypes;
  operations: any;
  models: any;
}

function FormComponent({ theme, operations, models }: FormComponentProps) {
  return (
    <form className={theme.form.container} onSubmit={operations.handleSubmit}>
      <div className={theme.group.container}>
        <div className={theme.group.columns}>
          <Form.TextInput
            type="email"
            label={translate("auth.email.label")}
            theme={theme.textInput}
            placeholder={translate("auth.email.placeholder")}
            name="email"
            required
            value={models.values.email}
            onChange={operations.handleChange}
            error={!!models.errors.email}
            helpText={models.errors.email}
          />
          <Form.TextInput
            type="password"
            name="password"
            theme={theme.textInput}
            label={translate("auth.password.label")}
            placeholder={translate("auth.password.placeholder")}
            required
            value={models.values.password}
            onChange={operations.handleChange}
            error={!!models.errors.password}
            helpText={models.errors.password}
          />
        </div>
      </div>

      <ActionForm theme={theme} operations={operations} models={models} />
    </form>
  );
}

function ActionForm({ theme, operations, models }: FormComponentProps) {
  return (
    <div className={theme.group.columns}>
      <span className={theme.form.span}>
        <Form.CheckboxInput
          id="remember-me"
          theme={theme.checkBox}
          label={translate("auth.rememberMe")}
          checked={models.checkboxState}
          onChange={operations.handleToggle}
        />

        <Link className={theme.form.link} href="/forgot-password">
          {translate("auth.signIn.forgotPasswordLabel")}
        </Link>
      </span>
      <div className={theme.group.columns}>
        <Button.Solid
          className={theme.form.button}
          size="small"
          type="submit"
          disabled={models.isSubmitting}
        >
          {models.isSubmitting ? <Spinner /> : (
            translate("auth.signIn.buttonLabel")
          )}
        </Button.Solid>

        <span className={theme.form.span}>
          <Body.Three className={theme.form.title}>
            {translate("auth.signIn.noHaveAccount")}
          </Body.Three>

          <Link className={theme.form.link} href="/sign-up">
            {translate("auth.signIn.signUpLink")}
          </Link>
        </span>
      </div>
    </div>
  );
}
