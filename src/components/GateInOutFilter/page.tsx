import React, { useEffect, useState } from 'react'
import type { GateIn } from '@/app/(dashboard)/reports/gateinreport/GateInReport_modal'

// Define the component props type
interface GateInOutFilterProps {
  onApplyFilter: (filters: GateIn) => void
  filterData: GateIn
}

const GateInOutFilter: React.FC<GateInOutFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<GateIn>({
    FromDate: filterData.FromDate || '',
    ToDate: filterData.ToDate || '',
    LoadType: filterData.LoadType || ''
  })

  useEffect(() => {
    // Set default dates on initial load
    const today = new Date()
    if(!filterData.FromDate && !filterData.ToDate) {
    setFilters(prevFilters => ({
      ...prevFilters,
      FromDate: today.toISOString().split('T')[0],
      ToDate: today.toISOString().split('T')[0]
    }))}
  }, [filterData.FromDate, filterData.ToDate])

  const handleFilterSubmit = () => {
    onApplyFilter(filters)
  }

  const handleChange = (field: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value
    }))
  }

  const handleCancel = () => {
    const today = new Date()
    setFilters(prev => ({
      ...prev,
      FromDate: today.toISOString().split('T')[0],
      ToDate: today.toISOString().split('T')[0]
    }))
  }

  return (
    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mt-4'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        {/* Column 1 */}
        <div className='rounded-sm bg-white shadow-default flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium text-black '>From Date</label>
            <input
              type='date'
              value={filters.FromDate}
              onChange={e => handleChange('FromDate', e.target.value)}
              className='form-datepicker px-2 w-full rounded border border-stroke h-8 bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className='rounded-sm bg-white shadow-default flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium text-black '>To Date</label>
            <input
              type='date'
              value={filters.ToDate}
              onChange={e => handleChange('ToDate', e.target.value)}
              className='form-datepicker px-2 w-full rounded border border-stroke h-8 bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex justify-end gap-4 mt-6'>
        <button
          onClick={handleFilterSubmit}
          className='px-6 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition'
        >
          OK
        </button>
        <button
          onClick={handleCancel}
          className='px-6 py-2 rounded bg-gray-500 text-white font-medium hover:bg-gray-600 transition'
        >
          Refresh
        </button>
      </div>
    </div>
  )
}

export default GateInOutFilter
