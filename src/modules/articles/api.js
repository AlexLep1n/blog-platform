import { baseApi } from '../../shared/api';

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getArticles: create.query({
      query: (page, skip) => `/articles?limit=${page * 5}&offset=${skip * 5}`,
    }),
    getArticle: create.query({
      query: (slug) => `/articles/${slug}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetArticlesQuery, useGetArticleQuery } = articlesApi;
