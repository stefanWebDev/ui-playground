"use client";

import { useEffect, useState } from "react";
import { NavLink } from "../common/NavLink";
import { getCookie, setCookie } from "@/utils/helpers/cookie";
import { Dropdown } from "../common/Dropdown";

export const NavBar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const cookie = getCookie("theme");
    if (cookie === "light" || cookie === "dark") {
      setTheme(cookie);
      document.documentElement.setAttribute("data-theme", cookie);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", theme);
    const days = 30;
    const expirationDate = new Date(Date.now() + days * 864e5);

    setCookie("theme", theme, expirationDate);
  }, [theme, hydrated]);

  const onChange = (value: "light" | "dark") => {
    document.startViewTransition(() => {
      setTheme(value);
    });
  };

  if (!hydrated) return null;

  return (
    <nav className="absolute top-0 right-0 p-4 z-10">
      <div className="flex items-center gap-4">
        <NavLink href="/auth" label="Account" />

        <Dropdown
          value={theme}
          onChange={(e) => onChange((e.target as HTMLSelectElement).value as "light" | "dark")}
          options={[
            { value: "light", label: "Light Mode" },
            { value: "dark", label: "Dark Mode" },
          ]}
        />
      </div>
    </nav>
  );
};
