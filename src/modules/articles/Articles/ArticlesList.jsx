/* eslint-disable no-unused-vars */
import classes from './Articles.module.css';
import Article from '../Article/Article';
import { useGetArticlesQuery } from '../api';
import { nanoid } from 'nanoid';
import { useState, useMemo } from 'react';
import { Pagination } from 'antd';

export default function Articles() {
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  console.log(page, skip);
  const { data, isLoading, isSuccess, isError } = useGetArticlesQuery(page, skip);

  const articles = useMemo(() => data?.articles || [], [data]);
  const articlesCount = useMemo(() => data?.articlesCount || 5, [data]);

  const articlesWithIds = useMemo(
    () => articles.map((article) => ({ ...article, id: nanoid() })),
    [articles]
  );

  return (
    <section className={classes.users}>
      {isLoading && <h1>Loading...</h1>}
      {isSuccess && articlesWithIds.map((article) => <Article key={article.id} {...article} />)}
      <Pagination
        current={page}
        pageSize={5}
        total={articlesCount}
        onChange={(page) => {
          if (page === 1) {
            setSkip(0);
          }
          setSkip(page - 1);
          setPage(page);
        }}
        showSizeChanger={false}
      />
    </section>
  );
}
