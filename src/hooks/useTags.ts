import { useMemo } from 'react';
import { nanoid } from 'nanoid';

type Tag = { name: string; id: string };

interface IUseTags {
  (tagList: string[]): Tag[];
}

export const useTags: IUseTags = (tagList) => {
  const tagsWithIds = useMemo(
    () =>
      (tagList || [])
        ?.map((tag) => (tag.trim() !== '' ? { name: tag, id: nanoid() } : null))
        .filter((tag): tag is Tag => Boolean(tag)),
    [tagList]
  );
  return tagsWithIds;
};
