import { DropdownOptions } from "@/types/types";
import { Dropdown } from "../common/Dropdown";

interface IotSheetProps {
  options: DropdownOptions;
  description: string;
}

export const IotSheet = ({ options, description }: IotSheetProps) => {
  return (
    <div>
      <Dropdown options={options} />
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
