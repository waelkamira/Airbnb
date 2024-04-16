'use client';
import countries from 'world-countries';
import Select from 'react-select';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function Countries() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('');
  const formattedCountries = countries.map((country) => ({
    value: country?.cca2,
    name: country?.name?.common,
    flag: country?.flag,
    region: country?.region,
    latlng: country?.latlng,
  }));

  if (selectedCountry) {
    router.push(`?country=${selectedCountry?.name}`);
  }
  useEffect(() => {
    if (window !== 'undefined') {
      const listValues = JSON.parse(localStorage.getItem('listValues'));
      if (listValues === null) {
        return;
      }
      setSelectedCountry(listValues?.location);
    }
  }, []);

  function customTheme(theme) {
    return {
      ...theme,
      borderRadius: 20,
      textSize: 50,
      colors: {
        ...theme.colors,
        primary: '#F16667',
        primary25: '#FBCCCC',
      },
    };
  }

  const customStyles = {
    option: (styles) => {
      return {
        ...styles,
        borderRadius: '20px',
      };
    },
  };

  return (
    <div className="flex">
      <Select
        className="grow z-50"
        placeholder={selectedCountry?.name || 'Search ... '}
        isClearable
        isSearchable
        defaultValue={selectedCountry}
        onChange={setSelectedCountry}
        options={formattedCountries}
        theme={customTheme}
        styles={customStyles}
        formatOptionLabel={(country) => (
          <div>
            <h6 className="flex items-center gap-2 text-md">
              <span className="relative h-6 w-6">
                <Image
                  alt={country?.name}
                  layout="fill"
                  objectFit="contain"
                  //? next هنا استخدمنا هذه المكتبة لاظهار ايموجي الاعلام لان الايموجي الموجود لم يعمل مع
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country?.value}.svg`}
                />
              </span>
              {country?.name},
              <span className="text-gray-400 text-md">{country?.region}</span>
            </h6>
          </div>
        )}
      />
      {/* <div className=" cursor-pointer bg-primary p-3 rounded-full text-white">
        <FiSearch />
      </div> */}
    </div>
  );
}
