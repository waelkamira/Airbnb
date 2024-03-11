'use client';
import React from 'react';
import { Container } from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

export default function Navbar() {
  return (
    <div className="fixed w-full z-10 shadow-sm bg-white">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex justify-between items-center gap-4 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
}
