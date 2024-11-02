import PropTypes from 'prop-types';
import classes from './FormField.module.css';
import { useController } from 'react-hook-form';

export default function FormField({ control, name, children, rules }) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { error },
  } = useController({ control, name, rules });

  return (
    <div>
      <label className={classes.label}>
        {children}
        <input
          className={error ? `${classes.input} ${classes['input_error']}` : classes.input}
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          value={value || ''} // Значение всегда должно быть определено
          ref={ref}
        />
      </label>
      {error && <p className={classes.error}>{error.message}</p>}
    </div>
  );
}

FormField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  rules: PropTypes.object,
  errors: PropTypes.object,
};
