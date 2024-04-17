'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Image from 'next/image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { IoMdClose } from 'react-icons/io';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
export default function RegisterPage() {
  const [isOpen, setIsOpen] = useState(true);
  const session = useSession();
  const router = useRouter();
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  if (session?.status === 'authenticated') {
    router.push('/');
  }
  async function onSubmit() {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getValues()),
      });

      if (response.ok) {
        toast.success('Success');
        router.push('/login');
      } else {
        setError('email', {
          type: 'custom',
          message: 'this email is already exist try to login',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {isOpen && (
        <div
          className="flex justify-center items-center inset-0 bg-black/20 h-full p-4 absolute z-50"
          onClick={() => {
            setIsOpen(false);
            router.push('/');
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-2/3 xl:w-1/3 bg-white flex flex-col items-center justify-start rounded-xl p-2"
          >
            <h1 className="relative text-center text-2xl font-bold p-4 w-full">
              <IoMdClose
                className="absolute ml-2 mt-3 md:ml-8 text-xl hover:text-primary cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  router.push('/');
                }}
              />
              Register
            </h1>

            <div className="p-2 w-full">
              <hr className="w-full my-4 px-4" />
            </div>
            <div className="relative flex flex-col p-2 text-2xl w-full">
              <input
                className="peer transition-all duration-300 placeholder-transparent grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:border-primary outline-none rounded-md px-2 pt-6"
                {...register('email')}
                type="text"
                name="email"
                id="email"
                placeholder="email"
              />
              <label className="absolute peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-7 peer-focus:top-4 peer-focus:text-sm transition-all duration-300 top-4 left-4 text-sm text-gray-400">
                Email
              </label>
              {/* <Input label={'email'} /> */}
              {errors?.email && (
                <h1 className={'p-1 my-2 bg-red-600 text-white w-fit'}>
                  {errors.email.message}
                </h1>
              )}
            </div>
            <div className="relative flex flex-col p-2 text-2xl w-full">
              <input
                className="peer transition-all duration-300 placeholder-transparent grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:border-primary outline-none rounded-md px-2 pt-6"
                {...register('name')}
                type="text"
                name="name"
                id="name"
                placeholder="name"
              />
              <label className="absolute text-sm top-4 left-4 peer-placeholder-shown:text-xl peer-placeholder-shown:top-7 peer-focus:text-sm peer-focus:top-4 text-gray-400 transition-all duration-300 ">
                Name
              </label>
              {/* <Input label={'name'} /> */}
            </div>
            <div className="relative flex flex-col p-2 text-2xl w-full">
              <input
                className="peer transition-all duration-300 placeholder-transparent grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:border-primary outline-none rounded-md px-2 pt-6"
                {...register('password')}
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <label className="absolute text-sm top-4 left-4 peer-placeholder-shown:text-xl peer-placeholder-shown:top-7 peer-focus:text-sm peer-focus:top-4 text-gray-400 transition-all duration-300 ">
                Password
              </label>
              {/* <Input label={'password'} /> */}
              {errors?.password && (
                <h1 className={'p-1 my-2 bg-red-600 text-white w-fit'}>
                  {errors.password.message}
                </h1>
              )}
            </div>
            <div className="flex flex-col p-2 text-lg w-full mt-2">
              <Button name={'Register'} type={'one'} />
            </div>
            <div className="p-2 w-full">
              <hr className="w-full my-4 px-4" />
            </div>
            <div
              onClick={() => signIn('google')}
              className="p-2 w-full mb-2 cursor-pointer "
            >
              <div className="flex items-center justify-between w-full p-2 text-lg border-2 border-gray-300 border-solid outline-none rounded-md hover:shadow-md">
                <div className="relative h-10 w-10 overflow-hidden">
                  <Image
                    src={'/images/google.png'}
                    layout="fill"
                    objectFit="contain"
                    alt={'google'}
                  />
                </div>
                <h1 className="text-nowrap grow text-center py-1 font-bold text-gray-500">
                  Sign-Up With Google
                </h1>
              </div>
            </div>
            <div
              onClick={() => signIn('github')}
              className="p-2 w-full mb-2 cursor-pointer "
            >
              <div className="flex items-center justify-between w-full p-2 text-lg border-2 border-gray-300 border-solid outline-none rounded-md hover:shadow-md">
                <div className="relative h-10 w-10 overflow-hidden">
                  <Image
                    src={'/images/github.png'}
                    layout="fill"
                    objectFit="cover"
                    alt={'github'}
                  />
                </div>
                <h1 className="text-nowrap grow text-center py-1 font-bold text-gray-500">
                  Sign-Up With Github
                </h1>
              </div>
            </div>
            <Link href={'/login'}>
              {' '}
              <div className="flex items-center">
                <h1 className="flex peer my-2 text-gray-500 transition-all duration-300">
                  Already Have An Account?
                  <span className="text-primary hover:underline px-2">
                    {' '}
                    Login
                  </span>
                </h1>
                <h1 className="hidden peer-hover:block text-primary transition-all duration-300">
                  ▶▶
                </h1>
              </div>
            </Link>
          </form>
        </div>
      )}
    </>
  );
}
