import { baseApi } from '../../shared/api';

// const token = localStorage.getItem('token');

export const profileApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getCurrentUser: create.query({
      query: () => '/user',
      providesTags: ['Edit'],
    }),
    updateCurrentUser: create.mutation({
      query: (updateUserData) => ({
        url: '/user',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { user: { ...updateUserData, bio: 'Learn RTK Query' } },
      }),
      invalidatesTags: ['Edit', { type: 'Articles', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation } = profileApi;
