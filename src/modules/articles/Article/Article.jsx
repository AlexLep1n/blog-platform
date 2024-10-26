import classes from './Article.module.css';
import heart from './assets/heart.svg';
import userIcon from './assets/user-icon.svg';

export default function Article() {
  return (
    <div className={classes.article}>
      <div className={classes.article__content}>
        <div className={classes['article__title-box']}>
          <h3 className={classes.article__title}>Some article title</h3>
          <img className={classes.article__like} src={heart} alt="heart icon" />
          <span className={classes['article__like-count']}>12</span>
        </div>
        <div className={classes.article__tags}>
          <p className={classes.article__tag}>Tag1</p>
        </div>
        <p className={classes.article__description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className={classes.article__user}>
        <div className={classes['article__user-info']}>
          <p className={classes['article__user-name']}>John Doe</p>
          <p className={classes['article__post-time']}>March 5, 2020 </p>
        </div>
        <img className={classes['article__user-icon']} src={userIcon} alt="user icon" />
      </div>
    </div>
  );
}
