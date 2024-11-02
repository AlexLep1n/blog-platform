import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';
import Header from '../components/blocks/Header/Header';
import ArticlesPage from '../pages/ArticlesPage';
import { articlesApi } from '../modules/articles/api';
import { store } from './store';
import ArticleInfo from '../modules/articles/ArticleInfo/ArticleInfo';
import { baseApi } from '../shared/api';
import SignIn from '../modules/auth/SignIn/SignIn';
import SignUp from '../modules/auth/SignUp/SignUp';

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
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
]);
