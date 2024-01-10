export type EmptyStateStyles = {
  container: string;
  title: string;
  subtitle: string;
  button: string;
};


export type InputStyles = {
  container: string;
  label: string;
  input: string;
  error: string;
};

export type GroupStyles = {
  container: string;
  rows: string;
  columns: string;
};

export type FormStyles = {
  container: string;
  span: string;
  button: string;
  link: string;
  title: string;
};

export type AuthPageStyles = {
  emptyState: EmptyStateStyles;
  form: FormStyles;
  group: GroupStyles;
  checkBox: InputStyles;
  textInput: InputStyles;
  title: string;
  subtitle: string;
  container: string;
};

export type DropdownTypes = {
  container: string;
  button: string;
  panel: string;
  list: string;
  item: {
    container: string;
    text: string;
    icon: string;
    hover: string;
  };
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
  auth: AuthPageStyles;
  emptyState: EmptyStateStyles;
  dropdown: DropdownTypes;
  sidebar: SidebarTypes;
};
