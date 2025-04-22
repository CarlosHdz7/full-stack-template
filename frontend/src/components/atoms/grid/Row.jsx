export const Row = ({
  children,
  className = '',
  justifyContent,
  alignItems,
  flexDirection,
  ...props
}) => {
  const classes = ['row'];

  if (className) classes.push(className);
  if (justifyContent) classes.push(`justify-content-${justifyContent}`);
  if (alignItems) classes.push(`align-items-${alignItems}`);
  if (flexDirection) classes.push(`flex-${flexDirection}`);

  return (
    <div className={classes.join(' ')} {...props}>
      {children}
    </div>
  );
};
