'use client';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import toast from 'react-hot-toast';

export default function CreateListPage5({ setIsListOpen }) {
  const [values, setValues] = useState({
    title: '',
    description: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (window !== 'undefined') {
      const listValues = JSON.parse(localStorage.getItem('listValues'));
      setValues({
        title: listValues?.title,
        description: listValues?.description,
      });
    }
  }, []);

  function handleClick() {
    if (values?.title === undefined || values?.description === undefined) {
      toast.error('Title And Description Cant Not Be Empty!');
      return;
    }

    if (window !== 'undefined') {
      const listValues = JSON.parse(localStorage.getItem('listValues'));
      toast.success('Success!');
      localStorage.setItem(
        'listValues',
        JSON.stringify({
          ...listValues,
          title: values?.title,
          description: values?.description,
        })
      );
    }

    router.push('?createList=page6');
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
        How Would You Describe Your Place?
      </h1>
      <h6 className="text-slate-500 my-2 ">Short And Sweet Work Best! </h6>
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Input
            label={'title'}
            value={values?.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </div>
        <div className="relative w-full">
          <Input
            label={'description'}
            value={values?.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex justify-between mt-4 gap-4 w-full">
        <Button
          name="Back"
          onClick={() => router.push('?createList=page4')}
          type={'three'}
        />
        <Button name="Next" onClick={() => handleClick()} type={'two'} />
      </div>
    </div>
  );
}
