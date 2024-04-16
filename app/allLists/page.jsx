'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { usePathname, useSearchParams } from 'next/navigation';
import { ListRendering } from '../../components/ListRendering';

export default function AllLists() {
  const [lists, setLists] = useState([]);
  const searchParams = useSearchParams();

  const path = usePathname();
  useEffect(() => {
    fetchAllLists();
  }, [searchParams.get('category'), searchParams.get('country')]);

  const fetchAllLists = async () => {
    await fetch('/api/createList')
      .then((res) => res.json())
      .then((res) => {
        if (searchParams.get('category')) {
          const filteredCategories = res?.filter(
            (item) => item.category === searchParams.get('category')
          );
          setLists(filteredCategories);
        } else if (searchParams.get('country')) {
          const filteredCountries = res.filter(
            (item) => item?.location?.name === searchParams.get('country')
          );

          setLists(filteredCountries);
        } else {
          setLists(res);
        }
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
      {lists?.length > 0 &&
        lists.map((list) => (
          <ListRendering
            href={`/allLists/${list?._id}`}
            key={list?.title}
            image={list?.image}
            flag={list?.location?.value}
            locationName={list?.location?.name}
            locationRegion={list?.location?.region}
            category={list?.category}
            price={list?.price}
            onClick={() => handleFavorite(list)}
            list={list}
          />
        ))}
    </div>
  );
}
