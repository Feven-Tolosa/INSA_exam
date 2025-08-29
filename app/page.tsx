// app/page.tsx
'use client'

import { useState } from 'react'
import SearchBar from '@/components/search-bar'
import Modal from '@/components/modal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='min-h-screen bg-gray-100 py-12'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>
          Advanced Frontend Demo
        </h1>

        <div className='mb-12'>
          <h2 className='text-xl font-semibold mb-4 text-center'>
            Debounced Search
          </h2>
          <SearchBar />
        </div>

        <div className='text-center'>
          <h2 className='text-xl font-semibold mb-4'>Reusable Modal</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Open Modal
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title='Example Modal'
        >
          <p className='mb-4'>
            This is a reusable modal component with accessibility features.
          </p>
          <div className='flex justify-end space-x-3'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}
