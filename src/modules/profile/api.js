import { baseApi } from '../../shared/api';

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const profileApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getCurrentUser: create.query({
      query: (token) => ({
        url: '/user',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
        body: { user: { ...updateUserData, bio: 'Learn RTK Query' } },
      }),
      invalidatesTags: ['Edit'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation } = profileApi;
