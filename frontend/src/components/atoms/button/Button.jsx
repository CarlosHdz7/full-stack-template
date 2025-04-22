import { classNamesModule } from '@utils/classNamesModule';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  className = '',
  ...rest
}) => {
  const buttonClasses = classNamesModule(
    styles,
    'button',
    variant,
    size,
    fullWidth && 'fullWidth',
    disabled && 'disabled',
    className
  );

  return (
    <button className={buttonClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
