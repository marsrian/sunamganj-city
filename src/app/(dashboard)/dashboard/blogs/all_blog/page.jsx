import React from 'react'
import { headers } from 'next/headers';
import AllBlogsData from './components/AllBlogsData';

const fetchBlogInfo = async () =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/blogs`, {
    headers: new Headers(await headers())
  })
  const result = await res.json();
  return result;
}

const AllBlogPage = async () => {
  const data = await fetchBlogInfo();
  return (
    <div>
      <h1 className='text-2xl font-semibold text-center text-gray-900 dark:text-white mt-5'>Blogs Info</h1>
      <AllBlogsData data={data} />
    </div>
  )
}

export default AllBlogPage
