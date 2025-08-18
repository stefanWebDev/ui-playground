import { Prisma } from "@/generated/prisma/client";

type Observation = Prisma.ObservationGetPayload<{}>;
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
  const processObservations = (): ChartData[] => {
    const groupedByDate: Record<string, Observation[]> = {};

    sensor.observations.forEach((obs) => {
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

  const chartData = processObservations();
  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  if (chartData.length === 0) {
    return (
      <div className={`p-4 text-center text-gray-500 ${className}`}>No observations available</div>
    );
  }

  return (
    <div className={`p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">
        {sensor.model} -{" "}
        {sensor.value_type === "Digital" ? "Daily Activations" : `Daily Average (${sensor.unit})`}
      </h3>

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

            <div className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-left whitespace-nowrap">
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
