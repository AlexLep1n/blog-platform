import { Link } from 'react-router-dom';
import classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={`${classes.header__content} container`}>
        <Link to={'/'} className={classes.header__title}>
          Realworld Blog
        </Link>
        <div className={classes.header__links}>
          <Link to={'/sign-in'} className={classes['header__link']}>
            Sign In
          </Link>
          <Link
            to={'/sign-up'}
            className={`${classes['header__link']} ${classes['header__link_green']}`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
