import React, { useEffect, useState } from 'react'
import type { RRFilterData } from '../interfaces/page'
import ItemNameHelpComponent from '../HelpBox/itemhelp'
import ItemGroupHelpComponent from '../HelpBox/itemgroup'
import DepartmentHelpComponent from '../HelpBox/Depthelp'
import SiteHelpComponent from '../HelpBox/sitehelp'

// Define the component props type
interface PendingRRFilterProps {
  onApplyFilter: (filters: RRFilterData) => void
  filterData: RRFilterData
}

const PendingRRFilter: React.FC<PendingRRFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<RRFilterData>({
    FromDate: filterData.FromDate || '',
    ToDate: filterData.ToDate || '',
    Itemcode: filterData.Itemcode || '',
    ItemName: filterData.ItemName || '',
    ItemGroupcode: filterData.ItemGroupcode || '',
    ItemGroupName: filterData.ItemGroupName || '',
    departmentname: filterData.departmentname || '',
    departmentcode: filterData.departmentcode || '',
    sitecode: filterData.sitecode || '',
    sitename: filterData.sitename || ''
  })

  // useEffect(() => {
  //   // Set default dates on initial load
  //   const today = new Date()
  //   const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  //   const formatDate = (date: Date) => {
  //     const year = date.getFullYear()
  //     const month = String(date.getMonth() + 1).padStart(2, '0')
  //     const day = String(date.getDate()).padStart(2, '0')
  //     return `${year}-${month}-${day}`
  //   }
  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     FromDate: formatDate(firstDayOfMonth),
  //     ToDate: today.toISOString().split('T')[0]
  //   }))
  // }, [])

  const handleFilterSubmit = () => {
    onApplyFilter(filters)
  }

  useEffect(() => {
    // Set default dates on initial load
    const today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const formatDate = (date: Date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    if (!filterData.FromDate && !filterData.ToDate) {
      setFilters(prevFilters => ({
        ...prevFilters,
        FromDate: formatDate(firstDayOfMonth),
        ToDate: today.toISOString().split('T')[0]
      }))
    }
  }, [filterData.FromDate, filterData.ToDate])

  const handleChange = (field: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value
    }))
  }

  const handleCancel = () => {
    const today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const formatDate = (date: Date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    setFilters(prev => ({
      ...prev,
      FromDate: formatDate(firstDayOfMonth),
      ToDate: today.toISOString().split('T')[0],
      Itemcode: '',
      ItemName: '',
      ItemGroupcode: '',
      ItemGroupName: '',
      departmentname: '',
      departmentcode: '',
      sitecode: '',
      sitename: ''
    }))
  }

  return (
    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mt-4'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        {/* Column 1 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium text-black '>From Date</label>
            <input
              type='date'
              value={filters.FromDate}
              onChange={e => handleChange('FromDate', e.target.value)}
              className='form-datepicker px-2 w-full rounded border border-stroke h-8 bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
            />
          </div>

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

        {/* Column 2 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <ItemGroupHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='ItemGroupcode'
            nameKey='ItemGroupName'
            isMulti={true}
            label='Item Group'
          />
          <DepartmentHelpComponent<RRFilterData>
            filters={filters}
            handleChange={handleChange}
            filterKey='departmentcode'
            nameKey='departmentname'
            isMulti={false}
            label={<>Department</>}
          />
        </div>

        {/* Column 3 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <ItemNameHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='Itemcode'
            nameKey='ItemName'
            isMulti={true}
            label='Item Name'
            showButton={false}
          />
          <SiteHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='sitecode'
            nameKey='sitename'
            isMulti={true}
            label='Site Name'
          />
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

export default PendingRRFilter
