'use client';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
//? كيف تعمل
//?نقوم بالخطوات التالية next مع مشروع  cloudinary لربط
//? next-cloudinary تنصيب مكتبة
//?بهذا الشكل .ENV الخاصة بحسابي في cloud وضع اسم ال
//? NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dh2xlutfu"
//? unsigned و نضعه cloudinary على Preset نقوم بعمل

export default function ImageUpload({ image }) {
  const [imageUrl, setImageUrl] = useState(image);

  useEffect(() => {
    if (window !== 'undefined') {
      const listValues = JSON.parse(localStorage.getItem('listValues'));
      if (listValues?.image) {
        //console.log('listValues?.image', listValues?.image);
        setImageUrl(listValues?.image);
      }
    }
  }, []);

  //? useCallback hook باستخدام callback function قمنا باستخدام هذه ال
  //? وذلك للحصول على رابط الصورة التي تم رفعها ونجحت عملية الرفع
  //? لاستخدام هذه الصورة حيثما نريد cloudinary على سيرفر
  //? onSuccess prop حيث نقوم بتمرير هذه الدالة الى ال
  const handleUploadSuccess = useCallback(
    (result) => {
      if (window !== 'undefined') {
        //console.log(result.info.secure_url);
        const listValues = JSON.parse(localStorage.getItem('listValues'));
        localStorage.setItem(
          'listValues',
          JSON.stringify({
            ...listValues,
            image: result.info.secure_url,
          })
        );
      }
      setImageUrl(result.info.secure_url);
    },
    [setImageUrl]
  );
  return (
    <div>
      <CldUploadWidget
        uploadPreset="oylvqubu"
        onSuccess={handleUploadSuccess}
        //? عدد الصور التي يستطيع المستخدم تحميلها في المرة الواحدة
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open()}
              className="relative flex flex-col justify-center items-center h-56 md:h-96 w-full border border-dashed cursor-pointer"
            >
              {imageUrl && (
                <div className="h-full w-full">
                  <Image src={imageUrl} fill style={{ objectFit: 'contain' }} />
                </div>
              )}
              {!imageUrl && (
                <>
                  {' '}
                  <BiImageAdd size={50} />
                  <h1>Add Image</h1>
                </>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
