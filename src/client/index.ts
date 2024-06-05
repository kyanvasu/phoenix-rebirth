export * from "../model/store/core.store/client.store";
import { Table } from "../legacy/components/organism/table/table";
import * as Interactions from "../model/interactions";

import * as Molecules from "../legacy/components/molecules/index.client";
import * as Organism from "../legacy/components/organism/index.client";
import {
  EmailPage,
  ForgotPasswordPage,
  InvitePage,
  LoginPage,
  RegisterPage,
  RESET_PASSWORD_SUCCESSFUL,
  ResetPasswordPage,
} from "../views/auth";
import * as Pages from "../views/index.client";
import EmptyTable from "../legacy/components/organism/table/empty";

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
  EmptyTable,
  Interactions,
  Molecules,
  Organism,
  Pages,
  Table,
  useTable,
};
