'use client';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';
import ImageUpload from '../ImageUpload';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function createListPage4({ setIsListOpen }) {
  const router = useRouter();
  function handleClick() {
    if (window !== 'undefined') {
      const listValues = JSON.parse(localStorage.getItem('listValues'));
      if (listValues?.image === '' || listValues?.image === undefined) {
        toast.error('Please Upload An Image For Your Place!');
        return;
      }
    }
    toast.success('Success!');
    router.push('?createList=page5');
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
        Add a Photo Of Your Place!
      </h1>
      <h6 className="text-slate-500 my-2 ">
        Show Your Guests What Your Place Looks Like!
      </h6>

      <ImageUpload />
      <div className="flex justify-between mt-4 gap-4 w-full">
        <Button
          name="Back"
          onClick={() => router.push('?createList=page3')}
          type={'three'}
        />
        <Button name="Next" onClick={() => handleClick()} type={'two'} />
      </div>
    </div>
  );
}
