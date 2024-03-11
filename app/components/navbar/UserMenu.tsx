'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useState } from 'react';
import MenuItem from './MenuItem';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer text-nowrap">
          Airbnb Your Home
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
          {isOpen && (
            <div className="absolute p-2 right-0 rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden top-12 bg-white text-sm">
              <MenuItem onClick={() => {}} label={'SignIn'} />
              <MenuItem onClick={() => {}} label={'Sign Up'} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
