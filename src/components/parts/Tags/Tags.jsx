import { useState } from 'react';
import classes from './Tags.module.css';
import ColorButton from '../../ui/ColorButton/ColorButton';
import { nanoid } from 'nanoid';
import Tag from '../Tag/Tag';
import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';

export default function Tags({ control, name }) {
  const [tagValue, setTagValue] = useState('');

  const { fields, append, remove } = useFieldArray({ control, name });

  const addNewTag = (e) => {
    e.preventDefault();
    if (tagValue.trim() !== '') {
      append({ id: nanoid(), value: tagValue });
      setTagValue('');
    }
  };

  const deleteTag = (e, i) => {
    e.preventDefault();
    remove(i);
  };

  return (
    <div className={classes.tags}>
      <div className={classes.tags__box}>
        <p className={classes.tags__title}>Tags</p>
        {fields.map((field, index) => (
          <Tag key={field.id} tagValue={field.value} deleteTag={(e) => deleteTag(e, index)} />
        ))}
        <div className={classes.tags__new}>
          <input
            onChange={(e) => setTagValue(e.target.value)}
            className={classes.tags__input}
            type="text"
            placeholder="Tag"
            value={tagValue}
          />
          <ColorButton onClick={addNewTag} color="blue" btnClass={classes.tags__add}>
            Add tag
          </ColorButton>
        </div>
      </div>
    </div>
  );
}

Tags.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
