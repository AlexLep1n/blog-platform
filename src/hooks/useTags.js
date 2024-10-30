import { useMemo } from 'react';
import { nanoid } from 'nanoid';

export const useTags = (tagList) => {
  const tagsWithIds = useMemo(() => tagList.map((tag) => ({ name: tag, id: nanoid() })), [tagList]);
  return tagsWithIds;
};
