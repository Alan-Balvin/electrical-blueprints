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
  url: `${S3_FOLDER}/${name}`
}));

export default function BlueprintSearch() {
  const [search, setSearch] = useState('');

  const filteredBlueprints = blueprints.filter((bp) =>
    bp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <input
        type="text"
        placeholder="Search plan..."
        className="w-full mb-8 p-3 border rounded shadow focus:outline-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredBlueprints.length === 0 ? (
        <p className="text-center text-gray-500 mt-12 text-lg">No plans found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBlueprints.map((bp) => (
            <a
              key={bp.name}
              href={bp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:bg-blue-50 transition-shadow duration-300 flex items-center justify-center"
            >
              <p className="text-blue-700 font-medium text-lg truncate text-center">{bp.name}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
