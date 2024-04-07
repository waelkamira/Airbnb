'use client';
import React from 'react';
import GearIcon from '@rsuite/icons/Gear';

export default function Loading() {
  return (
    <div className="animate-pulse flex justify-center items-center text-xl gap-4">
      <GearIcon spin style={{ fontSize: '1em' }} />
      Is Loading...
    </div>
  );
}
