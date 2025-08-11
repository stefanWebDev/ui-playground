interface FancySpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FancySpinner = ({ size = "md", className = "" }: FancySpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full border-2 border-gray-200 border-t-[var(--accent-color)] animate-spin`}
      ></div>
      <div
        className={`absolute top-1 left-1 ${
          size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-12 h-12"
        } rounded-full border border-gray-100 border-r-[var(--accent-color)] animate-spin`}
        style={{ animationDuration: "0.7s" }}
      ></div>
      <div
        className={`absolute top-2 left-2 ${
          size === "sm" ? "w-2 h-2" : size === "md" ? "w-6 h-6" : "w-12 h-12"
        } rounded-full border border-transparent border-b-[var(--accent-color)] animate-spin`}
        style={{ animationDuration: "0.5s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className={`${
            size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"
          } bg-[var(--accent-color)] rounded-full animate-pulse`}
        ></div>
      </div>
    </div>
  );
};
