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
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const filteredBlueprints = blueprints.filter((bp) =>
    bp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <input
        type="text"
        placeholder="Search plan..."
        className="w-full mb-8 p-3 border rounded shadow focus:outline-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {filteredBlueprints.map((bp) => (
          <button
            key={bp.name}
            onClick={() => setSelectedUrl(bp.url)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:bg-blue-50 transition duration-300 truncate text-blue-700 font-medium text-left"
          >
            {bp.name}
          </button>
        ))}
      </div>

      {selectedUrl && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Plan Preview</h2>
          <iframe
            src={selectedUrl}
            className="w-full h-[80vh] border rounded-xl shadow"
            title="Blueprint Preview"
          />
        </div>
      )}
    </div>
  );
}
