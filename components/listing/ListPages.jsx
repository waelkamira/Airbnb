'use client';

import { useSession } from 'next-auth/react';
import CreateListPage1 from './createListPage1';
import CreateListPage2 from './createListPage2';
import CreateListPage3 from './createListPage3';
import CreateListPage4 from './createListPage4';
import CreateListPage5 from './createListPage5';
import CreateListPage6 from './createListPage6';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ListPages({ isListOpen, setIsListOpen }) {
  const searchParams = useSearchParams();
  const session = useSession();
  const router = useRouter();

  if (window !== 'undefined') {
    window.onbeforeunload = () => {
      localStorage.removeItem('listValues');
    };
  }

  if (!session?.data?.user) {
    router.push('/login');
    return;
  }

  return (
    <>
      {isListOpen && session?.status === 'authenticated' && (
        <div
          onClick={() => {
            setIsListOpen(false);
            if (window !== 'undefined') {
              localStorage.removeItem('listValues');
            }
          }}
          className="absolute flex justify-center items-center z-50 inset-0 bg-black/20 p-2"
        >
          {searchParams.get('createList') === 'page1' && (
            <CreateListPage1 setIsListOpen={setIsListOpen} />
          )}
          {searchParams.get('createList') === 'page2' && (
            <CreateListPage2 setIsListOpen={setIsListOpen} />
          )}
          {searchParams.get('createList') === 'page3' && (
            <CreateListPage3 setIsListOpen={setIsListOpen} />
          )}
          {searchParams.get('createList') === 'page4' && (
            <CreateListPage4 setIsListOpen={setIsListOpen} />
          )}
          {searchParams.get('createList') === 'page5' && (
            <CreateListPage5 setIsListOpen={setIsListOpen} />
          )}
          {searchParams.get('createList') === 'page6' && (
            <CreateListPage6 setIsListOpen={setIsListOpen} />
          )}
        </div>
      )}
    </>
  );
}
