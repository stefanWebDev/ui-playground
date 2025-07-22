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
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link href={item.link}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
