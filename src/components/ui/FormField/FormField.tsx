import PropTypes from 'prop-types';
import classes from './FormField.module.css';
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  children: string;
  rules: RegisterOptions<T>;
  serverError?: Record<string, string>;
  signInError?: string;
  type?: string;
  clearError?: () => void;
  textArea?: boolean;
  placeholder?: string;
  [key: string]: unknown;
}

export default function FormField<T extends FieldValues>({
  control,
  name,
  children,
  rules,
  serverError = {},
  signInError,
  type = 'text',
  clearError,
  textArea = false,
  ...props
}: FormFieldProps<T>) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { error },
  } = useController({ control, name, rules });

  return (
    <div>
      <label className={classes.label}>
        {children}
        {!textArea && (
          <input
            className={
              error || serverError[name]
                ? `${classes.input} ${classes['input_error']}`
                : classes.input
            }
            type={type}
            onChange={(e) => {
              onChange(e);
              if (clearError) {
                clearError();
              }
            }}
            onBlur={onBlur}
            value={value || ''} // Значение всегда должно быть определено
            ref={ref}
            {...props}
          />
        )}
        {textArea && (
          <textarea
            className={
              error || serverError[name]
                ? `${classes['text-area']} ${classes['text-area_error']}`
                : classes['text-area']
            }
            onChange={(e) => {
              onChange(e);
              if (clearError) {
                clearError();
              }
            }}
            onBlur={onBlur}
            value={value || ''} // Значение всегда должно быть определено
            ref={ref}
            {...props}
          ></textarea>
        )}
      </label>
      {error && <p className={classes.error}>{error.message}</p>}
      {serverError[name] && (
        <p className={classes.error}>
          {serverError[name][0].toUpperCase() + serverError[name].slice(1)}
        </p>
      )}
      {signInError && <p className={classes.error}>{`Email or password ${signInError}`}</p>}
    </div>
  );
}

FormField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  errors: PropTypes.object,
  serverError: PropTypes.object,
  signInError: PropTypes.string,
  editError: PropTypes.object,
  type: PropTypes.string,
  clearError: PropTypes.func,
  textArea: PropTypes.bool,
};