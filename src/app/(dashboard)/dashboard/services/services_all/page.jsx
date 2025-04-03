import React from 'react'
import AllServicesData from './components/AllServicesData';
import { headers } from 'next/headers';

const fetchServiceInfo = async () =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/services`, {
    headers: new Headers(await headers())
  })
  const result = await res.json();
  return result;
}

const AllServicesInfoPage = async () => {
 const data = await fetchServiceInfo();
  return (
    <div>
      <h1 className='text-2xl font-semibold text-center text-gray-900 dark:text-white mt-5'>Services Info</h1>
      <AllServicesData data={data} />
    </div>
  )
}

export default AllServicesInfoPage
