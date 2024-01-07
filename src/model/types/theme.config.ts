export type EmptyStateStyles = {
  container: string;
  title: string;
  subtitle: string;
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
  formTheme: FormStyles;
  groupTheme: GroupStyles;
  checkBoxTheme: InputStyles;
  textInputTheme: InputStyles;
  title: string;
  container: string;
};

export type ThemeTypes = {
  emptyState: EmptyStateStyles;
  auth: AuthPageStyles;
};
