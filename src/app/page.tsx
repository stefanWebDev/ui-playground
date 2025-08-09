"use client";

import { List } from "@/components/custom/List";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const response = await fetch("/api/auth/test");
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      return response.json();
    },
  });

  return (
    <div className="font-sans p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 tracking-tight">UI Components:</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data?.user?.surname && <p>Hello {data.user?.surname}. Your are logged in.</p>}
      </div>

      {isLoading ? (
        <p>is loading</p>
      ) : (
        <List
          items={[
            { id: "1", label: "sign up", link: "/auth/signup" },
            { id: "2", label: "sign in", link: "/auth/signin" },
            ...(data?.user ? [{ id: "3", label: "log out", link: "/auth/logout" }] : []),
            { id: "4", label: "change theme", link: "/theme" },
          ]}
        />
      )}
    </div>
  );
}
