// Box.jsx
import styles from './Box.module.css';

const Box = ({
  // Layout props
  component = 'div',
  display,
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  alignContent,
  flexGrow,
  flexShrink,
  flexBasis,
  flex,
  gap,

  // Spacing props
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my, // margin
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py, // padding

  // Color props
  bgcolor,
  color,

  // Border props
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderRadius,

  // Shadow props
  boxShadow,

  // Size props
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,

  // Other props
  position,
  zIndex,
  overflow,

  // Component props
  className,
  children,
  ...props
}) => {
  // Helper function to generate CSS class names from props
  const generateClassNames = () => {
    const classNames = [];

    // Add display classes
    if (display) classNames.push(styles[`display-${display}`]);

    // Add flex classes
    if (flexDirection) classNames.push(styles[`flex-direction-${flexDirection}`]);
    if (flexWrap) classNames.push(styles[`flex-wrap-${flexWrap}`]);
    if (justifyContent) classNames.push(styles[`justify-content-${justifyContent}`]);
    if (alignItems) classNames.push(styles[`align-items-${alignItems}`]);
    if (alignContent) classNames.push(styles[`align-content-${alignContent}`]);
    if (flexGrow !== undefined) classNames.push(styles[`flex-grow-${flexGrow}`]);
    if (flexShrink !== undefined) classNames.push(styles[`flex-shrink-${flexShrink}`]);
    if (gap !== undefined) classNames.push(styles[`gap-${gap}`]);

    // Add margin classes
    if (m !== undefined) classNames.push(styles[`m-${m}`]);
    if (mt !== undefined) classNames.push(styles[`mt-${mt}`]);
    if (mr !== undefined) classNames.push(styles[`mr-${mr}`]);
    if (mb !== undefined) classNames.push(styles[`mb-${mb}`]);
    if (ml !== undefined) classNames.push(styles[`ml-${ml}`]);
    if (mx !== undefined) classNames.push(styles[`mx-${mx}`]);
    if (my !== undefined) classNames.push(styles[`my-${my}`]);

    // Add padding classes
    if (p !== undefined) classNames.push(styles[`p-${p}`]);
    if (pt !== undefined) classNames.push(styles[`pt-${pt}`]);
    if (pr !== undefined) classNames.push(styles[`pr-${pr}`]);
    if (pb !== undefined) classNames.push(styles[`pb-${pb}`]);
    if (pl !== undefined) classNames.push(styles[`pl-${pl}`]);
    if (px !== undefined) classNames.push(styles[`px-${px}`]);
    if (py !== undefined) classNames.push(styles[`py-${py}`]);

    // Add color classes
    if (bgcolor) classNames.push(styles[`bgcolor-${bgcolor}`]);
    if (color) classNames.push(styles[`color-${color}`]);

    // Add border classes
    if (borderRadius) classNames.push(styles[`border-radius-${borderRadius}`]);

    // Add shadow classes
    if (boxShadow) classNames.push(styles[`box-shadow-${boxShadow}`]);

    // Add position classes
    if (position) classNames.push(styles[`position-${position}`]);

    // Add overflow classes
    if (overflow) classNames.push(styles[`overflow-${overflow}`]);

    // Add custom className if provided
    if (className) classNames.push(className);

    return classNames.join(' ');
  };

  // Inline styles for properties that don't have predefined classes
  const getInlineStyles = () => {
    const style = {};

    // Border styles (if not using predefined classes)
    if (border) style.border = border;
    if (borderTop) style.borderTop = borderTop;
    if (borderRight) style.borderRight = borderRight;
    if (borderBottom) style.borderBottom = borderBottom;
    if (borderLeft) style.borderLeft = borderLeft;

    // Size styles
    if (width) style.width = width;
    if (height) style.height = height;
    if (maxWidth) style.maxWidth = maxWidth;
    if (maxHeight) style.maxHeight = maxHeight;
    if (minWidth) style.minWidth = minWidth;
    if (minHeight) style.minHeight = minHeight;

    // Set flex basis and flex if provided
    if (flexBasis) style.flexBasis = flexBasis;
    if (flex) style.flex = flex;

    // Set zIndex if provided
    if (zIndex) style.zIndex = zIndex;

    return style;
  };

  const Component = component;
  const combinedClassName = generateClassNames();
  const inlineStyles = getInlineStyles();

  return (
    <Component className={combinedClassName} style={inlineStyles} {...props}>
      {children}
    </Component>
  );
};

export default Box;
