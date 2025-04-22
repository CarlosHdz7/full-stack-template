import { classNamesModule } from '@utils/classNamesModule';
import styles from './Typography.module.css';

const Typography = ({
  children,
  variant = 'body1',
  align = 'left',
  weight = 'normal',
  color,
  noWrap = false,
  gutterBottom = false,
  className = '',
  as,
  ...rest
}) => {
  // Determine which HTML element to use based on variant
  const getDefaultElement = () => {
    if (variant.startsWith('h')) {
      return variant; // h1, h2, etc.
    }
    if (variant.startsWith('subtitle')) {
      return 'h6';
    }
    return 'p';
  };

  const Component = as || getDefaultElement();

  const typographyClasses = classNamesModule(
    styles,
    'typography',
    variant,
    `align-${align}`,
    `weight-${weight}`,
    noWrap && 'noWrap',
    gutterBottom && 'gutterBottom',
    className
  );

  const style = color ? { color, ...rest.style } : rest.style;

  return (
    <Component className={typographyClasses} style={style} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;
