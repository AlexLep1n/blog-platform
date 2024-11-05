import { baseApi } from '../../shared/api';

const apiToken = localStorage.getItem('token');

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
      providesTags: ['Edit'],
    }),
    updateCurrentUser: create.mutation({
      query: (updateUserData) => ({
        url: '/user',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
        body: { user: { ...updateUserData, bio: 'Learn RTK Query' } },
      }),
      invalidatesTags: ['Edit'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation } = profileApi;
