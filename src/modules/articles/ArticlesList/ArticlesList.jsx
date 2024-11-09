import classes from './ArticlesList.module.css';
import Article from '../Article/Article';
import { useGetArticlesQuery } from '../api';
import { nanoid } from 'nanoid';
import { useState, useMemo, useEffect } from 'react';
import { Alert, ConfigProvider, Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { usePagination } from '../../../hooks/usePagination';

export default function ArticlesList() {
  const [page, changePage] = usePagination(1);
  const { data, isLoading, isSuccess, isError } = useGetArticlesQuery(page - 1);
  const [articlesWithIds, setArticlesWithIds] = useState([]);

  const articles = useMemo(() => data?.articles ?? [], [data?.articles]);
  const articlesCount = data?.articlesCount || 0;

  useEffect(() => {
    if (articles) {
      setArticlesWithIds(articles.map((article) => ({ ...article, id: nanoid() })));
    }
  }, [articles]);

  const paginationTheme = {
    components: {
      Pagination: {
        itemActiveBg: '#1890ff',
        itemBg: '#ebeef3',
        colorPrimary: '#fff',
        colorPrimaryHover: '#fff',
        colorLinkHover: 'rgba(0, 0, 0, 0.75)',
        colorBgTextHover: '#1890ff',
        colorText: 'rgba(0, 0, 0, 0.75)',
      },
    },
  };

  return (
    <section className={classes.users}>
      {isError && (
        <Alert
          type="error"
          message="Error"
          description="Sorry, the articles could not be uploaded. Please try again later."
          showIcon
        />
      )}
      {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />}
      {isSuccess &&
        articlesWithIds.map((article) => (
          <div key={article.id} className={classes.article}>
            <Article {...article} />
          </div>
        ))}
      {isSuccess && articlesCount && (
        <ConfigProvider theme={paginationTheme}>
          <Pagination
            current={page}
            pageSize={5}
            total={articlesCount}
            onChange={changePage}
            showSizeChanger={false}
          />
        </ConfigProvider>
      )}
    </section>
  );
}
