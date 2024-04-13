'use client';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import toast from 'react-hot-toast';
import Loading from '../Loading';
export default function createListPage6({ setIsListOpen }) {
  const [price, setPrice] = useState();
  const router = useRouter();

  useEffect(() => {
    if (window !== 'undefined') {
      const listValues = JSON.parse(localStorage.getItem('listValues'));
      if (listValues?.price !== undefined) {
        setPrice(listValues?.price);
      }
    }
  }, []);

  function handleClick() {
    if (price === undefined) {
      toast.error('Price Cant Not Be Empty!');
      return;
    }

    if (window !== 'undefined') {
      const listValues = JSON.parse(localStorage.getItem('listValues'));
      localStorage.setItem(
        'listValues',
        JSON.stringify({
          ...listValues,
          price: +price,
        })
      );

      const promise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/createList', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...listValues, price: +price }),
        });
        if (response.ok) {
          resolve();
          localStorage.removeItem('listValues');
          console.log(response);
          setIsListOpen(false);
          router.push('/');
        } else {
          reject();
        }
      });

      toast.promise(promise, {
        loading: <Loading />,
        success: 'Success Creating List',
        error: 'Something Went Wrong, Please Try Again',
      });
    }
  }

  return (
    <div
      className="bg-white rounded-lg p-4 sm:w-2/3 xl:w-1/3 max-w-[575px] min-w-[300px] z-50"
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
        Now, Set Your Price!
      </h1>
      <h6 className="text-slate-500 my-2 ">
        How much Do You Charge Per Night?
      </h6>
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Input
            label={'price'}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            symbol="$ "
            type={'number'}
          />
        </div>
      </div>
      <div className="flex justify-between mt-4 gap-4 w-full">
        <Button
          name="Back"
          onClick={() => router.push('?createList=page5')}
          type={'three'}
        />
        <Button name="Create" onClick={() => handleClick()} type={'two'} />
      </div>
    </div>
  );
}
