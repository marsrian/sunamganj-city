import React from 'react'
import { headers } from 'next/headers';
import ShowAllService from './components/ShowAllService';

const fetchEventsInfo = async () =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/events`, {
    headers: new Headers(await headers())
  })
  const result = await res.json();
  return result;
}

const AllEventInfoPage = async () => {
  const data = await fetchEventsInfo();
  return (
    <div>
      <h1 className='text-2xl font-semibold text-center text-gray-900 dark:text-white mt-5'>Services Info</h1>
      <ShowAllService data={data} />
    </div>
  )
}

export default AllEventInfoPage
