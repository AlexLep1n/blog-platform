import classes from './Articles.module.css';
import Article from '../Article/Article';
import { useGetArticlesQuery } from '../api';
import { nanoid } from 'nanoid';
import { useState, useMemo } from 'react';
import { Alert, ConfigProvider, Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Articles() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isSuccess, isError } = useGetArticlesQuery(page - 1);

  const articles = useMemo(() => data?.articles ?? [], [data]);
  const articlesCount = data?.articlesCount;

  const articlesWithIds = useMemo(
    () => articles.map((article) => ({ ...article, id: nanoid() })),
    [articles]
  );

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
      {isSuccess && articlesWithIds.map((article) => <Article key={article.id} {...article} />)}
      {isSuccess && (
        <ConfigProvider
          theme={{
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
          }}
        >
          <Pagination
            current={page}
            pageSize={5}
            total={articlesCount}
            onChange={(page) => setPage(page)}
            showSizeChanger={false}
          />
        </ConfigProvider>
      )}
    </section>
  );
}
