import React from 'react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
export default function page() {
  const [list, setList] = useState('');
  const { id } = useParams();
  const fetchAllLists = async () => {
    await fetch('/api/createList')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // const list1 = res?.find((list) => list._id === id);
        // setList(list1);
      });
  };

  return <div>list</div>;
}
