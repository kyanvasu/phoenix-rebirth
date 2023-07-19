
type ButtonVariant = 'solid' | 'outline' | 'link';
type ButtonSize = 'medium' | 'small' | 'x-small';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}
