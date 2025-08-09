"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      return response.json();
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">
      <Link className="opacity-80 hover:opacity-100 " href="/">
        Back
      </Link>
      <button
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
      >
        {logoutMutation.isPending ? "Logging out..." : "Logout"}
      </button>

      {logoutMutation.isError && (
        <p className="text-red-500">Error: {logoutMutation.error?.message}</p>
      )}
    </div>
  );
}
