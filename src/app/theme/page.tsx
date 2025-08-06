"use client";

import { useState, useEffect } from "react";
import { Dropdown } from "@/components/custom/Dropdown";
import Link from "next/link";
import { getCookie, setCookie } from "@/utils/helpers/cookie";

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
    setCookie("theme", theme, 365);
  }, [theme, hydrated]);

  const onChange = (value: "light" | "dark") => {
    document.startViewTransition(() => {
      setTheme(value);
    });
  };

  if (!hydrated) return null;

  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">
      <Link className="opacity-80 hover:opacity-100 " href="/">
        Back
      </Link>
      <Dropdown
        value={theme}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value as "light" | "dark")}
        options={[
          { value: "light", label: "Light Mode" },
          { value: "dark", label: "Dark Mode" },
        ]}
      />
    </div>
  );
}
