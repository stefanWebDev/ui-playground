import Link from "next/link";

interface ListItem {
  id: string;
  label: string;
  link: string;
}

interface ListProps {
  items: ListItem[];
}

export const List = ({ items }: ListProps) => {
  return (
    <ul className="flex flex-col gap-4 lg:w-1/2 ">
      {items.map((item) => (
        <li className="hover:bg-[var(--background)] hover:opacity-100 text-center cursor-pointer h-10 text-xl font-semibold opacity-80 bg-[#f9f6f0] border-2 border-[var(--accent-color)] text-[var(--accent-color)] rounded-md" key={item.id}>
          <Link className="h-full w-full block" href={item.link}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
