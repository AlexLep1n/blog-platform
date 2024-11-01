import { Link } from 'react-router-dom';
import ColorButton from '../../ui/ColorButton/ColorButton';
import classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={`${classes.header__content} container`}>
        <Link to={'/'} className={classes.header__title}>
          Realworld Blog
        </Link>
        <div className={classes.header__buttons}>
          <button className={`${classes.header__button} ${classes['button_green']}`}>
            Sign In
          </button>
          <ColorButton btnClass={classes.header__button} color={'green'}>
            Sign Up
          </ColorButton>
        </div>
      </div>
    </header>
  );
}
