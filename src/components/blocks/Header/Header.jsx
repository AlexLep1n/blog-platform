import { Link, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import userIcon from '/img/user-icon.svg';
import ColorButton from '../../ui/ColorButton/ColorButton';
import { useGetCurrentUserQuery } from '../../../modules/profile/api';

export default function Header() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const { data: { user } = {}, isSuccess } = useGetCurrentUserQuery();

  return (
    <header className={classes.header}>
      <div className={`${classes.header__content} container`}>
        <Link to={'/'} className={classes.header__title}>
          Realworld Blog
        </Link>
        {!token && (
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
        )}
        {token && user && isSuccess && (
          <div className={`${classes.header__links} ${classes.header__links_gap}`}>
            <Link
              to={'/new-article'}
              className={`${classes['header__link']} ${classes['header__link_padding']} ${classes['header__link_green']}`}
            >
              Create article
            </Link>
            <Link to={'/profile'} className={classes.header__profile}>
              <p>{user.username}</p>
              <img
                src={user.image ?? userIcon}
                alt="profile image"
                className={classes.header__img}
              />
            </Link>
            <ColorButton onClick={logOutHandler} color="grey" btnClass={classes.logout}>
              Log Out
            </ColorButton>
          </div>
        )}
      </div>
    </header>
  );
}
