/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import classes from './Article.module.css';
// import heart from './assets/heart.svg';
// import userIcon from './assets/user-icon.svg';
import { Rate } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useMemo } from 'react';
import { nanoid } from 'nanoid';

export default function Article({
  author: { username, image: imgUrl },
  title,
  description,
  createdAt,
  favoritesCount,
  tagList = [],
}) {
  const tagsWithIds = useMemo(() => tagList.map((tag) => ({ name: tag, id: nanoid() })), [tagList]);

  return (
    <div className={classes.article}>
      <div className={classes.article__content}>
        <div className={classes['article__title-box']}>
          <h3 className={classes.article__title}>{title}</h3>
          <Rate
            className={classes.article__like}
            style={{ color: 'red' }}
            character={<HeartFilled />}
            count={1}
            disabled
          />
          {/* <img className={classes.article__like} src={heart} alt="heart icon" /> */}
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
        <img className={classes['article__user-icon']} src={imgUrl} alt="user icon" />
      </div>
    </div>
  );
}
