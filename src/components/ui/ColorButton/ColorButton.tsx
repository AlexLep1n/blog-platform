import classes from './ColorButton.module.css';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  color: string;
  btnClass: string;
}

export default function ColorButton({ children, color, btnClass, onClick, ...props }: Props) {
  return (
    <button onClick={onClick} className={`${classes.btn} ${btnClass} ${classes[color]}`} {...props}>
      {children}
    </button>
  );
}
