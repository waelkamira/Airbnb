'use client';
import icons from './Icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Categories() {
  const session = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  function handleClick(category) {
    router.push(`?category=${category}`);
  }

  return (
    <>
      {session?.status === 'authenticated' && (
        <div className="flex justify-between md:px-20 scrollbar overflow-x-auto border-b">
          {icons.map((item) => {
            return (
              <div
                onClick={() => handleClick(item.title)}
                className={
                  (item.title === searchParams.get('category')
                    ? 'text-primary border-t-2 2xl:border-b-2 border-primary'
                    : 'text-gray-400') +
                  ' flex flex-col items-center justify-center p-4 hover:text-primary cursor-pointer '
                }
                key={item.title}
              >
                <h1 className="text-3xl">{item.icon}</h1>
                <h1>{item.title}</h1>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
