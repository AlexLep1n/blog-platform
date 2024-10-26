import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from '../components/blocks/Header/Header';
import ArticlesPage from '../pages/ArticlesPage';

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
        path: 'articles',
        element: <ArticlesPage />,
      },
    ],
  },
]);
