import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
}

export const NavLink = ({ href, label }: NavLinkProps) => {
  const navLinkClasses =
    "text-sm opacity-70 hover:opacity-100 transition-opacity duration-200 hover:text-[var(--accent-color)]";
  return (
    <Link href={href} className={navLinkClasses}>
      {label}
    </Link>
  );
};
