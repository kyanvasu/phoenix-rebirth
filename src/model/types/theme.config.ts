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

export type AvatarTypes = {
  container: string;
  img: string;
  "xx-small": string;
  "x-small": string;
  small: string;
  medium: string;
  large: string;
  default: string;
};
export type BadgeTypes = {
  button: string;
  square: string;
  round: string;
};

export type CardTypes = {
  container: string;
  default: string;
};

export type CardButtonTypes = {
  container: string;
  icon: string;
};

export type HelpText = {
  error: string;
};
export type LabelTypes = {
  required: string;
};

export type ThemeTypes = {
  emptyState: EmptyStateStyles;
  dropdown: DropdownTypes;
  sidebar: SidebarTypes;
  avatar: AvatarTypes;
  badge: BadgeTypes;
  card: CardTypes;
  cardButton: CardButtonTypes;
  helpText: HelpText;
  label: LabelTypes;
};
