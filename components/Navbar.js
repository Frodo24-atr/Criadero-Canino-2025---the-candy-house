import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logos/logo-main.png"
                alt="The Candy House Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-2xl font-bold text-amber-600">
                The Candy House
              </span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Inicio
            </Link>
            <Link href="/razas/cocker" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Cocker
            </Link>
            <Link href="/razas/schnauzer" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Schnauzer
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-blue-600 transition duration-300">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}