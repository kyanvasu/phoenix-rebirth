export * from '../model/store/core.store/client.store';
import { useAuth } from '../model/interactions/use-auth';
import { LoginPage, RegisterPage, ForgotPasswordPage, EmailPage } from '../pages/(auth)';

export const Auth = {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  EmailPage,
  useAuth,
};
