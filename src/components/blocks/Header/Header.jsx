import CustomButton from '../../ui/CustomButton';
import classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={`${classes.header__content} container`}>
        <h3 className={classes.header__title}>Realworld Blog</h3>
        <div className={classes.header__buttons}>
          <button className={`${classes.header__button} ${classes['button_green']}`}>
            Sign In
          </button>
          <CustomButton btnClass={classes.header__button} color={'green'}>
            Sign Up
          </CustomButton>
        </div>
      </div>
    </header>
  );
}
