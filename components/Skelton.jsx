import React from 'react';
import Loading from './Loading';

export default function Skelton() {
  return (
    <>
      <div className={'flex justify-center mt-14 px-4 w-full h-fit'}>
        <div className="flex flex-col items-end items-start w-full sm:w-2/3 2xl:w-1/2 h-full p-4">
          <div className="relative flex items-center justify-center w-full rounded-lg overflow-hidden min-h-44 sm:min-h-72 md:min-h-96 bg-gray-300 animate-pulse">
            <Loading />
          </div>
          <div className={'w-full my-4 rounded-lg bg-gray-300 animate-pulse'}>
            <h1 className="mt-2 h-4 rounded-lg text-gray-500 text-md font-bold bg-gray-300 animate-pulse"></h1>
          </div>
          <h1 className="mt-2 h-4 rounded-lg text-gray-500 text-md font-bold w-1/2 bg-gray-300 animate-pulse"></h1>
          <h1 className="mt-2 h-4 rounded-lg text-gray-500 text-md font-bold w-1/4 bg-gray-300 animate-pulse"></h1>
        </div>
      </div>
    </>
  );
}
