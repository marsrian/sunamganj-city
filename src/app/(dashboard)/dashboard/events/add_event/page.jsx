import EventForm from '@/components/form/EventForm'
import React from 'react'

export const metadata = {
  title: "Add Event",
  description:
    "Explore Sunamganj: Culture, festivals, nature, and community updates. Get the latest from this beautiful corner of Sylhet.",
};

const AddNewsPage = () => {
  return (
    <div>
      <h1 className='text-lg text-center text-gray-900 dark:text-white font-medium mt-4'>Add Event</h1>
      <EventForm />
    </div>
  )
}

export default AddNewsPage
