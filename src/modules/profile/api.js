import { baseApi } from '../../shared/api';

const apiToken = JSON.parse(localStorage.getItem('user')).token || '';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getCurrentUser: create.query({
      query: () => ({
        url: '/user',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetCurrentUserQuery } = profileApi;
