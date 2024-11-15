import { format } from 'date-fns';
import classes from './Article.module.css';
import userIcon from '/img/user-icon.svg';
import { Popconfirm, Rate } from 'antd';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useTags } from '../../../hooks/useTags';
import ColorButton from '../../../components/ui/ColorButton/ColorButton';
import { HeartFilled } from '@ant-design/icons';
import {
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from '../api';
import { useState } from 'react';

export default function Article({
  author: { username, image: imgUrl },
  slug,
  title,
  description,
  createdAt,
  favoritesCount: initialFavoritesCount,
  favorited,
  tagList,
  isMyArticle,
}) {
  const tagsWithIds = useTags(tagList);

  const [deleteArticle] = useDeleteArticleMutation();
  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();
  const navigate = useNavigate();

  const yesHandler = () => {
    try {
      deleteArticle(slug).unwrap();
      navigate('/articles');
    } catch (error) {
      console.log('Ошибка удаления статьи: ', error);
    }
  };

  const editHandler = () => navigate(`/articles/${slug}/edit`);
  const token = localStorage.getItem('token');
  const [liked, setLiked] = useState(favorited);
  const [favoritesCount, setFavoritesCount] = useState(initialFavoritesCount);
  const [userImage, setUserImage] = useState(imgUrl);

  const handleLikeToggle = async () => {
    try {
      let updatedArticle;
      if (!liked) {
        updatedArticle = await favoriteArticle(slug).unwrap();
      } else {
        updatedArticle = await unfavoriteArticle(slug).unwrap();
      }
      setFavoritesCount(updatedArticle.article.favoritesCount);
      setLiked(updatedArticle.article.favorited);
    } catch (error) {
      console.log('Ошибка при попытке лайка/дизлайка', error);
    }
  };

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
            value={liked ? 1 : 0}
            count={1}
            disabled={!token}
            allowClear={true}
            onChange={handleLikeToggle}
          />
          <span className={classes['article__like-count']}>{favoritesCount}</span>
        </div>
        <div className={classes.article__tags}>
          {tagsWithIds &&
            tagsWithIds.map((tag) => (
              <p key={tag.id} className={classes.article__tag}>
                {tag.name}
              </p>
            ))}
        </div>
        <p className={classes.article__description}>{description}</p>
      </div>
      <div className={classes['article__user-and-btns']}>
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
            onError={() => setUserImage(userIcon)}
            alt="user icon"
          />
        </div>
        {isMyArticle && (
          <div className={classes.article__btns}>
            <Popconfirm
              title="Are you sure to delete this article?"
              okText="Yes"
              cancelText="No"
              onConfirm={yesHandler}
              placement="rightTop"
            >
              <ColorButton
                color="red"
                btnClass={`${classes['article__btn']} ${classes['article__btn-delete']}`}
              >
                Delete
              </ColorButton>
            </Popconfirm>
            <ColorButton
              onClick={editHandler}
              color="green"
              btnClass={`${classes['article__btn']} ${classes['article__btn-edit']}`}
            >
              Edit
            </ColorButton>
          </div>
        )}
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
  favorited: PropTypes.bool,
  tagList: PropTypes.array,
  isMyArticle: PropTypes.bool,
};
