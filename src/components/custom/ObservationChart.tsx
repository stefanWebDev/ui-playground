import { Prisma } from "@/generated/prisma/client";
import { useState, useMemo } from "react";

type Observation = Prisma.ObservationGetPayload<object>;
type Sensor = Prisma.SensorGetPayload<{
  include: {
    observations: true;
  };
}>;

interface ObservationChartProps {
  sensor: Sensor;
  className?: string;
}

interface ChartData {
  date: string;
  value: number;
  label: string;
}

export const ObservationChart = ({ sensor, className = "" }: ObservationChartProps) => {
  // Get date range from observations
  const observationDates = sensor.observations.map(
    (obs) => new Date(obs.created_at).toISOString().split("T")[0]
  );
  const minDate =
    observationDates.length > 0
      ? Math.min(...observationDates.map((d) => new Date(d).getTime()))
      : Date.now();
  const maxDate =
    observationDates.length > 0
      ? Math.max(...observationDates.map((d) => new Date(d).getTime()))
      : Date.now();

  const [startDate, setStartDate] = useState(new Date(minDate).toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date(maxDate).toISOString().split("T")[0]);

  const processObservations = (): ChartData[] => {
    const groupedByDate: Record<string, Observation[]> = {};

    // Filter observations by date range
    const filteredObservations = sensor.observations.filter((obs) => {
      const obsDate = new Date(obs.created_at).toISOString().split("T")[0];
      return obsDate >= startDate && obsDate <= endDate;
    });

    filteredObservations.forEach((obs) => {
      const date = new Date(obs.created_at).toISOString().split("T")[0];
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(obs);
    });

    return Object.entries(groupedByDate)
      .map(([date, observations]) => {
        let value: number;
        let label: string;

        if (sensor.value_type === "Digital") {
          const countOfOnes = observations.filter((obs) => obs.value === 1).length;
          value = countOfOnes;
          label = `${countOfOnes} activations`;
        } else {
          const sum = observations.reduce((acc, obs) => acc + obs.value, 0);
          const average = sum / observations.length;
          value = Math.round(average * 100) / 100;
          label = `${value} ${sensor.unit}`;
        }

        return {
          date,
          value,
          label,
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  const chartData = useMemo(() => processObservations(), [sensor.observations, startDate, endDate]);
  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  if (chartData.length === 0) {
    return (
      <div className={`p-4 ${className}`}>
        <style jsx>{`
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            opacity: 0.7;
          }
          input[type="date"]::-webkit-calendar-picker-indicator:hover {
            opacity: 1;
          }
        `}</style>
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col">
            <label
              htmlFor="start-date"
              className="text-sm font-medium mb-1"
              style={{ color: "var(--color)" }}
            >
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm date-input"
              style={{ colorScheme: "light", accentColor: "var(--color)" }}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="end-date"
              className="text-sm font-medium mb-1"
              style={{ color: "var(--color)" }}
            >
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm date-input"
              style={{ colorScheme: "light", accentColor: "var(--color)" }}
            />
          </div>
        </div>
        <div className="p-4 text-center text-gray-500">
          No observations available for selected date range
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 ${className}`}>
      <style jsx>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.7;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
      `}</style>
      <h3 className="text-lg font-semibold mb-4">
        {sensor.model} -{" "}
        {sensor.value_type === "Digital" ? "Daily Activations" : `Daily Average (${sensor.unit})`}
      </h3>

      <div className="flex gap-4 mb-4">
        <div className="flex flex-col">
          <label
            htmlFor="start-date"
            className="text-sm font-medium mb-1"
            style={{ color: "var(--color)" }}
          >
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm date-input"
            style={{ colorScheme: "light", accentColor: "var(--color)" }}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="end-date"
            className="text-sm font-medium mb-1"
            style={{ color: "var(--color)" }}
          >
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm date-input"
            style={{ colorScheme: "light", accentColor: "var(--color)" }}
          />
        </div>
      </div>

      <div className="flex items-end space-x-2 h-64 border-b border-l border-gray-300">
        {chartData.map((data) => (
          <div key={data.date} className="flex flex-col items-center flex-1 h-full justify-end">
            <div
              className="bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/80 transition-colors duration-200 w-1/2 min-w-[10px] flex items-end justify-center relative group"
              style={{
                height: `${(data.value / maxValue) * 80}%`,
                minHeight: data.value > 0 ? "4px" : "0px",
              }}
            >
              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                {data.label}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>

            <div className="text-xs text-[var(--color)] mt-2 transform -rotate-45 origin-left whitespace-nowrap">
              {new Date(data.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-2">
        <span>0</span>
        <span>
          Max: {maxValue} {sensor.value_type === "Analog" ? sensor.unit : "activations"}
        </span>
      </div>
    </div>
  );
};
