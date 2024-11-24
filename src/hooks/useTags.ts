import { useMemo } from 'react';
import { nanoid } from 'nanoid';

export const useTags = (tagList) => {
  const tagsWithIds = useMemo(
    () =>
      tagList
        ?.map((tag) => (tag.trim() !== '' ? { name: tag, id: nanoid() } : null))
        .filter(Boolean),
    [tagList]
  );
  return tagsWithIds;
};
