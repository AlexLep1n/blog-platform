import React from 'react';
import ColorButton from '../../ui/ColorButton/ColorButton';
import classes from './Tag.module.css';

interface Props {
  tagValue: string;
  deleteTag: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Tag({ tagValue, deleteTag }: Props) {
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
