export * from '../model/store/core.store/client.store';
import { Table } from '../components/organism/table/table';
import { useAuth } from '../model/interactions/use-auth';
import { useTable } from '../model/interactions/use-table';

import * as Molecules from '../components/molecules/index.client';
import * as Organism from '../components/organism/index.client';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  EmailPage,
  ResetPasswordPage,
} from '../pages/(auth)';
import * as Pages from '../pages/index.client';
import EmptyTable from '../components/organism/table/empty';
export const Auth = {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  EmailPage,
  ResetPasswordPage,
  useAuth,
};

export { Table, useTable, Molecules, Organism, Pages, EmptyTable };
