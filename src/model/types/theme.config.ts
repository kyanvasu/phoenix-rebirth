export type EmptyStateStyles = {
  container: string;
  title: string;
  subtitle: string;
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
  emptyState: EmptyStateStyles;
  dropdown: DropdownTypes;
  sidebar: SidebarTypes;
};
