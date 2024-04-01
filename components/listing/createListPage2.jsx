'use client';

import { IoMdClose } from 'react-icons/io';
import Button from '../Button';
import { useSession } from 'next-auth/react';
import CountrySelector from '../CountrySelector';
import { useRouter } from 'next/navigation';
import Map from '../map/Map';
export default function CreateListPage2({ setIsListOpen }) {
  const router = useRouter();
  const session = useSession();

  if (session?.status === 'unauthenticated') {
    return;
  }

  return (
    <div
      className="flex flex-col items-start bg-white rounded-lg p-4 h-fit w-[90%] sm:w-1/2 lg:w-2/3 xl:w-1/3 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="relative text-center text-lg md:text-xl font-bold py-4 w-full">
        <IoMdClose
          className="absolute mt-1 ml-2 md:ml-4 text-lg hover:text-primary cursor-pointer"
          onClick={() => setIsListOpen(false)}
        />
        Airbnb Your Home!
      </h1>
      <hr />
      <h1 className="my-4 font-extrabold text-center text-sm sm:text-lg">
        Where is your place located?
      </h1>
      <h6 className="text-gray-400 my-2 text-center">Help Gests Find You!</h6>
      <CountrySelector />
    </div>
  );
}
