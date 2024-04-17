'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

export function ListRendering({
  key,
  image,
  href,
  flag,
  locationName,
  locationRegion,
  category,
  price,
  onClick,
  list,
  startDate,
  endDate,
}) {
  return (
    <div className="relative border rounded-lg pb-1 hover:shadow-lg">
      <Link href={href}>
        <div key={key}>
          <div className="relative h-52 w-full rounded-lg overflow-hidden">
            <Image
              alt={locationName}
              src={image}
              fill
              style={{ objectFit: 'cover' }}
              className="hover:scale-110 transition-all"
            />
          </div>
          <div className="p-2">
            <div className="flex gap-2">
              <Image
                alt={locationName}
                width={20}
                height={20}
                //? next هنا استخدمنا هذه المكتبة لاظهار ايموجي الاعلام لان الايموجي الموجود لم يعمل مع
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flag}.svg`}
              />
              <h1 className="text-lg font-bold line-clamp-1">
                {locationName},
                <span className="px-2 text-gray-400 text-[13px]">
                  {locationRegion}
                </span>
              </h1>
            </div>
            <h1 className="text-gray-400 text-sm">{category}</h1>
            {startDate && endDate && (
              <div>
                <h1>
                  <span className="text-gray-500">startDate:</span>{' '}
                  {new Date(startDate)
                    .toLocaleString()
                    .slice(0, -13)
                    .replaceAll('/', '-')}
                </h1>
                <h1>
                  <span className="text-gray-500">endDate:</span>{' '}
                  {new Date(endDate)
                    .toLocaleString()
                    .slice(0, -13)
                    .replaceAll('/', '-')}
                </h1>
              </div>
            )}
            <h1>$ {price} night</h1>
          </div>
        </div>
      </Link>
      <div onClick={onClick} className="text-xl hover:text-2xl">
        <FaHeart
          className={
            (list?.favorite ? 'text-primary' : 'text-gray-300') +
            ' absolute right-2 top-2  z-40 cursor-pointer transition-al '
          }
        />
        <FaRegHeart
          className={
            ' absolute right-2 top-2 z-40 cursor-pointer transition-al text-white '
          }
        />
      </div>
    </div>
  );
}
