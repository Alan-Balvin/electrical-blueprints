'use client';
import React from 'react';
import blueprints from '@/data/blueprints.json';
import BlueprintSearch from './ui/BlueprintsSearch';

const S3_FOLDER = process.env.NEXT_PUBLIC_S3_FOLDER;

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-200 flex max-w-7xl mx-auto">
      {/* Barra lateral izquierda: listado de planos */}
      <aside className="w-72 flex-shrink-0 overflow-y-auto border-r border-gray-300 pr-4">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Plan List</h2>
        <div className="space-y-4">
          {blueprints.map((file) => (
            <a
              key={file}
              href={`${S3_FOLDER}/${file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:bg-blue-50 transition-shadow duration-300 truncate text-blue-700 font-medium"
              title={file}
            >
              {file}
            </a>
          ))}
        </div>
      </aside>

      {/* Contenido principal: título y buscador */}
      <section className="flex-1 pl-10">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 tracking-wide">
          Novotel Living Mazatlan H-vac Electric Plans
        </h1>
        <BlueprintSearch />
      </section>
    </main>
  );
}
