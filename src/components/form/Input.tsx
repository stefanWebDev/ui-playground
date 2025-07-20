"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = (props: InputProps) => {

     const { label, ...rest } = props;

    return (
       <div className="flex flex-col gap-1"> 
           <label htmlFor={props.id} >{label}</label>
            <input className="h-8 p-4 bg-[#f9f6f0] border-2 border-[var(--chocolate)] rounded-md" {...rest} />
       </div>

    );
};

export default Input;