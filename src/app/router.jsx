import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';
import Header from '../components/blocks/Header/Header';
import ArticlesPage from '../pages/ArticlesPage';
import { articlesApi } from '../modules/articles/api';
import { store } from './store';
import ArticleInfo from '../modules/articles/ArticleInfo/ArticleInfo';
import { baseApi } from '../shared/api';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        loader: () => redirect('/articles'),
      },
      {
        path: 'articles',
        element: <ArticlesPage />,
        loader: ({ params }) => {
          store.dispatch(articlesApi.util.prefetch('getArticles', params.skipCount || 0, {}));
          return null;
        },
      },
      {
        path: 'articles/:slug',
        element: <ArticleInfo />,
        loader: ({ params }) => {
          store.dispatch(baseApi.util.prefetch('getArticleInfo', params.slug, {}));
          return null;
        },
      },
    ],
  },
]);
