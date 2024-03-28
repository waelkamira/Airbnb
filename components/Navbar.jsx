'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 sm:px-20 py-4 border-b">
      <Link href={'/'} className="hidden md:block">
        {' '}
        <div className="relative h-8 w-24 ">
          <Image
            src={'/images/logo.png'}
            layout="fill"
            objectFit="contain"
            alt="logo"
          />
        </div>
      </Link>
      <div className="flex justify-between items-center rounded-full border gap-8 mx-2 px-1 py-1 font-bold hover:shadow-md grow md:grow-0">
        <h1 className=" cursor-pointer text-nowrap pl-2">Anywhere</h1>
        <h1 className="cursor-pointer border-l border-r px-4 text-nowrap hidden sm:block">
          Any Week
        </h1>
        <h1 className="cursor-pointer text-gray-400 text-nowrap hidden sm:block">
          Add Gests
        </h1>
        <div className=" cursor-pointer bg-primary p-3 rounded-full text-white">
          <FiSearch />
        </div>
      </div>
      <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
        <div className="font-bold hidden lg:block text-nowrap">
          Airbnb Tour Home
        </div>
        <div
          className="flex items-center gap-2 border rounded-full p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="cursor-pointer relative">
            <GiHamburgerMenu />
            {isOpen && (
              <div className="absolute px-4 py-2 w-44 bg-white border rounded-xl right-2 top-8 ">
                <h1
                  className="hover:bg-primary text-sm p-2 rounded-md "
                  onClick={() => setIsOpen(false)}
                >
                  My Trips
                </h1>
                <h1
                  className="hover:bg-primary text-sm p-2 rounded-md "
                  onClick={() => setIsOpen(false)}
                >
                  My Favorites
                </h1>
                <h1
                  className="hover:bg-primary text-sm p-2 rounded-md "
                  onClick={() => setIsOpen(false)}
                >
                  My Reservations
                </h1>
                <h1
                  className="hover:bg-primary text-sm p-2 rounded-md "
                  onClick={() => setIsOpen(false)}
                >
                  My Properties
                </h1>
                <h1
                  className="hover:bg-primary text-sm p-2 rounded-md "
                  onClick={() => setIsOpen(false)}
                >
                  Airbnb Your Home
                </h1>
                <hr />
                <h1
                  className="hover:bg-primary text-sm p-2 rounded-md "
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </h1>
              </div>
            )}
          </div>
          <div className="relative h-6 w-6 cursor-pointer">
            <Image
              src={'/images/placeholder.jpg'}
              layout="fill"
              objectFit="contain"
              alt="icon"
              className=" rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
