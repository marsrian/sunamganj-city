import BlogForm from '@/components/form/BlogForm'
import React from 'react'

export const metadata = {
  title: "Add Blog",
  description:
    "Explore Sunamganj: Culture, festivals, nature, and community updates. Get the latest from this beautiful corner of Sylhet.",
};

const AddBlogPage = () => {
  return (
    <div>
      <h1 className='text-lg text-center text-gray-900 dark:text-white font-medium mt-4'>Add Blog</h1>
      <BlogForm />
    </div>
  )
}

export default AddBlogPage
