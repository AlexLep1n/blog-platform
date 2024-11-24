import { useState } from 'react';

interface IChangePage {
  (page: number): void;
}

interface IUsePagination {
  (initialPage: number): [number, IChangePage];
}

export const usePagination: IUsePagination = (initialPage) => {
  const [page, setPage] = useState(initialPage);

  const changePage: IChangePage = (page) => {
    setPage(page);
    localStorage.setItem('page', `${page}`);
  };
  return [page, changePage];
};
