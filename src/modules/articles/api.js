import { baseApi } from '../../shared/api';

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getArticles: create.query({
      query: () => '/articles?limit=5',
    }),
    getArticle: create.query({
      query: (slug) => `/articles/${slug}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetArticlesQuery, useGetArticleQuery } = articlesApi;
