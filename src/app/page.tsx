'use client';
import React from 'react';

import blueprints from '@/data/blueprints.json';



const S3_FOLDER = process.env.NEXT_PUBLIC_S3_FOLDER;

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-200">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 tracking-wide">
        Novotel Living Mazatlan H-vac Electric Plans
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {blueprints.map((file) => (
          <a
            key={file}
            href={`${S3_FOLDER}/${file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:bg-blue-50 transition-shadow duration-300"
          >
            <p className="text-blue-700 font-medium text-lg truncate">{file}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
