import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../shared/api';
import articlesReducer from '../modules/articles/articlesSlice';
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});
