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


export type ActionStyles = {
  container: string;
  span: string;
  button: string;
  link: string;
  titleThree: string;
  checkBoxTheme: InputStyles;
};

export type LoginFormStyles = {
  container: string;
  actionTheme: ActionStyles;
  textInputTheme: InputStyles;
};

export type LoginPageStyles = {
  formTheme: LoginFormStyles;
  title: string;
  container: string;
};

export type ThemeTypes = {
  emptyState: EmptyStateStyles;
  login: LoginPageStyles;
};
