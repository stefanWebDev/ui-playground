"use client";

import { useState, useEffect } from "react";
import { Dropdown } from "@/components/form/Dropdown";
import Link from "next/link";

export default function ThemeColor() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.body.setAttribute("data-theme", stored);
    }
  }, []);

  const onChange = (value: "light" | "dark") => {
    setTheme(value);
    document.body.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
  };

  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">
      <Link href="/">Back</Link>
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
