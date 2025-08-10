"use client";

import { List } from "@/components/custom/List";

export default function Home() {
  return (
    <div className="font-sans p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 tracking-tight">UI Components:</h1>
      </div>

      <List
        items={[
          { id: "1", label: "sign up", link: "/auth/signup" },
          { id: "2", label: "sign in", link: "/auth/signin" },
          { id: "3", label: "log out", link: "/auth/logout" },
          { id: "4", label: "change theme", link: "/theme" },
        ]}
      />
    </div>
  );
}
