import PropTypes from 'prop-types';
import classes from './FormField.module.css';
import { Controller } from 'react-hook-form';

export default function FormField({ control, name, children, rules, errors }) {
  return (
    <div>
      <label className={classes.label}>
        {children}
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              className={
                errors[name] ? `${classes.input} ${classes['input_error']}` : classes.input
              }
              type="text"
              onChange={onChange}
              onBlur={onBlur}
              value={value || ''} // Убедитесь, что значение всегда определено
              ref={ref}
            />
          )}
        />
      </label>
      {errors[name] && <p className={classes.error}>{errors[name].message}</p>}
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
