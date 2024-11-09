import { useState } from 'react';

export const usePagination = (initialPage) => {
  const [page, setPage] = useState(initialPage);

  const changePage = (page) => {
    setPage(page);
    localStorage.setItem('page', `${page}`);
  };
  return [page, changePage];
};
