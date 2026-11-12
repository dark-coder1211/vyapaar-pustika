'use client'

import React, { useState } from 'react'

import { usePathname } from 'next/navigation'
import  type { FilterComponentProps } from './interfaces/page'
import { IoMdAdd } from 'react-icons/io'
import { FaSearch } from 'react-icons/fa'
import { MdExitToApp } from 'react-icons/md'
import secureLocalStorage from 'react-secure-storage'
import { useRouter } from 'next/navigation'

const FilterComponent: React.FC<FilterComponentProps> = ({
  searchTerm,
  StrAsOnDate,
  StrFromDate,
  StrToDate,
  selectedParty,
  selectedPendingorder,
  parties,
  onSearchChange,
  onAsOnDateChange,
  onFromDateChange,
  onToDateChange,
  onPartyChange,
  onPendingOrderChange,
  onFilter,
  onAddOrder
}) => {
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(false) // Step 1: Modal visibility state

  const router = useRouter()
  const closeModal = () => setIsModalOpen(false) // Step 3: Close modal function

  const segments = pathname.split('/')
  const endpoint = segments[segments.length - 1]

  const handleBack = () => {
    secureLocalStorage.removeItem('status')
    router.push('/dashboardpage/')
  }


  return (
    <>
      {/* Top Bar */}
      <div className='flex justify-between rounded-lg shadow-lg shadow-blue-500/50 mt-1'>
        {/* Action Button */}
        
          <button
            onClick={onAddOrder}
            className='cursor-pointer border border-transparent rounded-md text-white bg-blue-500 hover:bg-blue-500'
          >
            <div className='flex items-center md:w-22'>
              <IoMdAdd size={16} />
              <span className='md:m-1 md:font-bold font-semibold'>Order</span>
            </div>
          </button>

        {/* Back Button */}
        <div onClick={handleBack} className='rotate-180 text-blue-400  cursor-pointer'>
          <MdExitToApp size={25} />
        </div>
      </div>

      {/* Filter Row */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between p-1 rounded-lg md:max-w-1234px'>
        {/* Date Inputs */}
        <div className='flex gap-2 items-center mt-2 md:mt-0'>
          {endpoint === 'OrderTracking' ? (
            <input
              type='date'
              value={StrAsOnDate}
              onChange={onAsOnDateChange}
              className='w-36  border border-gray-300 form-input px-2 py-1 md:py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500'
            />
          ) : (
            <>
              <input
                type='date'
                value={StrFromDate}
                onChange={onFromDateChange}
                className='w-36  border border-gray-300 form-input px-2 py-1 md:py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500'
              />
              <input
                type='date'
                value={StrToDate}
                onChange={onToDateChange}
                className='w-36  border border-gray-300 form-input px-2 py-1 md:py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500'
              />
            </>
          )}

          {endpoint !== 'OrderStatus' && (
            <button
              onClick={onFilter}
              className='px-2 py-2 border border-transparent text-base font-bold rounded-md text-white bg-blue-500 hover:bg-blue-500'
            >
              <FaSearch style={{ width: '28px' }} />
            </button>
          )}
        </div>

        {/* Search & Filters */}
        <div className='flex flex-row items-center gap-2 mt-2 md:mt-0'>
          {/* Pending Order Filter */}
          {endpoint !== 'LedgerDisplay' && endpoint !== 'SalesReport' && (
            <select
              value={selectedPendingorder}
              onChange={onPendingOrderChange}
              className=' border border-gray-300 rounded-lg form-input px-2 py-1 md:py-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='Pending'>Pending</option>
              <option value='Non Pending'>Non Pending</option>
              <option value='All'>All</option>
            </select>
          )}

          {endpoint === 'LedgerDisplay' && (
            <select
              value={selectedPendingorder}
              onChange={onPendingOrderChange}
              className=' border border-gray-300 rounded-lg form-input px-2 py-1 md:py-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>Search By pending Status</option>
              <option value='A'>All</option>
              <option value='P'>Pending Show Un-Adjusted</option>
              <option value='C'>Full Adjusted</option>
              <option value='PU'>Un-Adjusted Only</option>
            </select>
          )}

          {/* Search Box */}
          <input
            type='text'
            placeholder={'Search SO No.'}
            value={searchTerm}
            onChange={onSearchChange}
            className=' form-input px-2 py-1 md:py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        {/* Party Select */}
        <div className='flex items-center gap-2 mt-2 md:mt-0'>
          <div className='w-full max-w-xs truncate'>
            <select
              value={selectedParty}
              onChange={onPartyChange}
              className='w-full truncate  form-input px-2 py-1 md:py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>Search By Party</option>
              {parties?.map((party, index) => (
                <option key={index} value={party.Name} className='truncate'>
                  {party.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 animate-fadeIn'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transform scale-95 animate-scaleUp'>
            <h2 className='text-xl font-semibold text-gray-800 text-center mb-7'>No Data Available to Export</h2>
            <div className='flex justify-center'>
              <button
                onClick={closeModal}
                className='bg-blue-400 text-white px-4 py-1 rounded-md font-semibold hover:bg-blue-700 transition duration-200'
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FilterComponent
