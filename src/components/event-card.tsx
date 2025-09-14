import React from "react";
import Image from "next/image";

interface EventCardProps {
  img: string;
  title: string;
  desc: string;
  buttonLabel: string;
}

export function EventCard({ img, title, desc, buttonLabel }: EventCardProps) {
  return (
    <div className="bg-transparent">
      <div className="relative mb-6 h-48 overflow-hidden rounded-lg">
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-0">
        <a
          href="#"
          className="text-blue-gray-900 transition-colors hover:text-gray-800"
        >
          <h5 className="mb-2 text-xl font-semibold text-gray-900">
            {title}
          </h5>
        </a>
        <p className="mb-6 font-normal text-gray-500">
          {desc}
        </p>
        <button className="rounded bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 transition-colors">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default EventCard;