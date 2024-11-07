import { baseApi } from '../../shared/api';

const token = localStorage.getItem('token');

export const articleFormApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
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
  }),
});

export const { useCreateArticleMutation } = articleFormApi;
