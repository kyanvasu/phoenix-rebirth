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
  emptyStateTheme: EmptyStateStyles;
  formTheme: FormStyles;
  groupTheme: GroupStyles;
  checkBoxTheme: InputStyles;
  textInputTheme: InputStyles;
  title: string;
  subtitle: string;
  container: string;
};

export type ThemeTypes = {
  auth: AuthPageStyles;
};
