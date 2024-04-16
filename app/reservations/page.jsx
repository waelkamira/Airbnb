'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Button from '../../components/Button';
import { ListRendering } from '../../components/ListRendering';
import Skelton from '../../components/Skelton';
export default function Reservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const response = await fetch('/api/reservations')
      .then((res) => res.json())
      .then((res) => {
        setReservations(res);
      });
  };

  async function handleClick(reservation) {
    const response = await fetch('/api/reservations', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation),
    });
    if (response.ok) {
      toast.success('This Property Deleted');
      fetchReservations();
    } else {
      toast.error('Something Went Wrong Please Try Again!');
    }
  }

  return (
    <div className="p-8">
      <div>
        {reservations?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 mt-64">
            <h1 className="text-md sm:text-2xl">
              You Don't Have Any Reservation Yet!
            </h1>
            <h1 className="text-md sm:text-2xl text-gray-400">Go Back </h1>
            <Link href={'/'} className={'w-1/5'}>
              <div>
                <Button name={'Home'} type={'two'} />
              </div>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 p-4">
          {reservations?.length > 0 &&
            reservations.map((reservation) => (
              <div className="border rounded-lg p-2">
                <ListRendering
                  href={`/reservations/${reservation?._id}`}
                  key={reservation?.title}
                  image={reservation?.image}
                  flag={reservation?.location?.value}
                  locationName={reservation?.location?.name}
                  locationRegion={reservation?.location?.region}
                  category={reservation?.category}
                  price={reservation?.price}
                  onClick={() => handleFavorite(reservation)}
                  list={reservation}
                  startDate={reservation?.startDate}
                  endDate={reservation?.endDate}
                />
                <div onClick={() => handleClick(reservation)}>
                  <Button name={'Cancel Reservation'} type={'two'} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
