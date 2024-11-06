import ColorButton from '../../ui/ColorButton/ColorButton';
import classes from './Tag.module.css';
import PropTypes from 'prop-types';

export default function Tag({ tagValue, deleteTag }) {
  return (
    <div className={classes.tag}>
      <input
        disabled
        className={classes.tag__input}
        type="text"
        placeholder="Tag"
        value={tagValue}
      />
      <ColorButton onClick={deleteTag} color="red" btnClass={classes.tag__delete}>
        Delete
      </ColorButton>
    </div>
  );
}

Tag.propTypes = {
  tagValue: PropTypes.string.isRequired,
  deleteTag: PropTypes.func.isRequired,
};
