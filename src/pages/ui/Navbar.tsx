'use client';
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-8 sticky top-0 z-50 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-700">
        Novotel Living Mazatlán
      </div>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
