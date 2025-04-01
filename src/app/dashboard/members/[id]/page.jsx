import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react'
import SingleUserRoleUpdate from './components/SingleUserRoleUpdate';

const SingleUserInfoPage = async ({params}) => {
    const p = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${p.id}`, {
        headers: new Headers(await headers())
    })
    const data = await res.json();
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-16 mt-6">
      <Image
        src="/assets/niladri.webp"
        width={500}
        height={500}
        alt="login"
        className="rounded-[10px] md:h-[520px]"
      />
      <div className="p-4 border border-[#D0D0D0] rounded-[10px] w-full md:w-[611px]">
        <h1 className="text-[#444] text-center text-2xl font-semibold">
          Update Role
        </h1>
        <SingleUserRoleUpdate data={data} />
      </div>
    </div>
  )
}

export default SingleUserInfoPage
