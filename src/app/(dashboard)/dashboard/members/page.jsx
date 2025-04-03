import { headers } from 'next/headers'
import React from 'react'
import AllUserInfo from './components/AllUserInfo';

const fetchUserInfo = async () =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users`, {
    headers: new Headers(await headers())
  })
  const result = await res.json();
  return result;
}

const DashboardPage = async () => {
  const data = await fetchUserInfo();
  return (
    <div>
      <h1 className='text-2xl font-semibold text-center text-gray-900 dark:text-white mt-5'>Users Info</h1>
      <AllUserInfo data={data} />
    </div>
  )
}

export default DashboardPage
