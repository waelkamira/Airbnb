'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Skelton from '../../../components/Skelton';
import Map from '../../../components/map/Map';
import DateCalendar from '../../../components/calendar/DateCalendar';
import { useSession } from 'next-auth/react';
export default function page() {
  const [list, setList] = useState('');
  const session = useSession();
  const { id } = useParams();
  useEffect(() => {
    fetchAllLists();
  }, []);

  const fetchAllLists = async () => {
    await fetch('/api/createList')
      .then((res) => res.json())
      .then((res) => {
        const list = res?.find((list) => list._id === id);

        if (list !== undefined) {
          const { _id, ...otherProps } = list;
          const newList = { ...otherProps };
          if (window !== undefined) {
            localStorage.setItem(
              'reservation',
              JSON.stringify({
                ...newList,
                email: session?.data?.user?.email,
              })
            );
          }
          setList(list);
        }
      });
  };

  return (
    <div className={'flex justify-center mt-14 px-4 w-full h-fit'}>
      {!list && <Skelton />}
      {list && (
        <div className="flex flex-col justify-start items-start w-full sm:w-2/3 2xl:w-1/2 h-full p-4">
          <div className="flex items-center justify-center gap-2">
            <Image
              alt={list?.location?.name}
              width={20}
              height={20}
              //? next هنا استخدمنا هذه المكتبة لاظهار ايموجي الاعلام لان الايموجي الموجود لم يعمل مع
              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${list?.location?.value}.svg`}
            />
            <h1 className={'text-xl font-bold text-left w-full'}>
              {list?.location?.name},
              <span className="px-2 text-gray-400 text-sm">
                {list?.location?.region}
              </span>
            </h1>
          </div>
          <div className="relative w-full rounded-lg overflow-hidden min-h-44 sm:min-h-72 md:min-h-96">
            <Image
              src={list?.image}
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-all duration-300 mt-4 h-56 sm:h-96"
            />
          </div>
          <div className={'w-full '}>
            <h1 className="mt-2 text-gray-500 text-md font-bold">
              {list?.guests} guests {list?.rooms} rooms {list?.bathrooms}{' '}
              bathrooms {list?.category}
            </h1>

            <h1 className={'py-4 text-lg font-bold'}>$ {list?.price}</h1>
            <hr />
            <h1 className={'pt-4 text-lg font-bold'}>description:</h1>
            <p className={'py-2'}>{list?.description}</p>

            <div className="flex flex-col-reverse lg:flex-row gap-8 w-full my-2">
              <div className="w-full lg:w-1/2 mb-8 rounded-lg overflow-hidden">
                <Map latlng={list?.location?.latlng} />
              </div>
              <div className="w-full lg:w-1/2">
                <DateCalendar price={list?.price} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
