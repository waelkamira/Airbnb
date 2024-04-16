'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Skelton from '../../../components/Skelton';
import Map from '../../../components/map/Map';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import toast from 'react-hot-toast';
import ImageUpload from '../../../components/ImageUpload';
import Button from '../../../components/Button';

export default function page() {
  const [list, setList] = useState('');
  const [updateValues, setUpdateValues] = useState({
    newPrice: null,
    newDescription: null,
  });
  const { id } = useParams();

  useEffect(() => {
    fetchAllLists();
  }, []);

  const fetchAllLists = async () => {
    await fetch('/api/properties')
      .then((res) => res.json())
      .then((res) => {
        const list = res?.find((list) => list._id === id);
        setList(list);
        setUpdateValues({
          newPrice: list?.price,
          newDescription: list?.description,
        });
      });
  };

  async function updatePrice() {
    const response = await fetch('/api/properties', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...list,
        price: updateValues?.newPrice,
        description: updateValues?.newDescription,
      }),
    });
    if (response.ok) {
      toast.success('Updated Successfully!');
    } else {
      toast.error('Something Went Wrong Please Try Again!');
    }
  }

  return (
    <div className={'flex justify-center mt-14 px-4 w-full h-fit '}>
      {!list && <Skelton />}
      {list && (
        <div className="flex flex-col justify-start items-start w-full sm:w-2/3 2xl:w-1/2 h-full p-4 ">
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
          <div className="relative w-full rounded-lg overflow-hidden h-full">
            <div>
              <ImageUpload className={'absolute z-50'} image={list?.image} />
            </div>
          </div>
          <div className={'w-full '}>
            <h1 className="mt-2 text-gray-500 text-md font-bold">
              {list?.guests} guests {list?.rooms} rooms {list?.bathrooms}{' '}
              bathrooms {list?.category}
            </h1>
            <div className="flex flex-col md:flex-row gap-4 py-2">
              <input
                className={
                  'text-lg font-bold border border-solid rounded-md p-2 lg:grow'
                }
                value={updateValues?.newPrice ?? list?.price}
                placeholder="$"
                name="price"
                onChange={(e) =>
                  setUpdateValues({ ...updateValues, newPrice: e.target.value })
                }
              />
              <div className="lg:w-1/3 w-full ">
                <Button
                  name={'update price'}
                  type={'two'}
                  onClick={() => updatePrice()}
                />
              </div>
            </div>

            <h1 className={'pt-4 text-lg font-bold'}>description:</h1>
            <div className="flex flex-col md:flex-row gap-4 py-2">
              <input
                className={'text-lg border border-solid rounded-md p-2 lg:grow'}
                value={updateValues?.newDescription ?? list?.description}
                placeholder="description"
                name="description"
                onChange={(e) =>
                  setUpdateValues({
                    ...updateValues,
                    newDescription: e.target.value,
                  })
                }
              />
              <div className="lg:w-1/3 w-full">
                <Button
                  name={'update description'}
                  type={'two'}
                  onClick={() => updatePrice()}
                />
              </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row gap-8 w-full my-2">
              <div className="w-full lg:w-1/2 mb-8 rounded-lg overflow-hidden">
                <Map latlng={list?.location?.latlng} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
