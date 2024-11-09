import classes from './ArticleInfo.module.css';
import { useGetArticleInfoQuery } from '../api';
import { useParams } from 'react-router-dom';
import Article from '../Article/Article';
import { Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Markdown from 'markdown-to-jsx';
import { useGetCurrentUserQuery } from '../../profile/api';
import { skipToken } from '@reduxjs/toolkit/query';

export default function ArticleInfo() {
  const { slug } = useParams();
  const apiToken = localStorage.getItem('token');

  const { data: artcileData, isLoading, isError } = useGetArticleInfoQuery(slug);
  const { data: currentUserData } = useGetCurrentUserQuery(apiToken || skipToken);

  const article = artcileData?.article || {};
  const user = currentUserData?.user;
  const isMyArticle = article.author?.username === user?.username;

  if (isError) {
    return (
      <div className={classes['article-info']}>
        <Alert
          type="error"
          message="Error"
          description="Sorry, the article could not be uploaded. Please try again later."
          showIcon
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={classes['article-info']}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  return (
    <div className={classes['article-info']}>
      <div className={classes['article-info__content']}>
        <div className={classes['article-info__article-box']}>
          <Article {...article} isMyArticle={isMyArticle} />
        </div>
        <div className={classes['article-info__body']}>
          <Markdown>{article.body}</Markdown>
        </div>
      </div>
    </div>
  );
}
