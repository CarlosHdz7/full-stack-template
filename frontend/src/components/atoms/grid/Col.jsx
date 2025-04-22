export const Col = ({
  children,
  className = '',
  xs,
  sm,
  md,
  lg,
  xl,
  offset,
  offsetSm,
  offsetMd,
  offsetLg,
  offsetXl,
  ...props
}) => {
  const classes = [];

  if (xs !== undefined) classes.push(xs === true ? 'col' : `col-${xs}`);
  if (sm !== undefined) classes.push(sm === true ? 'col-sm' : `col-sm-${sm}`);
  if (md !== undefined) classes.push(md === true ? 'col-md' : `col-md-${md}`);
  if (lg !== undefined) classes.push(lg === true ? 'col-lg' : `col-lg-${lg}`);
  if (xl !== undefined) classes.push(xl === true ? 'col-xl' : `col-xl-${xl}`);

  if (
    xs === undefined &&
    sm === undefined &&
    md === undefined &&
    lg === undefined &&
    xl === undefined
  ) {
    classes.push('col');
  }

  if (offset) classes.push(`offset-${offset}`);
  if (offsetSm) classes.push(`offset-sm-${offsetSm}`);
  if (offsetMd) classes.push(`offset-md-${offsetMd}`);
  if (offsetLg) classes.push(`offset-lg-${offsetLg}`);
  if (offsetXl) classes.push(`offset-xl-${offsetXl}`);

  if (className) classes.push(className);

  return (
    <div className={classes.join(' ')} {...props}>
      {children}
    </div>
  );
};
