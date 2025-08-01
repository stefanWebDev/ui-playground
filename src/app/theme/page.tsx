"use client";

import { useState, useEffect } from "react";
import { Dropdown } from "@/components/form/Dropdown";
import Link from "next/link";

export default function ThemeColor() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    document.cookie = `theme=${theme}; path=/; max-age=31536000`;
  }, [theme, hydrated]);

  const onChange = (value: "light" | "dark") => {
    setTheme(value);
  };

  if (!hydrated) return null;

  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">
      <Link className="opacity-80 hover:opacity-100 " href="/">Back</Link>
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
