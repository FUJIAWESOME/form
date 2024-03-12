import React from "react";
import style from "./Button.module.css";

interface IButtonProps {
  title: string;
  isDisabled: boolean;
}

const Button: React.FC<IButtonProps> = ({ title, isDisabled }) => {
  return (
    <button className={style.button} disabled={isDisabled}>
      {title}
    </button>
  );
};

export default Button;
