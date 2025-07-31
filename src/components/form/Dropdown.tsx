import { HTMLAttributes } from "react";


interface DropdownProps extends HTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export const Dropdown = ({ options, ...rest }: DropdownProps) => {
  return (
    <select {...rest}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
