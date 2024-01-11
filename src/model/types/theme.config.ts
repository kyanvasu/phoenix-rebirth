export type EmptyStateTypes = {
  container: string;
  title: string;
  subtitle: string;
  button: string;
};

export type InputTypes = {
  container: string;
  label: string;
  input: string;
  error: string;
};

export type GroupTypes = {
  container: string;
  rows: string;
  columns: string;
};

export type FormTypes = {
  container: string;
  span: string;
  button: string;
  link: string;
  title: string;
};

export type AuthPageTypes = {
  emptyState: EmptyStateTypes;
  form: FormTypes;
  group: GroupTypes;
  checkBox: InputTypes;
  textInput: InputTypes;
  title: string;
  subtitle: string;
  container: string;
};

export type DropdownItemTypes = {
  container: string;
  text: string;
  icon: string;
  hover: string;
};

export type DropdownTypes = {
  container: string;
  button: string;
  panel: string;
  list: string;
  item: DropdownItemTypes;
};

export type SidebarTypes = {
  container: string;
  logoContainer: string;
  nav: string;
  ul: string;
  navItem: string;
  companyContainer: string;
  changeCompany: string;
  changeCompanyText: string;
  changeCompanyIcon: string;
};

export type ThemeTypes = {
  auth: AuthPageTypes;
  textInput: InputTypes;
  checkBox: InputTypes;
  emptyState: EmptyStateTypes;
  dropdown: DropdownTypes;
  sidebar: SidebarTypes;
};
