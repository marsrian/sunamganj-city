import EventForm from '@/components/form/EventForm'
import React from 'react'

const AddNewsPage = () => {
  return (
    <div>
      <h1 className='text-lg text-center text-gray-900 dark:text-white font-medium mt-4'>Add Event</h1>
      <EventForm />
    </div>
  )
}

export default AddNewsPage
