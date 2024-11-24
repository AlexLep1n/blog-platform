import { useState } from 'react';
import classes from './Tags.module.css';
import ColorButton from '../../ui/ColorButton/ColorButton';
import { nanoid } from 'nanoid';
import Tag from '../Tag/Tag';
import { Control, FieldArrayPath, FieldValues, useFieldArray } from 'react-hook-form';

interface Tag {
  id: string;
  value: string;
}

interface TagsProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldArrayPath<T>;
}

type DeleteTag = {
  (e: React.MouseEvent<HTMLButtonElement>, i: number): void;
};

export default function Tags<T extends FieldValues>({ control, name }: TagsProps<T>) {
  const [tagValue, setTagValue] = useState('');

  const { fields, append, remove } = useFieldArray<T, FieldArrayPath<T>, 'id'>({
    control,
    name,
  });

  const addNewTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (tagValue.trim() !== '') {
      append({ id: nanoid(), value: tagValue } as unknown as T[FieldArrayPath<T>]);
      setTagValue('');
    }
  };

  const deleteTag: DeleteTag = (e, i) => {
    e.preventDefault();
    remove(i);
  };

  return (
    <div className={classes.tags}>
      <div className={classes.tags__box}>
        <p className={classes.tags__title}>Tags</p>
        {fields.map((field, index) => {
          const tagField = field as T[FieldArrayPath<T>] & { id: string; value: string };
          return (
            <Tag
              key={tagField.id}
              tagValue={tagField.value}
              deleteTag={(e) => deleteTag(e, index)}
            />
          );
        })}
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
