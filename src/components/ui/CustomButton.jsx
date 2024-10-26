import PropTypes from 'prop-types';
import classes from './CustomButton.module.css';

export default function CustomButton({ children, color, btnClass }) {
  return (
    <button className={`${btnClass} ${color === 'green' ? classes.green : classes.red}`}>
      {children}
    </button>
  );
}

CustomButton.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.node.isRequired,
  btnClass: PropTypes.string.isRequired,
};
