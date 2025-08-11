"use client";

import Link from "next/link";
import { Form } from "@/components/common/auth-form/Form";
import { useState } from "react";
import { AuthButtonType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export default function Auth() {
  const [auth, setAuth] = useState<AuthButtonType>("signup");

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth-check"],
    queryFn: async () => {
      const response = await fetch("/api/private");

      if (!response.ok) {
        throw new Error("Not authenticated");
      }

      return response.json();
    },
  });

  console.log("User data:", user, "Loading:", isLoading, "Error:", error);

  const buttons: { label: string; value: AuthButtonType }[] = [
    { label: "sign up", value: "signup" },
    { label: "sign in", value: "signin" },
    { label: "logout", value: "logout" },
  ];

  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">
      <Link className="opacity-80 hover:opacity-100 " href="/">
        Back
      </Link>

      <div className="flex gap-4 mb-4">
        {buttons.map((button) => (
          <button
            key={button.value}
            className={`px-4 py-2 rounded opacity-90 hover:opacity-100 cursor-pointer ${
              auth === button.value
                ? "font-semibold cursor-pointer bg-[var(--accent-color)] text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setAuth(button.value)}
          >
            {button.label}
          </button>
        ))}
      </div>

      <Form key={auth} type={auth} />
    </div>
  );
}
