import { baseApi } from '../../shared/api';

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getArticles: create.query({
      query: (skipCount) => ({
        url: `/articles?limit=${5}&offset=${skipCount * 5}`,
        headers: { Authorization: undefined },
      }),
      providesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    getArticleInfo: create.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'GET',
        headers: { Authorization: undefined },
      }),
      providesTags: (_, __, slug) => [
        { type: 'Articles', id: 'LIST' },
        { type: 'Articles', id: slug },
      ],
    }),
    createArticle: create.mutation({
      query: (articleData) => ({
        url: '/articles',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          article: {
            ...articleData,
          },
        },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    deleteArticle: create.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    updateArticle: create.mutation({
      query: ({ slug, articleData }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          article: {
            ...articleData,
          },
        },
      }),
      invalidatesTags: (_, __, slug) => [
        { type: 'Articles', id: 'LIST' },
        { type: 'Articles', id: slug },
      ],
    }),
    favoriteArticle: create.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: (_, __, slug) => [{ type: 'Articles', id: slug }],
    }),
    unfavoriteArticle: create.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      invalidatesTags: (_, __, slug) => [{ type: 'Articles', id: slug }],
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
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} = articlesApi;
