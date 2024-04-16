'use client';
import Image from 'next/image';
import Link from 'next/link';
import ListPages from '../components/listing/ListPages';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import SearchPage from '../components/search/Search';
export default function Navbar() {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const session = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    if (window !== 'undefined') {
      localStorage.removeItem('reservation');
    }
    signOut({ callbackUrl: '/' });
    setIsOpen(false);
  }
  return (
    <div className="flex justify-between items-center px-4 sm:px-20 py-4 border-b">
      <Link
        href={'/'}
        className="hidden md:block"
        onClick={() => router.push('/')}
      >
        <div className="relative h-8 w-24 ">
          <Image
            src={'/images/logo.png'}
            layout="fill"
            objectFit="contain"
            alt="logo"
          />
        </div>
      </Link>

      <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 mx-4">
        <SearchPage />
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
        {session?.status === 'authenticated' ? (
          <h1
            onClick={() => {
              const queryParams = new URLSearchParams(window.location.search);
              queryParams.delete('country', 'createList');
              history.replaceState(
                null,
                '',
                window.location.pathname + '?' + queryParams.toString()
              );
              router.push('?createList=page1');
              setIsListOpen(true);
            }}
            className="font-bold hidden lg:block text-nowrap cursor-pointer bg-gray-200 hover:bg-primary hover:text-white rounded-full p-2"
          >
            Airbnb Tour Home
          </h1>
        ) : (
          <Link
            href={'/login'}
            className="font-bold hidden lg:block text-nowrap cursor-pointer bg-primary text-white rounded-full p-2"
          >
            Login
          </Link>
        )}
        {isListOpen && (
          <ListPages isListOpen={isListOpen} setIsListOpen={setIsListOpen} />
        )}

        <div
          className="flex items-center gap-2 border rounded-full p-2  hover:shadow-lg  "
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="cursor-pointer relative">
            <GiHamburgerMenu />
            {isOpen && (
              <>
                {session?.status === 'authenticated' && (
                  <div className="absolute px-4 py-4 w-44 bg-white border rounded-xl right-2 top-8 z-50">
                    <Link href={'/favorites'}>
                      <h1
                        className="hover:bg-primary hover:shadow-xl hover:shadow-primary hover:text-white text-sm p-2 rounded-md "
                        onClick={() => setIsOpen(false)}
                      >
                        My Favorites
                      </h1>
                    </Link>
                    <Link href={'/reservations'}>
                      <h1
                        className="hover:bg-primary hover:shadow-xl hover:shadow-primary hover:text-white text-sm p-2 rounded-md "
                        onClick={() => setIsOpen(false)}
                      >
                        My Reservations
                      </h1>
                    </Link>
                    <Link href={'/properties'}>
                      <h1
                        className="hover:bg-primary hover:shadow-xl hover:shadow-primary hover:text-white text-sm p-2 rounded-md "
                        onClick={() => setIsOpen(false)}
                      >
                        My Properties
                      </h1>
                    </Link>
                    <h1
                      className="hover:bg-primary hover:shadow-xl hover:shadow-primary hover:text-white text-sm p-2 rounded-md "
                      onClick={() => {
                        router.push('?createList=page1');
                        setIsListOpen(true);
                        setIsOpen(false);
                      }}
                    >
                      Airbnb Your Home
                    </h1>
                    <hr />
                    <Link href={'/'} className={'w-1/5'}>
                      <div className="mt-2">
                        <Button name={'Home'} type={'two'} />
                      </div>
                    </Link>
                    <div className="mt-3">
                      <Button
                        type={'two'}
                        name={'Logout'}
                        className="hover:bg-primary hover:shadow-xl hover:shadow-primary hover:text-white text-sm p-2 rounded-md "
                        onClick={() => handleLogout()}
                      />
                    </div>
                  </div>
                )}
                {session?.status === 'unauthenticated' && (
                  <div className="absolute px-4 py-2 w-44 bg-white border rounded-xl -right-8 top-8 z-50">
                    <Link href={'/login'}>
                      <h1 className="hover:bg-primary hover:shadow-xl hover:shadow-primary hover:text-white text-sm p-2 rounded-md ">
                        Login
                      </h1>
                    </Link>
                    <Link href={'/register'}>
                      <h1 className="hover:bg-primary hover:shadow-xl hover:shadow-primary hover:text-white text-sm p-2 rounded-md ">
                        Sign up
                      </h1>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="relative h-6 w-6 cursor-pointer">
            <Image
              src={session?.data?.user?.image || '/images/placeholder.jpg'}
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
