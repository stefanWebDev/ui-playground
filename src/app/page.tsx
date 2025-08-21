"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@/generated/prisma/client";
import { Dropdown } from "@/components/common/Dropdown";
import { FancySpinner } from "@/components/common/FancySpinner";
import { ObservationChart } from "@/components/custom/ObservationChart";
import { NavLink } from "@/components/common/NavLink";
import { useRouter } from "next/navigation";

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

interface AuthResponseData {
  message: string;
  authenticated: boolean;
}

export default function Home() {
  const [selectedThingId, setSelectedThingId] = useState<string>("");
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const [selectedSensorId, setSelectedSensorId] = useState<string>("");
  const router = useRouter();

  const { data: authData, isLoading: isAuthLoading } = useQuery<AuthResponseData>({
    queryKey: ["auth-check"],
    queryFn: async () => {
      const response = await fetch("/api/private");

      if (!response.ok) return null;

      return await response.json();
    },
  });

  const { data, isLoading, error } = useQuery<IotDataResponse>({
    queryKey: ["iot-data"],
    queryFn: async () => {
      const response = await fetch("/api/private/iot-data");

      if (!response.ok) {
        throw new Error("Failed to fetch IoT data");
      }

      return await response.json();
    },
    enabled: !isAuthLoading && !authData?.authenticated,
  });

  const things = data?.user?.things || [];
  const selectedThing = things.find((thing) => thing.id === parseInt(selectedThingId));
  const topics = selectedThing?.topics || [];
  const selectedTopic = topics.find((topic) => topic.id === parseInt(selectedTopicId));
  const sensors = selectedTopic?.sensors || [];
  const selectedSensor = sensors.find((sensor) => sensor.id === parseInt(selectedSensorId));

  const handleThingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedThingId(e.target.value);
    setSelectedTopicId("");
    setSelectedSensorId("");
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopicId(e.target.value);
    setSelectedSensorId("");
  };

  const handleSensorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSensorId(e.target.value);
  };

  useEffect(() => {
    if (authData?.authenticated === false) {
      router.push("/auth");
    }
  }, [authData?.authenticated, router]);

  if (isLoading || isAuthLoading) {
    return (
      <div className="font-sans p-8 flex flex-col gap-4 items-center justify-center min-h-screen">
        <FancySpinner size="lg" />
        <p className="text-gray-600 animate-pulse text-[var(--color)]">Loading IoT data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans p-8 flex flex-col gap-4 items-center justify-center min-h-screen">
        <p className="text-red-600">Error loading IoT data: {error.message}</p>
        <NavLink href="/auth" label="Login" />
      </div>
    );
  }

  if (things.length === 0) {
    return (
      <div className="font-sans p-8 flex flex-col gap-4 items-center justify-center min-h-screen">
        <p className="text-[var(--color)]">No IoT data available. Use dummy user or create data.</p>
      </div>
    );
  }

  return (
    <div className="font-sans p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold opacity-80 text-[var(--color)]">IoT Data</h1>
      </div>

      <div className="flex gap-4">
        <Dropdown
          options={[
            { label: "Select a Thing", value: "" },
            ...things.map((thing) => ({
              label: thing.title,
              value: thing.id.toString(),
            })),
          ]}
          value={selectedThingId}
          onChange={handleThingChange}
        />

        <Dropdown
          options={[
            { label: "Select a Topic", value: "" },
            ...topics.map((topic) => ({
              label: topic.title,
              value: topic.id.toString(),
            })),
          ]}
          value={selectedTopicId}
          onChange={handleTopicChange}
          disabled={!selectedThingId}
        />

        <Dropdown
          options={[
            { label: "Select a Sensor", value: "" },
            ...sensors.map((sensor) => ({
              label: `${sensor.model} (${sensor.unit})`,
              value: sensor.id.toString(),
            })),
          ]}
          value={selectedSensorId}
          onChange={handleSensorChange}
          disabled={!selectedTopicId}
        />
      </div>

      {selectedSensorId && (
        <div className="mt-4 p-4 border rounded bg-[var(--accent-color)]/70 text-white">
          <h3 className="font-semibold">Selected Sensor Details:</h3>
          <p>Thing description: {selectedThing?.description}</p>
          <p>Topic description: {selectedTopic?.description}</p>
          <p>Sensor model: {selectedSensor?.model}</p>
        </div>
      )}

      {selectedSensor && (
        <ObservationChart
          sensor={selectedSensor}
          className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
        />
      )}
    </div>
  );
}
