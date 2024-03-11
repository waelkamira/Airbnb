'use client';

import React from 'react';
import { CiSearch } from 'react-icons/ci';

export default function Search() {
  return (
    <div className="flex border-[1px] w-fit m:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex justify-between items-center ">
        <div className="text-[12px] sm:text-sm font-semibold sm:px-6 px-2 text-nowrap border-r ">
          Any Where
        </div>
        <div className="text-[12px] sm:text-sm font-semibold sm:px-6 px-2 text-nowrap border-r ">
          Any Week
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="text-[12px] sm:text-sm font-semibold sm:px-6 px-2 text-nowrap ">
          Add Guests
        </div>
        <div className="bg-red-500 rounded-full text-white text-xl p-2 mx-2 font-bold">
          <CiSearch />
        </div>
      </div>
    </div>
  );
}
