import { DropdownOptions } from "@/types/types";
import { SelectHTMLAttributes } from "react";

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: DropdownOptions;
}

export const Dropdown = ({ options, ...rest }: DropdownProps) => {
  return (
    <select
      className="px-4 py-2 rounded border border-gray-300 focus:border-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition"
      {...rest}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
