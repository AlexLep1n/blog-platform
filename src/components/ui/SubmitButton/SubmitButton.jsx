import PropTypes from 'prop-types';
import classes from './SubmitButton.module.css';

export default function SubmitButton({ children, btnClass, ...props }) {
  return (
    <button type="submit" className={`${classes.button} ${btnClass}`} {...props}>
      {children}
    </button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
};
