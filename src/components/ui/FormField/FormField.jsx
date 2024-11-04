import PropTypes from 'prop-types';
import classes from './FormField.module.css';
import { useController } from 'react-hook-form';

export default function FormField({
  control,
  name,
  children,
  rules,
  signUpErrors = '',
  signInErrors = '',
  editError = '',
  type = 'text',
  ...props
}) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { error },
  } = useController({ control, name, rules });

  console.log(editError[name]);

  return (
    <div>
      <label className={classes.label}>
        {children}
        <input
          className={
            error || signUpErrors[name] || editError[name]
              ? `${classes.input} ${classes['input_error']}`
              : classes.input
          }
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value || ''} // Значение всегда должно быть определено
          ref={ref}
          {...props}
        />
      </label>
      {error && <p className={classes.error}>{error.message}</p>}
      {signUpErrors[name] && (
        <p className={classes.error}>
          {signUpErrors[name][0].toUpperCase() + signUpErrors[name].slice(1)}
        </p>
      )}
      {signInErrors && <p className={classes.error}>{`Email or password ${signInErrors}`}</p>}
      {editError[name] && (
        <p className={classes.error}>
          {editError[name][0].toUpperCase() + editError[name].slice(1)}
        </p>
      )}
    </div>
  );
}

FormField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  errors: PropTypes.object,
  signUpErrors: PropTypes.object,
  signInErrors: PropTypes.string,
  editError: PropTypes.object,
  type: PropTypes.string,
};
