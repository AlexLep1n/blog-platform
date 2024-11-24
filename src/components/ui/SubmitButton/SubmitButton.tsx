import React from 'react';
import classes from './SubmitButton.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  btnClass?: string;
}

export default function SubmitButton({ children, btnClass, ...props }: Props) {
  return (
    <button type="submit" className={`${classes.button} ${btnClass}`} {...props}>
      {children}
    </button>
  );
}
