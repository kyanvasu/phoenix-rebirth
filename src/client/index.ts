export * from '../model/store/core.store/client.store';
import { Table } from '../components/organism/table/table';
import { useAuth } from '../model/interactions/use-auth';
import { useTable } from '../model/interactions/use-table';

import * as Molecules from '../components/molecules/index.client';

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  EmailPage,
  ResetPasswordPage,
} from '../pages/(auth)';

export const Auth = {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  EmailPage,
  ResetPasswordPage,
  useAuth,
};

export { Table, useTable, Molecules };
