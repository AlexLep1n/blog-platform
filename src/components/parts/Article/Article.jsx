import { format } from 'date-fns';
import classes from './Article.module.css';
import userIcon from '/article/user-icon.svg';
import { Rate } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTags } from '../../../hooks/useTags';

export default function Article({
  author: { username, image: imgUrl },
  slug,
  title,
  description,
  createdAt,
  favoritesCount,
  tagList,
}) {
  const tagsWithIds = useTags(tagList);

  const [userImage, setUserImage] = useState(imgUrl);
  const handleError = () => setUserImage(userIcon);

  return (
    <>
      <div className={classes.article__content}>
        <div className={classes['article__title-box']}>
          <Link to={`/articles/${slug}`} className={classes.article__title}>
            {title}
          </Link>
          <Rate
            className={classes.article__like}
            style={{ color: 'red' }}
            character={<HeartFilled />}
            count={1}
            disabled
          />
          <span className={classes['article__like-count']}>{favoritesCount}</span>
        </div>
        <div className={classes.article__tags}>
          {tagsWithIds.map((tag) => (
            <p key={tag.id} className={classes.article__tag}>
              {tag.name}
            </p>
          ))}
        </div>
        <p className={classes.article__description}>{description}</p>
      </div>
      <div className={classes.article__user}>
        <div className={classes['article__user-info']}>
          <p className={classes['article__user-name']}>{username}</p>
          <p className={classes['article__post-time']}>
            {format(new Date(createdAt), 'MMMM d, yyyy')}
          </p>
        </div>
        <img
          className={classes['article__user-icon']}
          src={userImage}
          alt="user icon"
          onError={handleError}
        />
      </div>
    </>
  );
}

Article.propTypes = {
  author: PropTypes.object,
  slug: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  favoritesCount: PropTypes.number,
  tagList: PropTypes.array,
};