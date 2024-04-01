'use client';

import icons from '../../components/Icons';
import { IoMdClose } from 'react-icons/io';
import Button from '../../components/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateListPage1({ setIsListOpen }) {
  const session = useSession();
  const [isActive, setIsActive] = useState('');
  const router = useRouter();

  if (session?.status === 'unauthenticated') {
    return;
  }

  return (
    <div
      className="bg-white rounded-lg p-4 h-[90%] max-w-[575px] min-w-[300px] z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="relative text-center text-lg md:text-2xl font-bold py-4 w-full">
        <IoMdClose
          className="absolute ml-2  md:ml-8 text-lg md:text-xl hover:text-primary cursor-pointer"
          onClick={() => setIsListOpen(false)}
        />
        Airbnb Your Home!
      </h1>
      <hr />
      <h1 className="my-4 font-extrabold text-xl">
        Which Of These Best Describes Your Place?
      </h1>
      <h6 className="text-gray-400 my-2">Pick a Category</h6>

      <div className="grid grid-cols-1 md:grid-cols-2 h-3/5 2xl:h-2/3 overflow-y-scroll scrollbar border rounded-md pr-2">
        {icons?.map((icon) => {
          return (
            <div
              onClick={() => setIsActive(icon?.title)}
              key={icon?.title}
              className={
                (icon.title === isActive
                  ? 'border-2 border-primary'
                  : 'border-2 border-gray-200') +
                ' relative m-2 py-2 px-4 rounded-md min-w-[240px] outline-none cursor-pointer'
              }
            >
              <h1
                className={
                  (icon.title === isActive
                    ? 'text-primary animate-bounce absolute top-4'
                    : 'text-gray-500') + ' absolute text-3xl '
                }
              >
                {icon?.icon}
              </h1>
              <h1
                className={
                  (icon.title === isActive ? 'text-primary' : 'text-gray-500') +
                  ' mt-8 text-lg py-1'
                }
              >
                {icon?.title}
              </h1>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <Button
          name="Next"
          onClick={() => {
            router.push('?createList=page2');
          }}
        />
      </div>
    </div>
  );
}
