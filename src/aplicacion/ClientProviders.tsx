'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import AuthButton from './ui/AuthButton';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <h1 className="text-lg font-bold">Electrical Blueprints</h1>
        <AuthButton />
      </header>

      <main>{children}</main>
    </SessionProvider>
  );
}
