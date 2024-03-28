'use client';

import { TbBeach, TbPool } from 'react-icons/tb';
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCaveEntrance,
  GiForestCamp,
  GiCactus,
  GiBarn,
} from 'react-icons/gi';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { CiMountain1 } from 'react-icons/ci';
import { MdDownhillSkiing } from 'react-icons/md';
import { BiSolidCastle } from 'react-icons/bi';
import { FaRegSnowflake } from 'react-icons/fa';
import { IoDiamond } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';

const icons = [
  { icon: <TbBeach />, title: 'Beaches' },
  { icon: <GiWindmill />, title: 'Windmills' },
  { icon: <HiOutlineHomeModern />, title: 'Modern' },
  { icon: <CiMountain1 />, title: 'Countryside' },
  { icon: <TbPool />, title: 'Pools' },
  { icon: <GiIsland />, title: 'Islands' },
  { icon: <GiBoatFishing />, title: 'Lake' },
  { icon: <MdDownhillSkiing />, title: 'Skiing' },
  { icon: <BiSolidCastle />, title: 'Castles' },
  { icon: <GiCaveEntrance />, title: 'Caves' },
  { icon: <GiForestCamp />, title: 'Camping' },
  { icon: <FaRegSnowflake />, title: 'Arctic' },
  { icon: <GiCactus />, title: 'Desert' },
  { icon: <GiBarn />, title: 'Barns' },
  { icon: <IoDiamond />, title: 'Lux' },
];
export default function Categories() {
  const searchParams = useSearchParams();
  const router = useRouter();
  function handleClick(category) {
    router.push(`?category=${category}`);
  }

  return (
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
  );
}
