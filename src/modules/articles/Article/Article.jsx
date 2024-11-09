import { format } from 'date-fns';
import classes from './Article.module.css';
import userIcon from '/img/user-icon.svg';
import { Rate } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTags } from '../../../hooks/useTags';
import ColorButton from '../../../components/ui/ColorButton/ColorButton';
import { useRef, useState } from 'react';
import { HeartFilled } from '@ant-design/icons';
import CustomModal from '../../../components/ui/CustomModal/CustomModal';

export default function Article({
  author: { username, image: imgUrl },
  slug,
  title,
  description,
  createdAt,
  favoritesCount,
  tagList,
  isMyArticle,
}) {
  const tagsWithIds = useTags(tagList);
  console.log(isMyArticle);

  const [open, setOpen] = useState(false);
  const deleteButtonRef = useRef(null);
  const showModal = () => setOpen(true);

  const yesHandler = () => {
    setOpen(false);
    // логика удаления статьи
  };
  const noHandler = () => setOpen(false);

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
          <img className={classes['article__user-icon']} src={imgUrl ?? userIcon} alt="user icon" />
        </div>
        {isMyArticle && (
          <div className={classes.article__btns}>
            <ColorButton
              onClick={showModal}
              color="red"
              btnClass={`${classes['article__btn']} ${classes['article__btn-delete']}`}
              ref={deleteButtonRef}
            >
              Delete
            </ColorButton>
            {open && <CustomModal onCancel={noHandler} onYes={yesHandler} />}
            <ColorButton
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
  tagList: PropTypes.array,
  isMyArticle: PropTypes.bool,
};
