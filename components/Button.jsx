'use client';
export default function Button({ name, type, onClick }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={
        type === 'one'
          ? 'p-2 bg-primary rounded-md text-lg text-nowrap text-white hover:bg-red-500 font-bold w-full py-4 hover:shadow-lg border border-gray-400 outline hover:outline-gray-300'
          : '' || type === 'two'
          ? 'p-2 w-full bg-primary text-lg text-nowrap rounded-md text-white font-bold hover:bg-red-500 border hover:border-gray-300 hover:shadow-lg'
          : '' || type === 'three'
          ? 'p-2 w-full  rounded-md text-lg text-nowrap font-bold hover:bg-gray-400 hover:text-white border hover:border-gray-300 hover:shadow-lg'
          : ''
      }
    >
      {name}
    </button>
  );
}
