'use client';
import Button from '../../components/Button';
import { ListRendering } from '../../components/ListRendering';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
export default function Page() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    await fetch('/api/properties')
      .then((res) => res.json())
      .then((res) => {
        setProperties(res);
      });
  };

  async function handleClick(pro) {
    const response = await fetch('/api/properties', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pro),
    });
    if (response.ok) {
      toast.success('This Property Deleted');
      fetchProperties();
    } else {
      toast.error('Something Went Wrong Please Try Again!');
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 p-8">
      {properties?.length > 0 &&
        properties.map((pro) => (
          <div className="border rounded-lg p-2" key={pro?.title}>
            <ListRendering
              href={`/properties/${pro?._id}`}
              key={pro?.title}
              image={pro?.image}
              flag={pro?.location?.value}
              locationName={pro?.location?.name}
              locationRegion={pro?.location?.region}
              category={pro?.category}
              price={pro?.price}
              onClick={() => handleFavorite(pro)}
              list={pro}
            />
            <div onClick={() => handleClick(pro)}>
              <Button name={'Delete Property'} type={'two'} />
            </div>
          </div>
        ))}
    </div>
  );
}
