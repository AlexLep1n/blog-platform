import { format } from 'date-fns';
import classes from './Article.module.css';
import userIcon from './assets/user-icon.svg';
import { Rate } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default function Article({
  author: { username, image: imgUrl },
  title,
  description,
  createdAt,
  favoritesCount,
  tagList,
}) {
  const tagsWithIds = useMemo(() => tagList.map((tag) => ({ name: tag, id: nanoid() })), [tagList]);

  const [iserImage, setUserImage] = useState(imgUrl);
  const handleError = () => setUserImage(userIcon);

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
          src={iserImage}
          alt="user icon"
          onError={handleError}
        />
      </div>
    </div>
  );
}

Article.propTypes = {
  author: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  favoritesCount: PropTypes.number,
  tagList: PropTypes.array,
};
