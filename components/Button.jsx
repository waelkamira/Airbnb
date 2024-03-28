import React from 'react';

export default function Button({ name, style }) {
  return (
    <button
      type="submit"
      className={
        style ||
        'bg-primary rounded-md text-white hover:bg-red-500 font-bold w-full py-4 hover:shadow-lg border border-gray-400 outline hover:outline-gray-300'
      }
    >
      {name}
    </button>
  );
}
