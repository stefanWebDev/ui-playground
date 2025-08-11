"use client";

import { useState, useEffect } from "react";
import { Dropdown } from "@/components/custom/Dropdown";
import Link from "next/link";
import { getCookie, setCookie } from "@/utils/helpers/cookie";
import { navLinkClasses } from "@/const/const";

export default function ThemeColor() {
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
    <div className="font-sans p-8 flex flex-col gap-4 items-center">
      <Link className={navLinkClasses} href="/">
        Back
      </Link>
      <Dropdown
        value={theme}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value as "light" | "dark")}
        options={[
          { value: "light", label: "light mode" },
          { value: "dark", label: "dark mode" },
        ]}
      />
    </div>
  );
}
