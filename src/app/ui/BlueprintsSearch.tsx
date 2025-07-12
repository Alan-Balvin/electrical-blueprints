'use client';

import React, { useState } from 'react';
import blueprintNames from '@/data/blueprints.json';
import BlueprintComments from './BlueprintComments.tsx';


const S3_FOLDER = process.env.NEXT_PUBLIC_S3_FOLDER || '';

export default function BlueprintSearch() {
  const [search, setSearch] = useState('');
  const [selectedBlueprint, setSelectedBlueprint] = useState<string | null>(null);

  const filteredBlueprints = blueprintNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* BÚSQUEDA */}
      <input
        type="text"
        placeholder="Search plan..."
        className="w-full mb-4 p-3 border rounded shadow focus:outline-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LISTADO */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredBlueprints.map((name) => (
          <button
            key={name}
            onClick={() => setSelectedBlueprint(name)}
            className={`p-4 bg-white shadow rounded-xl hover:bg-blue-50 transition truncate ${
              selectedBlueprint === name ? 'border-2 border-blue-500' : ''
            }`}
            title={name}
          >
            {name}
          </button>
        ))}
      </div>

      {/* VISOR Y COMENTARIOS */}
      {selectedBlueprint && (
        <div className="mt-10 space-y-6">
          {/* Visor */}
          <iframe
            src={`${S3_FOLDER}/${selectedBlueprint}`}
            title={selectedBlueprint}
            className="w-full h-[600px] border rounded-xl"
          />

          {/* Comentarios */}
          <BlueprintComments blueprint={selectedBlueprint} />
        </div>
      )}
    </div>
  );
}
