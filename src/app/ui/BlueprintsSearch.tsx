'use client';

import React, { useState } from 'react';
import blueprintNames from '@/data/blueprints.json';

type Blueprint = {
  name: string;
  url: string;
};

const S3_FOLDER = process.env.NEXT_PUBLIC_S3_FOLDER || '';

const blueprints: Blueprint[] = (blueprintNames as string[]).map((name) => ({
  name,
  url: `${S3_FOLDER}/${name}`,
}));

export default function BlueprintSearch() {
  const [search, setSearch] = useState('');
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);

  const filteredBlueprints = blueprints.filter((bp) =>
    bp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 py-8 max-w-7xl mx-auto w-full">
      {/* Sidebar de búsqueda */}
      <div className="col-span-1">
        <input
          type="text"
          placeholder="Search plan..."
          className="w-full mb-6 p-3 border rounded shadow focus:outline-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredBlueprints.length === 0 ? (
          <p className="text-center text-gray-500 mt-12 text-lg">No plans found</p>
        ) : (
          <ul className="space-y-2">
            {filteredBlueprints.map((bp) => (
              <li key={bp.name}>
                <button
                  onClick={() => setSelectedBlueprint(bp)}
                  className="w-full text-left bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:bg-blue-50 transition truncate text-blue-700 font-medium"
                >
                  {bp.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Visor de planos */}
      <div className="col-span-2">
        {selectedBlueprint ? (
          <iframe
            src={selectedBlueprint.url}
            className="w-full h-[80vh] rounded-xl border shadow"
          />
        ) : (
          <p className="text-gray-600 text-center text-lg mt-20">Select a blueprint to preview</p>
        )}
      </div>
    </div>
  );
}
