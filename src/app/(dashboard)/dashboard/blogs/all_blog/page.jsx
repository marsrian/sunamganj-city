import React from 'react'
import { headers } from 'next/headers';
import AllBlogsData from './components/AllBlogsData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const fetchBlogInfo = async () =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/blogs`, {
    headers: new Headers(await headers())
  })
  const result = await res.json();
  return result;
}

export const metadata = {
  title: "All Blog",
  description:
    "Explore Sunamganj: Culture, festivals, nature, and community updates. Get the latest from this beautiful corner of Sylhet.",
};

const AllBlogPage = async () => {
  const data = await fetchBlogInfo();
  const session = await getServerSession(authOptions);

  const filteredData = data.filter(blog => 
    blog.writer_email === session?.user?.email
  );
  
  return (
    <div>
      <h1 className='text-2xl font-semibold text-center text-gray-900 dark:text-white mt-5'>Blogs Info</h1>
      <AllBlogsData data={filteredData} />
    </div>
  )
}

export default AllBlogPage
