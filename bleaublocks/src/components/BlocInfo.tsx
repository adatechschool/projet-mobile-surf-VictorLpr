"use client";

import { Bloc } from "@/types";
import { getLevelColor } from "@/utils";

interface BlocInfoProps {
  bloc: Bloc;
}

export default function BlocInfo({ bloc }: BlocInfoProps) {
  return (
    <>
      <div className="mb-4">
        <img
          src={bloc.img_url}
          alt={bloc.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold ">Niveau</h3>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getLevelColor(
                  bloc.level
                )}`}
              >
                {bloc.level}
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold ">
              Position de départ
            </h3>
            <p className="text-sm">{bloc.starting_position}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold ">
              Localisation
            </h3>
            <p className="text-sm">{bloc.area_name}</p>
            <p className="text-xs ">
              {bloc.lat}, {bloc.lng}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold  mb-2">
          Description
        </h3>
        <p className="text-sm leading-relaxed">{bloc.description}</p>
      </div>
    </>
  );
}
