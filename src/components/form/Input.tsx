"use client";

import { InputHTMLAttributes } from "react";
import { useFormData } from "./hook";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = (props: InputProps) => {

     const { label, ...rest } = props;

    return (
       <div> 
           <label >{label}</label>
            <input {...rest}>
        </input>
       </div>

    );
};

export default Input;