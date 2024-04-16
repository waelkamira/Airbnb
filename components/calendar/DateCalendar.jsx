'use client';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { useState } from 'react';
import React from 'react';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
export default function DateCalendar({ price }) {
  const router = useRouter();
  const session = useSession();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const date = state[0]?.endDate.getDate() - state[0]?.startDate.getDate();
  const days = date + 1;
  const total = days * price;

  async function handleClick() {
    const reservation = JSON.parse(localStorage.getItem('reservation'));
    if (window !== 'undefined') {
      localStorage.setItem(
        'reservation',
        JSON.stringify({
          ...reservation,
          startDate: state[0]?.startDate,
          endDate: state[0]?.endDate,
          total: total,
          days: days,
        })
      );

      try {
        const response = await fetch('/api/reservations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...reservation,
            startDate: state[0]?.startDate,
            endDate: state[0]?.endDate,
            total: total,
            days: days,
          }),
        });

        if (response.ok) {
          toast.success('Your Reservation Completed Successfully');
          router.push('/');
        } else {
          session?.status === 'authenticated'
            ? toast.error('Something Went Wrong Please Try Again!')
            : toast.error('Please Login First!');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="border rounded-lg">
      <h1 className="p-2 font-bold text-lg">
        $ {price} <span className="text-gray-400 text-sm">night</span>
      </h1>
      {/*//? فقط ranges لاظهار واختيار ال DateRange انتبه يوجد انواع مختلفة هنااستخدمنا */}
      <DateRange
        className="w-full border "
        //? اللون الاساسي
        price={price}
        // total={total}
        rangeColors={['#FE5B60']}
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        //? اظهار و اخفاء عرض التاريخ
        showDateDisplay={false}
      />

      <h1 className="flex justify-between p-2 font-bold text-lg">
        total days: <span>{days}</span>
      </h1>
      <h1 className="flex justify-between p-2 font-bold text-lg">
        total price: <span>$ {total}</span>
      </h1>
      <div className="p-2">
        <Button name={'Reserve'} type={'two'} onClick={() => handleClick()} />
      </div>
    </div>
  );
}
