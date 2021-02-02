import React from 'react';

const buttonStyle = {
  margin: '10px 10px 10px 0'
};

export type ButtonProps = {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

export const Button: React.FC<ButtonProps> = ({onClick, children}) => (
  <button
    style={buttonStyle}
    onClick={onClick}>{children}</button>
);
