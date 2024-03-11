'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
export default function Logo() {
  return (
    <div className="relative h-8 w-32">
      <Image
        src={'/images/logo.png'}
        alt="logo"
        layout="fill"
        objectFit="contain"
        className="hidden md:block cursor-pointer "
      />
    </div>
  );
}
