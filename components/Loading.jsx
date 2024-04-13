'use client';
import React from 'react';
import { BsGear } from 'react-icons/bs';

export default function Loading() {
  return (
    <div className="flex justify-center items-center text-xl gap-4">
      <BsGear className="animate-spin text-primary" />
      Loading ...
    </div>
  );
}
