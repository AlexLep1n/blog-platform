import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';
import ArticlesPage from '../pages/ArticlesPage';
import { articlesApi } from '../modules/articles/api';
import { store } from './store';
import ArticleInfo from '../modules/articles/ArticleInfo/ArticleInfo';
import SignIn from '../modules/auth/SignIn/SignIn';
import SignUp from '../modules/auth/SignUp/SignUp';
import Header from '../components/blocks/Header/Header';
import EditProfile from '../modules/profile/EditProfile';
import ArticleCreate from '../modules/articles/ArticleCreate/ArticleCreate';
import ArticleEdit from '../modules/articles/ArticleEdit/ArticleEdit';

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
        loader: async ({ params }) => {
          await store.dispatch(articlesApi.util.prefetch('getArticles', params.skipCount || 0, {}));
          return null;
        },
      },
      {
        path: 'articles/:slug',
        element: <ArticleInfo />,
        loader: async ({ params }) => {
          await store.dispatch(articlesApi.util.prefetch('getArticleInfo', params.slug, {}));
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
      {
        path: 'profile',
        element: <EditProfile />,
      },
      {
        path: '/new-article',
        element: <ArticleCreate />,
        loader: () => {
          const token = localStorage.getItem('token');
          return !token ? redirect('/sign-in') : null;
        },
      },
      {
        path: '/articles/:slug/edit',
        element: <ArticleEdit />,
      },
    ],
  },
]);
