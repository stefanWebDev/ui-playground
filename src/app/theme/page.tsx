"use client";

import { Dropdown } from "@/components/form/Dropdown";
import Link from "next/link";

const themeValues = {
  background: {
    light: "#FFF6EA",
    dark: "#124D6A"
  },
  color: {
    light: "#411900",
    dark: "#FFFFFF"
  },
  accentColor: {
    light: "#A1DB92",
    dark: "#2AD0CD"
  }
}



export default function ThemeColor() {

  const onChange = (value: "light" | "dark") => {
    document.body.style.setProperty("--background", themeValues.background[value]);
    document.body.style.setProperty("--color", themeValues.color[value]);
    document.body.style.setProperty("--accent-color", themeValues.accentColor[value]);
  };

  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">

      <Link href="/">Back</Link>


      <Dropdown
        onChange={(e) => onChange((e.target as HTMLSelectElement).value as "light" | "dark")}
        options={[
          { value: "light", label: "Light Mode" },
          { value: "dark", label: "Dark Mode" },
        ]}
      />

    </div>
  );
}
