"use client";

import Link from "next/link";
import { Form } from "@/components/common/auth-form/Form";
import { useState } from "react";
import { AuthButtonType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { FancySpinner } from "@/components/common/FancySpinner";
import { navLinkClasses } from "@/const/const";

export default function Auth() {
  const [auth, setAuth] = useState<AuthButtonType>("signup");

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth-check"],
    queryFn: async () => {
      const response = await fetch("/api/private");

      if (!response.ok) return null;

      return await response.json();
    },
  });

  const swappedAuth = (() => {
    switch (auth) {
      case "signin":
        return "logout";
      case "logout":
        return "signin";
      default:
        return "signup";
    }
  })();

  const buttons: { label: string; value: AuthButtonType }[] = user?.user?.id
    ? [
        { label: "sign up", value: "signup" },
        { label: "logout", value: "logout" },
      ]
    : [
        { label: "sign up", value: "signup" },
        { label: "sign in", value: "signin" },
      ];

  if (isLoading) {
    return (
      <div className="font-sans p-8 flex flex-col gap-4 items-center justify-center min-h-screen">
        <FancySpinner size="lg" />
        <p className="text-gray-600 animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">
      <Link className={navLinkClasses} href="/">
        Back
      </Link>
      <div className="flex gap-4 mb-4">
        {buttons.map((button) => (
          <button
            key={button.value}
            className={`px-4 py-2 rounded opacity-90 hover:opacity-100 cursor-pointer ${
              auth === button.value
                ? "font-semibold cursor-pointer bg-[var(--accent-color)] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setAuth(button.value)}
          >
            {button.label}
          </button>
        ))}
      </div>

      <Form key={auth} type={auth} onSuccess={() => setAuth(swappedAuth)} />
    </div>
  );
}
