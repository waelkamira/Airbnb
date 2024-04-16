'use client';
import countries from 'world-countries';
import Select from 'react-select';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import dynamic from 'next/dynamic';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
//?وهي افضل مكتبة للحصول على معلومات جميع البلدان من اسم و خطوط طول وعرض التي سوف نحتاجها world-countries هنا احتجنا لتنصيب مكتبتين
//? في الخرائط لاحقا بالاضافة الى الاعلام و اللغات ومعلومات اخرى كثيرة
//?له خواص مفيدة Select component و هي عبارة عن react-select و ايضا مكتبة
//?هنا استخدمنا العادي منها Select component يوجد عدة انواع ل
//?وهو مفيد جدا عند التعامل مع بيانات ضخمة فلا يقوم بجلب الا البيانات التي نبحث عنها AsynchronousSelect مثل

export default function Countries() {
  const router = useRouter();
  //? onChange في خيار setState عن طريق state لتحديد القيمة الافتراضية وتحديث هذه ال  state يجب عمل
  const [selectedCountry, setSelectedCountry] = useState('');

  router.push(`?createList=page2`);
  //? objects يجب ان يكتبوا بهذه الطريقة على شكل options الخيارات
  //?formattedCountries اسمها array نريد فقط هذه البيانات والتي نضعها في  countries لاننا لانريد جلب كل البيانات من
  const formattedCountries = countries.map((country) => ({
    value: country?.cca2,
    name: country?.name?.common,
    flag: country?.flag,
    region: country?.region,
    latlng: country?.latlng,
  }));

  useEffect(() => {
    if (window !== 'undefined') {
      const listValues = JSON.parse(localStorage.getItem('listValues'));

      if (listValues === null) {
        return;
      }
      setSelectedCountry(listValues?.location);
    }
  }, []);

  // //?hook لعمل بحث على القيمة التي سوف نمررها لهذا ال hook هنا قمنا بعمل
  // const {
  //   getAllCountries,
  // } = () => {
  //   const getAllCountries = () => formattedCountries;
  //   const getCountryByValue = (value) => {
  //     return formattedCountries.find((country) => country.value === value);
  //   };
  //   return {
  //     getAllCountries,
  //     getCountryByValue,
  //   };
  // };

  //?them prop هذا خاض بتعديل شكل ولون العنصر كله لتغيير اللون الاساسي للتحديد ويتغير معه لون البوردر يجب وضعها في
  function customTheme(theme) {
    return {
      ...theme,
      // borderRadius: 0,
      colors: {
        ...theme.colors,
        primary: '#F16667',
        primary25: '#FBCCCC',
      },
    };
  }

  //?styles prop بالطبع يوجد خيارات أخرى كثيرة يجب وضعها في options لتغيير لون خلفية ال
  // const colorStyles = {
  //   option: (styles) => {
  //     return {
  //       ...styles,
  //       backgroundColor: '#FFFFFF',
  //        borderRadius: 20,
  //     };
  //   },
  // };

  //? حتى نمنع تحميل الكموبننت الكبيرة الا عند الحاجة اليها عند الضغط على زر او غيره لجلب البيانات من قاعدة البيانات او من موقع الخ dynamic نستخدم
  //? مما يقلل من ملفات الجافا سكربت المحملة او المراد عمل رندر لها دون حاجة وقد يقوم المستخدم بالضغط عليها او لا
  //? view port حيث لايتم عمل رندر للصورة الا اذا كانت في ال Image component في lazy loading ممايزيد من سرعة التطبيق تشبه عمل
  //?بشكل ديناميكي Map قمنا باستيراد
  //?client side لأننا نريد أن نقوم بعمل رندر لكافة الكومبوننت على server side باستثناء الخريطة نريد عمل رندر لها على
  //? Map في كومبوننت ال use client لذلك قمنا بوضع

  const LazyMap = dynamic(() => import('./map/Map'), {
    ssr: false,
    loading: () => <Loading />,
  });

  function handleClick() {
    if (selectedCountry === '' || selectedCountry === undefined) {
      toast.error('Please Select Your Country!');
      return;
    }

    if (window !== 'undefined') {
      const listValues = JSON.parse(localStorage.getItem('listValues'));
      toast.success('Success!');
      localStorage.setItem(
        'listValues',
        JSON.stringify({
          ...listValues,
          location: selectedCountry,
        })
      );
    }
    router.push('?createList=page3');
  }

  return (
    <div className="flex flex-col items-start w-full">
      <Select
        className="relative text-xl z-10 top-2 w-full"
        placeholder={selectedCountry?.name || 'anywhere'}
        autoFocus
        isClearable
        isSearchable
        defaultValue={selectedCountry}
        onChange={setSelectedCountry}
        options={formattedCountries}
        // styles={colorStyles}
        theme={customTheme}
        //?بالطريقة المطلوبة options نستطيع اظهار العناصر ال formatOptionLabel باستخدام الخاصية
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
      <div className="mt-8 z-0 w-full">
        <LazyMap latlng={selectedCountry?.latlng} />
        <div className="flex justify-between gap-4 mt-4">
          <Button
            name="Back"
            onClick={() => router.push('?createList=page1')}
            type={'three'}
          />
          <Button name="Next" onClick={() => handleClick()} type={'two'} />
        </div>
      </div>
    </div>
  );
}
