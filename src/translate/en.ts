// eslint-disable-next-line import/no-anonymous-default-export
export default {
  auth: {
    email: {
      label: 'Email',
      placeholder: 'anna@gmail.com',
    },
    password: {
      label: 'Password',
      placeholder: '********',
      confirm: 'Confirm Password',
    },
    firstName: {
      label: 'First Name',
      placeholder: 'Add your First Name',
    },
    lastName: {
      label: 'Last Name',
      placeholder: 'Add your Last Name',
    },
    signIn: {
      haveAccount: 'Have an account?',
      buttonLabel: 'Sign In',
      invalidInput: 'Invalid email or password',
      emailRequired: 'Please enter a valid email address',
      passwordRequired: 'Please enter a valid password',
      account: 'Sign in to your account',
      forgotPasswordLabel: 'Forgot Password?',
      noHaveAccount: 'Don’t have an account?',
      signUpLink: 'Sign Up',
    },
    signUp: {
      title: 'Create an account',
      requiredFirstName: 'First name is required field',
      requiredEmail: 'Email is required field',
      requiredPassword: 'Password is required field',
      requiredPasswordConfirmation: 'Password confirmation is required',
      passwordMatch: 'Passwords must match',
      buttonLabel: 'Sign Up',
      signInLink: 'Sign In',
    },
    createPassword: 'Create Password',
    rememberMe: 'Remember me',
    forgotPassword: {
      title: 'Forgot Password',
      description:
        'Enter your email and we will send you a link to reset your password.',
      'email-placeholder': 'EJ: myexample@gmail.com',
    },
    resetPassword: {
      title: 'Reset Password',
      description: 'Your password must be 8 characters long.',
    },
  },
};
