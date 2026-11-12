import React, { useEffect, useState } from 'react'
import ItemNameHelpComponent from '../HelpBox/itemhelp'
import ItemGroupHelpComponent from '../HelpBox/itemgroup'
import DepartmentHelpComponent from '../HelpBox/Depthelp'
import CostCenterHelpComponent from '../HelpBox/costcenterhelp'
import type { StoreIssueReceiveFilterData } from '@/app/(dashboard)/reports/storeissuereceive/StoreIssueReceive_modal'
import SiteHelpComponent from '../HelpBox/sitehelp'
import GodownHelpComponent from '../HelpBox/godownhelp'

// Define the component props type
interface StoreIssueFilterProps {
  onApplyFilter: (filters: StoreIssueReceiveFilterData) => void
  filterData: StoreIssueReceiveFilterData
}

const StoreIssueFilter: React.FC<StoreIssueFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<StoreIssueReceiveFilterData>({
    FromDate: filterData.FromDate || '',
    ToDate: filterData.ToDate || '',
    ItemName: filterData.ItemName || '',
    ItemCode: filterData.ItemCode || '',
    ItemGroupCode: filterData.ItemGroupCode || '',
    ItemGroupName: filterData.ItemGroupName || '',
    DepartmentCode: filterData.DepartmentCode || '',
    DepartmentName: filterData.DepartmentName || '',
    CostCenterCode: filterData.CostCenterCode || '',
    CostCenterName: filterData.CostCenterName || '',
    Site_Code: filterData.Site_Code || '',
    Site_Name: filterData.Site_Name || '',
    GodownCode: filterData.GodownCode || '',
    GodownName: filterData.GodownName || ''
  })

  // useEffect(() => {
  //   // Set default dates on initial load
  //   const today = new Date()
  //   const currentYear = today.getFullYear()
  //   const financialYearStart = currentYear - (currentYear % 2 === 0 ? 0 : 1)
  //   const formattedDate = `${financialYearStart}-04-01`
  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     FromDate: formattedDate,
  //     ToDate: today.toISOString().split('T')[0]
  //   }))
  // }, [])

  useEffect(() => {
    if (!filterData.FromDate && !filterData.ToDate) {
      const today = new Date().toISOString().split('T')[0]
      setFilters(prev => ({ ...prev, FromDate: today, ToDate: today }))
    }
  }, [filterData.FromDate, filterData.ToDate])

  const handleFilterSubmit = () => {
    onApplyFilter(filters)
  }

  const handleChange = (field: string, value: string | number) => {
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
      ToDate: today.toISOString().split('T')[0],
      ItemName: '',
      ItemCode: '',
      ItemGroupCode: '',
      ItemGroupName: '',
      DepartmentCode: '',
      DepartmentName: '',
      CostCenterCode: '',
      CostCenterName: '',
      Site_Code: '',
      Site_Name: '',
      GodownCode: '',
      GodownName: ''
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

          <ItemNameHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='ItemCode'
            nameKey='ItemName'
            isMulti={true}
            label='Item Name'
            showButton={false}
          />
        </div>

        {/* Column 2 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <ItemGroupHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='ItemGroupCode'
            nameKey='ItemGroupName'
            isMulti={true}
            label='Item Group'
          />
          <DepartmentHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='DepartmentCode'
            nameKey='DepartmentName'
            isMulti={false}
            label='Department'
          />
          <CostCenterHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='CostCenterCode'
            nameKey='CostCenterName'
            isMulti={false}
            label='Cost Center'
            showButton={false}
          />
        </div>

        {/* Column 3 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <SiteHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='Site_Code'
            nameKey='Site_Name'
            isMulti={true}
            label='Site Name'
          />
          <GodownHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='GodownCode'
            nameKey='GodownName'
            label='Godown'
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

export default StoreIssueFilter
