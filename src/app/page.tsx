'use client';

import React from 'react';
import blueprints from '@/data/blueprints.json';
import BlueprintSearch from './ui/BlueprintsSearch';
import Navbar from './ui/Navbar';
import { useSession, signIn } from 'next-auth/react';

const S3_FOLDER = process.env.NEXT_PUBLIC_S3_FOLDER;

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-6">
          Welcome to Electrical Blueprints
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
          Access detailed electrical plans for Novotel Living Mazatlán. Please sign in with GitHub to continue.
        </p>
        <button
          onClick={() => signIn('github')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-lg"
        >
          Sign in with GitHub
        </button>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="h-[calc(100vh-64px)] p-8 bg-gradient-to-br from-gray-50 to-gray-200 flex max-w-7xl mx-auto gap-6">
        <aside className="w-72 flex-shrink-0 border-r border-gray-300 pr-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Plan List</h2>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {blueprints.map((file) => (
              <a
                key={file}
                href={`${S3_FOLDER}/${encodeURIComponent(file)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:bg-blue-50 transition duration-300 truncate text-blue-700 font-medium"
                title={file}
              >
                {file}
              </a>
            ))}
          </div>
        </aside>

        <section className="flex-1 flex flex-col overflow-hidden">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900 tracking-wide">
            H-vac Electric Plans
          </h1>
          <div className="flex-1 overflow-y-auto pr-2">
            <BlueprintSearch />
          </div>
        </section>
      </main>
    </>
  );
}
