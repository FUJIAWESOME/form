import React from "react";
import style from "./Select.module.css";

interface ISelectProps {
  title: string;
  isDisabled?: boolean;
  options: string[];
  onChange: (el: string) => void;
}

const Select: React.FC<ISelectProps> = ({
  title,
  onChange,
  isDisabled = false,
  options,
}) => {
  return (
    <>
      <select
        className={style.select}
        disabled={isDisabled}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{title}</option>
        {options?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
