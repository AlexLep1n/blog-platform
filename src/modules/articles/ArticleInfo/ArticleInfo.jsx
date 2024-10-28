/* eslint-disable no-unused-vars */
import Markdown from 'react-markdown';
import { useGetArticleInfoQuery } from '../api';
import { useParams } from 'react-router-dom';

export default function ArticleInfo() {
  const { slug } = useParams();
  const { data, isLoading, isSuccess } = useGetArticleInfoQuery(slug);

  const article = data?.article;
  if (!article) {
    return;
  }
  const {
    author: { username, image: imgUrl },
    title,
    description,
    body,
    createdAt,
    favoritesCount,
    tagList,
  } = article;

  return <>{isSuccess && <h1>{body}</h1>}</>;
}
