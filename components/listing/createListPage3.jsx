'use client';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateListPage3({ setIsListOpen }) {
  const router = useRouter();
  const [num, setNum] = useState({
    guests: 0,
    rooms: 0,
    bathrooms: 0,
  });

  useEffect(() => {
    if (window !== 'undefined') {
      const listValues = JSON.parse(localStorage.getItem('listValues'));
      if (
        listValues?.guests === undefined ||
        listValues?.rooms === undefined ||
        listValues?.bathrooms === undefined
      ) {
        return;
      }
      setNum({
        guests: listValues?.guests,
        rooms: listValues?.rooms,
        bathrooms: listValues?.bathrooms,
      });
    }
  }, []);

  function handleClick(value, type) {
    if (value === 'inc') {
      setNum({ ...num, [type]: +`${num[type]}` + 1 });
    } else if (+`${num[type]}` > 0) {
      setNum({ ...num, [type]: +`${num[type]}` - 1 });
    }
  }

  function handleSubmit() {
    if (
      num?.guests === undefined ||
      num?.rooms === undefined ||
      num?.bathrooms === undefined ||
      num?.guests === 0 ||
      num?.rooms === 0 ||
      num?.bathrooms === 0
    ) {
      toast.error('Please Select guests, Rooms and Bathrooms Number!');
      return;
    }
    if (window !== 'undefined') {
      const listValues = JSON.parse(localStorage.getItem('listValues'));
      localStorage.setItem(
        'listValues',
        JSON.stringify({
          ...listValues,
          guests: num?.guests,
          rooms: num?.rooms,
          bathrooms: num?.bathrooms,
        })
      );
    }

    toast.success('Success!');
    router.push('?createList=page4');
  }
  return (
    <div
      className="bg-white rounded-lg p-4 max-w-[575px] min-w-[300px] z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="relative text-center text-lg md:text-2xl font-bold py-4 w-full">
        <IoMdClose
          className="absolute ml-2 md:ml-8 text-lg md:text-xl hover:text-primary cursor-pointer"
          onClick={() => setIsListOpen(false)}
        />
        Airbnb Your Home!
      </h1>
      <hr />
      <h1 className="my-4 font-extrabold text-lg md:text-xl">
        Share Some Basic About Your Place{' '}
      </h1>
      <h6 className="text-slate-500 my-2 ">What Amenities Do You Have?</h6>

      <div className=" h-3/5 2xl:h-2/3 overflow-y-scroll scrollbar rounded-md pr-2">
        <div className="flex justify-between gap-4 sm:gap-12 items-center my-4">
          <div className="grow">
            <h1 className="font-bold text-xl">Guests</h1>
            <h1 className="text-sm sm:text-lg text-balance text-slate-500 ">
              How Many guests Do You Allow?
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="rounded-full text-slate-500 border border-slate-500 px-2.5 text-2xl font-bold hover:bg-primary hover:text-white"
              onClick={() => handleClick('dec', 'guests')}
            >
              -
            </button>
            <h1 className="text-xl">{num?.guests}</h1>
            <button
              className="rounded-full text-slate-500 border border-slate-500 px-2 text-2xl font-bold hover:bg-primary hover:text-white"
              onClick={() => handleClick('inc', 'guests')}
            >
              +
            </button>
          </div>
        </div>
        <hr className="w-full" />
        <div className="flex justify-between gap-4 sm:gap-12 items-center my-4">
          <div className="grow">
            <h1 className="font-bold text-xl">Rooms</h1>
            <h1 className="text-sm sm:text-lg text-balance text-slate-500 ">
              How Many Rooms Do You Have?
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="rounded-full text-slate-500 border border-slate-500 px-2.5 text-2xl font-bold hover:bg-primary hover:text-white"
              onClick={() => handleClick('dec', 'rooms')}
            >
              -
            </button>
            <h1 className="text-xl">{num?.rooms}</h1>
            <button
              className="rounded-full text-slate-500 border border-slate-500 px-2 text-2xl font-bold hover:bg-primary hover:text-white"
              onClick={() => handleClick('inc', 'rooms')}
            >
              +
            </button>
          </div>
        </div>
        <hr className="w-full" />
        <div className="flex justify-between gap-4 sm:gap-12 items-center my-4">
          <div className="grow">
            <h1 className="font-bold text-xl">Bathrooms</h1>
            <h1 className="text-sm sm:text-lg text-balance text-slate-500">
              How Many Bathrooms Do You Have?
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="rounded-full text-slate-500 border border-slate-500 px-2.5 text-2xl font-bold hover:bg-primary hover:text-white"
              onClick={() => handleClick('dec', 'bathrooms')}
            >
              -
            </button>
            <h1 className="text-xl">{num?.bathrooms}</h1>
            <button
              className="rounded-full text-slate-500 border border-slate-500 px-2 text-2xl font-bold hover:bg-primary hover:text-white"
              onClick={() => handleClick('inc', 'bathrooms')}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4 gap-4">
        <Button
          name="Back"
          onClick={() => router.push('?createList=page2')}
          type={'three'}
        />
        <Button name="Next" onClick={() => handleSubmit()} type={'two'} />
      </div>
    </div>
  );
}
