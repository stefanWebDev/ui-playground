"use client";

import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@/generated/prisma/client";

type IotDataResponse = {
  user: Prisma.UserGetPayload<{
    include: {
      things: {
        include: {
          topics: {
            include: {
              sensors: {
                include: {
                  observations: true;
                };
              };
            };
          };
        };
      };
    };
  }>;
} | null;

export default function Home() {
  const { data, isLoading } = useQuery<IotDataResponse>({
    queryKey: ["iot-data"],
    queryFn: async () => {
      const response = await fetch("/api/private/iot-data");

      if (!response.ok) return null;

      return await response.json();
    },
  });

  console.log(data);

  return (
    <div className="font-sans p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold opacity-80">IoT Data</h1>
      </div>
    </div>
  );
}
