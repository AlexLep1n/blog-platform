import { baseApi } from '../../shared/api';

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getArticles: create.query({
      query: (skipCount) => `/articles?limit=${5}&offset=${skipCount * 5}`,
      providesTags: ['Articles'],
    }),
    getArticleInfo: create.query({
      query: (slug) => `/articles/${slug}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetArticlesQuery, useGetArticleInfoQuery } = articlesApi;
