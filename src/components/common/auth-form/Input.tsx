"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, id, ...rest }: InputProps) => {

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} >{label}</label>
      <input autoComplete="off" className="text-black h-8 p-4 bg-[#f9f6f0] border-2 border-[var(--accent-color)] rounded-md" {...rest} />
    </div>

  );
};

export default Input;
