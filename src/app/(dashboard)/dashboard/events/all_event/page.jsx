import React from 'react'
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import ShowAllEvent from './components/ShowAllEvent';

const fetchEventsInfo = async () =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/events`, {
    headers: new Headers(await headers())
  })
  const result = await res.json();
  return result;
}

const AllEventInfoPage = async () => {
  const data = await fetchEventsInfo();
  const session = await getServerSession(authOptions);
  
    const filteredData = data.filter(event => 
      event.manager_email === session?.user?.email
    );
  return (
    <div>
      <h1 className='text-2xl font-semibold text-center text-gray-900 dark:text-white mt-5'>Services Info</h1>
      <ShowAllEvent data={filteredData} />
    </div>
  )
}

export default AllEventInfoPage
