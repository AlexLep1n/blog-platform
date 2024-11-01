import PropTypes from 'prop-types';
import classes from './SubmitButton.module.css';

export default function SubmitButton({ children, ...props }) {
  return (
    <button type="submit" className={classes.button} {...props}>
      {children}
    </button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
};
