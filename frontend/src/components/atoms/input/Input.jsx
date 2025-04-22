import styles from './Input.module.css';

const Input = ({
  id,
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  success = false,
  helperText,
  prefixIcon,
  suffixIcon,
  className,
  ...props
}) => {
  const inputClasses = [
    styles.input,
    error ? styles.inputError : '',
    success ? styles.inputSuccess : '',
    prefixIcon ? styles.withPrefixIcon : '',
    suffixIcon ? styles.withSuffixIcon : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span style={{ color: 'var(--color-error)' }}> *</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {prefixIcon && <span className={styles.prefixIcon}>{prefixIcon}</span>}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
        {suffixIcon && <span className={styles.suffixIcon}>{suffixIcon}</span>}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {!error && helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

export default Input;
