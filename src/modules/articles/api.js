import { baseApi } from '../../shared/api';

const token = localStorage.getItem('token');

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getArticles: create.query({
      query: (skipCount) => `/articles?limit=${5}&offset=${skipCount * 5}`,
      providesTags: ['Articles'],
    }),
    getArticleInfo: create.query({
      query: (slug) => `/articles/${slug}`,
      providesTags: ['Articles'],
    }),
    createArticle: create.mutation({
      query: (articleData) => ({
        url: '/articles',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          article: {
            ...articleData,
          },
        },
      }),
      invalidatesTags: ['Articles'],
    }),
    deleteArticle: create.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Articles'],
    }),
    updateArticle: create.mutation({
      query: ({ slug, articleData }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          article: {
            ...articleData,
          },
        },
      }),
      invalidatesTags: ['Articles'],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetArticlesQuery,
  useGetArticleInfoQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
} = articlesApi;
