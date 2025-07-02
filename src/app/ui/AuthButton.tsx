'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="mb-4 text-right">
      {session ? (
        <div className="flex justify-end items-center gap-4">
          <span className="text-sm text-gray-700">
            Welcome, {session.user?.name || 'User'}!
          </span>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn('github')}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Sign in with GitHub
        </button>
      )}
    </div>
  );
}
