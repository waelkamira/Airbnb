'use client';
import { useEffect, useState } from 'react';
import { ListRendering } from '../../components/ListRendering';
import toast from 'react-hot-toast';
import Button from '../../components/Button';
import Link from 'next/link';

export default function page() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchAllLists();
  }, []);

  const fetchAllLists = async () => {
    await fetch('/api/createList')
      .then((res) => res.json())
      .then((res) => {
        const myFavorites = res?.filter((list) => list.favorite === true);
        setLists(myFavorites);
      });
  };

  async function handleFavorite(list) {
    const response = await fetch('/api/createList', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...list, favorite: !list?.favorite }),
    });

    if (response.ok) {
      if (list?.favorite === false) {
        toast.success('Added To Your Favorites List');
      } else {
        toast.success('Removed From Your Favorites List');
      }
      fetchAllLists();
    } else {
      toast.error('Something Went Wrong, Please Try Again!');
    }
  }
  return (
    <>
      <h1 className="p-4">List Of Places You Have Favorited!</h1>
      {lists?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 mt-64">
          <h1 className="text-md sm:text-2xl">
            You Didn't Favorite Any List Yet!
          </h1>
          <h1 className="text-md sm:text-2xl text-gray-400">Go Back </h1>
          <Link href={'/'} className={'w-1/5'}>
            <div>
              <Button name={'Home'} type={'two'} />
            </div>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 p-8">
        {lists?.length > 0 &&
          lists.map((list) => (
            <ListRendering
              href={`/allLists/${list?._id}`}
              key={list?.title}
              image={list?.image}
              locationName={list?.location?.name}
              locationRegion={list?.location?.region}
              category={list?.category}
              price={list?.price}
              onClick={() => handleFavorite(list)}
              flag={list?.location?.value}
              list={list}
            />
          ))}
      </div>
    </>
  );
}
