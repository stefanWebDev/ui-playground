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
          { id: "1", label: "auth", link: "/auth" },
          { id: "4", label: "change theme", link: "/theme" },
        ]}
      />
    </div>
  );
}
