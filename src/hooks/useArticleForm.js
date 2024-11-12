import { skipToken } from '@reduxjs/toolkit/query';
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useGetArticleInfoQuery,
} from '../modules/articles/api';
import { message } from 'antd';
import { useMemo } from 'react';

export const useArticleForm = (slug) => {
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const { data } = useGetArticleInfoQuery(slug || skipToken);

  const article = useMemo(() => data?.article || {}, [data?.article]);

  const handleUpdateArticle = async (slug, articleData) => {
    await updateArticle({ slug, articleData: articleData }).unwrap();
    message.success('Article updated successfully!');
  };

  const handleCreateArticle = async (articleData) => {
    await createArticle(articleData).unwrap();
    message.success('Article created successfully!');
  };

  return { article, handleUpdateArticle, handleCreateArticle };
};
