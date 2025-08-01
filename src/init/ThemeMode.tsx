"use client";

import { useEffect } from "react";


export default function ThemeMode() {

  useEffect(() => {
    const value = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", value);
  }, []);

  return null;
}
