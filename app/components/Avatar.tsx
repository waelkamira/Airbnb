import Image from 'next/image';
import React from 'react';

export default function Avatar() {
  return (
    <div className="relative h-8 w-8">
      <Image
        src={'/images/placeholder.jpg'}
        alt="avatar"
        layout="fill"
        objectFit="cover"
        className=" rounded-full"
      ></Image>
    </div>
  );
}
