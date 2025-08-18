"use client";

import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["iot-data"],
    queryFn: async () => {
      const response = await fetch("/api/private/iot-data");

      if (!response.ok) return null;

      return await response.json();
    },
  });

  return (
    <div className="font-sans p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold opacity-80">IoT Data</h1>
      </div>
    </div>
  );
}
