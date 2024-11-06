import { useState } from 'react';
import classes from './Tags.module.css';
import ColorButton from '../../ui/ColorButton/ColorButton';
import { nanoid } from 'nanoid';
import Tag from '../Tag/Tag';

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState('');

  const addNewTag = (e) => {
    e.preventDefault();
    setTags([...tags, { id: nanoid(), value: tagValue }]);
    setTagValue('');
  };

  const deleteTag = (e, removeId) => {
    e.preventDefault();
    setTags(tags.filter((tag) => tag.id !== removeId));
  };

  return (
    <div className={classes.tags}>
      <div className={classes.tags__box}>
        <p className={classes.tags__title}>Tags</p>
        {tags.map((tag) => (
          <Tag key={tag.id} tagValue={tag.value} deleteTag={(e) => deleteTag(e, tag.id)} />
        ))}
        <div className={classes.tags__new}>
          <input
            onChange={(e) => setTagValue(e.target.value)}
            className={classes.tags__input}
            type="text"
            placeholder="Tag"
            value={tagValue}
          />
          <ColorButton onClick={(e) => addNewTag(e)} color="blue" btnClass={classes.tags__add}>
            Add tag
          </ColorButton>
        </div>
      </div>
    </div>
  );
}
