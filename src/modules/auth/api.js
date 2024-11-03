import { baseApi } from '../../shared/api';

// const apiToken = localStorage.getItem('token') || '';

export const authApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    signUpUser: create.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          user: {
            username: userData.username,
            email: userData.email,
            password: userData.password,
          },
        },
      }),
    }),
    signInUser: create.mutation({
      query: (loginUserData) => ({
        url: '/users/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          user: {
            email: loginUserData.email,
            password: loginUserData.password,
          },
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useSignUpUserMutation, useSignInUserMutation } = authApi;
