import React from "react";

interface StatsCardProps {
  icon: React.ComponentType<{ className?: string }>;
  count: string | number;
  title: string;
}

export function StatsCard({ icon: Icon, count, title }: StatsCardProps) {
  return (
    <div className="flex flex-col items-center bg-transparent">
      <Icon className="h-7 w-7 text-gray-900" />
      <h1 className="mb-2 mt-4 text-5xl font-bold text-gray-900">
        {count}
      </h1>
      <p className="font-normal text-gray-500">
        {title}
      </p>
    </div>
  );
}

export default StatsCard;