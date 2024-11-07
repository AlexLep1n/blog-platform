import classes from './ArticleInfo.module.css';
import { useGetArticleInfoQuery } from '../api';
import { useParams } from 'react-router-dom';
import Article from '../../../components/parts/Article/Article';
import { Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Markdown from 'markdown-to-jsx';
import { useSelector } from 'react-redux';
import { slugSelector } from '../articlesSlice';

export default function ArticleInfo() {
  const { slug } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetArticleInfoQuery(slug);
  const createdSlugs = useSelector(slugSelector);
  console.log('createdSlugs', createdSlugs);

  const article = data?.article || {};
  const { body } = article;

  const isMyArticle = createdSlugs.some((storeSlug) => storeSlug === slug);
  console.log('isMyArticle', isMyArticle);

  return (
    <>
      <div className={classes['article-info']}>
        {isError && (
          <Alert
            type="error"
            message="Error"
            description="Sorry, the article could not be uploaded. Please try again later."
            showIcon
          />
        )}
        {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />}
        {isSuccess && (
          <div className={classes['article-info__content']}>
            <div className={classes['article-info__article-box']}>
              <Article {...article} isMyArticle={isMyArticle} />
            </div>
            <div className={classes['article-info__body']}>
              <Markdown>{body}</Markdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
