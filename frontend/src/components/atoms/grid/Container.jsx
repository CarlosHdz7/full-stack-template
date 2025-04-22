export const Container = ({ children, fluid = false, className = '', ...props }) => {
  const classes = [fluid ? 'container-fluid' : 'container'];

  if (className) classes.push(className);

  return (
    <div className={classes.join(' ')} {...props}>
      {children}
    </div>
  );
};
