// eslint-disable-next-line import/no-anonymous-default-export
export default {
  auth: {
    invite: {
      hashError: "Invalid hash or state",
      captchaError: "Captcha failed",
    },
    email: {
      label: "Email",
      placeholder: "Enter your email",
      required: "Email is required field",
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
      confirm: "Confirm Password",
      required: "Password is required field",
      reset: "Reset Password",
      validation: "Your password must be 8 characters long.",
      resetSuccess: "Your password has been reset successfully",
      resetError: "Your password reset failed",
    },
    phone: {
      label: "Phone Number",
      placeholder: "(999)-999-9999",
      validation: "Your Number should be 10 digits long.",
    },
    newPassword: {
      label: "New Password",
      placeholder: "Enter your new password",
      buttonLabel: "Create New Password",
    },
    repeatPassword: {
      label: "Repeat new password",
      placeholder: "Repeat password",
    },
    firstName: {
      label: "First Name",
      placeholder: "Add your First Name",
    },
    lastName: {
      label: "Last Name",
      placeholder: "Add your Last Name",
    },
    sendEmail: {
      buttonLabel: "Send Email",
      success: "Your email has been sent successfully",
      error: "Something went wrong, please try again later",
      emailSent:
        "We've sent an email to {email} with password reset instructions.",
      sendTitle: "An email was send",
      return: "Return to login",
    },
    signIn: {
      haveAccount: "Have an account?",
      buttonLabel: "Sign In",
      invalidInput: "Invalid email or password",
      emailRequired: "Please enter a valid email address",
      passwordRequired: "Please enter a valid password",
      account: "Sign in to your account",
      forgotPasswordLabel: "Forgot Password?",
      noHaveAccount: "Don’t have an account?",
      signUpLink: "Sign Up",
    },
    signUp: {
      title: "Create an account",
      requiredFirstName: "First name is required field",
      requiredEmail: "Email is required field",
      requiredPassword: "Password is required field",
      requiredPasswordConfirmation: "Password confirmation is required",
      passwordMatch: "Passwords must match",
      buttonLabel: "Sign Up",
      signInLink: "Sign In",
      requiredPhone: "Phone is required field",
    },
    createPassword: "Create Password",
    rememberMe: "Remember me",
    forgotPassword: {
      title: "Forgot Password",
      description:
        "Enter your email and we will send you a link to reset your password.",
      placeholder: "Enter your email address",
    },
    resetPassword: {
      title: "Reset Password",
      description: "Your password must be 8 characters long.",
      emailSent:
        "We have sent you an email with instructions to reset your password.",
      buttonLabel: "Sign In",
    },
  },
  files: {
    upload: "Upload",
    maxFileNumbers: "Cannot add more than 5 files",
    fileTypes: "Only JPG, PNG, or PDF files are allowed",
    fileSize: "File size should not exceed 50 MB",
    uploadFiles: "Upload Files",
    uploadDocuments: "Upload Documents",
    noFileSelected: "No files selected",
    fileValidationsError:
      "The files to be uploaded do not comply with the validations",
    validFilesTypes: "PDF, PNG, JPG or DOCX. (MAX 5*50MB).",
  },
};
