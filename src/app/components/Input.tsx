import React from "react";

type InputProps = {
  id: string;
  onchange: any;
  value: string;
  label: string;
  type: string;
};

const Input = ({ id, value, onchange, label, type }: InputProps) => {
  return (
    <div className="">
      <input
        type={type}
        value={value}
        onChange={onchange}
        id={id}
        className="block rounded-md px-6 pt-6 pb-1 w-full text-md appearance-none text-black focus:outline-none focus:ring-0 peer"
        placeholder=""
      />
      <label
        htmlFor={id}
        className="absolute text-md text-black duration-150 transform -translate-y-3 scale-75 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
