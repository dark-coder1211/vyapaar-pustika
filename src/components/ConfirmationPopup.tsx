'use client'

import React from 'react'

interface ConfirmationPopupProps {
  checked: boolean | undefined
  isVisible: boolean
  onConfirm: () => void
  onCancel: () => void
  action: 'verify' | 'unverify'
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ checked, isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 mt-10'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm md:w-full'>
        <h2 className='text-lg font-bold mb-4'>Are you sure you want to {checked ? 'verify' : 'unverify'} this?</h2>
        <div className=''>
          <button
            onClick={onConfirm}
            className='bg-blue-600 text-white px-2 md:px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 mr-2'
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className='bg-rose-400 text-white px-2 md:px-4 py-2 rounded-md hover:bg-red-700 transition duration-200'
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPopup
