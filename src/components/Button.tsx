import React from 'react';

import styles from './Button.module.scss';


export type ButtonProps = {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

export const Button: React.FC<ButtonProps> = ({onClick, children}) => (
  <button
    className={styles.Button}
    onClick={onClick}>{children}</button>
);
