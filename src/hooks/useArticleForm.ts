import { skipToken } from '@reduxjs/toolkit/query';
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useGetArticleInfoQuery,
} from '../modules/articles/api';
import { message } from 'antd';
import { useMemo } from 'react';
import { IArticle } from '../modules/articles/article-interface';
import { articlesApi } from '../modules/articles/api';

type ArticleUpdate = Parameters<ReturnType<typeof articlesApi.endpoints.updateArticle.initiate>>[0];
type ArticleCreate = Parameters<ReturnType<typeof articlesApi.endpoints.createArticle.initiate>>[0];

interface IArticleUpdate {
  (updateData: ArticleUpdate): Promise<void>;
}

interface IArticleCreate {
  (createData: ArticleCreate): Promise<void>;
}

interface UseArticleFormReturn {
  article: IArticle;
  handleUpdateArticle: IArticleUpdate;
  handleCreateArticle: IArticleCreate;
}

export const useArticleForm = (slug: string): UseArticleFormReturn => {
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const { data } = useGetArticleInfoQuery(slug || skipToken);

  const article = useMemo(() => data?.article || {}, [data?.article]);

  const handleUpdateArticle: IArticleUpdate = async (updateData) => {
    await updateArticle(updateData).unwrap();
    message.success('Article updated successfully!');
  };

  const handleCreateArticle: IArticleCreate = async (createData) => {
    await createArticle(createData).unwrap();
    message.success('Article created successfully!');
  };

  return { article, handleUpdateArticle, handleCreateArticle };
};
