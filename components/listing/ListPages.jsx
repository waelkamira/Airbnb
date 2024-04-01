'use client';
import React, { useState } from 'react';
import CreateListPage1 from './createListPage1';
import CreateListPage2 from './createListPage2';
import { useSearchParams } from 'next/navigation';
export default function ListPages({ isListOpen, setIsListOpen }) {
  const searchParams = useSearchParams();
  return (
    <>
      {isListOpen && (
        <div
          onClick={() => setIsListOpen(false)}
          className="absolute flex justify-center items-center z-50 inset-0 bg-black/20 p-2"
        >
          {searchParams.get('createList') === 'page1' && (
            <CreateListPage1 setIsListOpen={setIsListOpen} />
          )}
          {searchParams.get('createList') === 'page2' && (
            <CreateListPage2 setIsListOpen={setIsListOpen} />
          )}
        </div>
      )}
    </>
  );
}
