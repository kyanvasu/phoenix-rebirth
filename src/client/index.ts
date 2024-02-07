export * from '../model/store/core.store/client.store';
import { Table } from '../components/organism/table/table';
import * as Interactions from '../model/interactions';

import * as Molecules from '../components/molecules/index.client';
import * as Organism from '../components/organism/index.client';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  EmailPage,
  ResetPasswordPage,
  InvitePage,
  RESET_PASSWORD_SUCCESSFUL,
} from '../pages/(auth)';
import * as Pages from '../pages/index.client';
import EmptyTable from '../components/organism/table/empty';

const { useTable, useAuth } = Interactions;

export const Auth = {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  EmailPage,
  ResetPasswordPage,
  InvitePage,
  useAuth,
  RESET_PASSWORD_SUCCESSFUL,
};

export {
  Table,
  useTable,
  Interactions,
  Molecules,
  Organism,
  Pages,
  EmptyTable,
};
