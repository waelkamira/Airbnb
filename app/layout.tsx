import type { Metadata } from 'next';
import './globals.css';
import { Nunito } from 'next/font/google';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import { Toaster } from 'react-hot-toast';
import AuthContext from '../components/context//AuthContext';

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone ',
};
const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthContext>
          <Toaster />
          <Navbar />
          <Categories />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
