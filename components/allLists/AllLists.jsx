'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function AllLists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchAllLists();
  }, []);

  const fetchAllLists = async () => {
    await fetch('/api/createList')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLists(res);
      });
  };

  return (
    <div className="flex flex-wrap gap-4">
      {lists?.length > 0 &&
        lists.map((list) => (
          <Link href={`/allLists/${list?._id}`}>
            <div key={list?.title}>
              <div className="relative h-32 w-48 rounded-lg overflow-hidden">
                <Image src={list?.image} fill style={{ objectFit: 'cover' }} />
              </div>
              <h1>
                {list?.location?.name},
                <span className="px-2 text-gray-400 text-sm">
                  {list?.location?.region}
                </span>
              </h1>
              <h1 className="text-gray-400 text-sm">{list?.category}</h1>
              <h1>$ {list?.price}</h1>
            </div>
          </Link>
        ))}
    </div>
  );
}
