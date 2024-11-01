import PropTypes from 'prop-types';
import classes from './ColorButton.module.css';

export default function ColorButton({ children, color, btnClass, ...props }) {
  return (
    <button className={`${btnClass} ${color === 'green' ? classes.green : classes.red}`} {...props}>
      {children}
    </button>
  );
}

ColorButton.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.node.isRequired,
  btnClass: PropTypes.string.isRequired,
};
