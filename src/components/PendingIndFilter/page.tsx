import React, { useEffect, useState } from 'react'
import ItemNameHelpComponent from '../HelpBox/itemhelp'
import ItemGroupHelpComponent from '../HelpBox/itemgroup'
import DepartmentHelpComponent from '../HelpBox/Depthelp'
import type { PendingIndentFilterData } from '@/app/(dashboard)/reports/pendingindent/PendingIndentReport_modal'
import CostCenterHelpComponent from '../HelpBox/costcenterhelp'
import PartyHelpComponent from '../HelpBox/partyhelp'
import IndentNoHelpComponent from '../HelpBox/indent_no_help'

// Define the component props type
interface PendingIndFilterProps {
  onApplyFilter: (filters: PendingIndentFilterData) => void
  filterData: PendingIndentFilterData
}

const PendingIndFilter: React.FC<PendingIndFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<PendingIndentFilterData>({
    AsOnDate: filterData.AsOnDate || '',
    ItemCode: filterData.ItemCode || '',
    ItemName: filterData.ItemName || '',
    ItemGroupCode: filterData.ItemGroupCode || '',
    ItemGroupName: filterData.ItemGroupName || '',
    DepartmentName: filterData.DepartmentName || '',
    Department: filterData.Department || '',
    CostCenterName: filterData.CostCenterName || '',
    CostCenter: filterData.CostCenter || '',
    HODCode: filterData.HODCode || '',
    HODName: filterData.HODName || '',
    IndentDocID: filterData.IndentDocID || '',
    IndentNo: filterData.IndentNo || ''
  })

  // useEffect(() => {
  //   // Set default dates on initial load
  //   const today = new Date()
  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     AsOnDate: today.toISOString().split('T')[0]
  //   }))
  // }, [])

   useEffect(() => {
      // Set default dates on initial load
      const today = new Date()
      if(!filterData.AsOnDate) {
      setFilters(prevFilters => ({
        ...prevFilters,
        AsOnDate: today.toISOString().split('T')[0]
      }))}
    }, [filterData.AsOnDate])

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
      AsOnDate: today.toISOString().split('T')[0],
      ItemCode: '',
      ItemName: '',
      ItemGroupCode: '',
      ItemGroupName: '',
      DepartmentName: '',
      Department: '',
      CostCenterName: '',
      CostCenter: '',
      HODCode: '',
      HODName: '',
      IndentDocID: '',
      IndentNo: ''
    }))
  }

  return (
    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mt-4'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        {/* Column 1 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium text-black '>As On Date</label>
            <input
              type='date'
              value={filters.AsOnDate}
              onChange={e => handleChange('AsOnDate', e.target.value)}
              className='form-datepicker px-2 w-full rounded border border-stroke h-8 bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
            />
          </div>

          <IndentNoHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='IndentDocID'
            nameKey='IndentNo'
            isMulti={false}
            label='Indent No.'
            showButton={false}
          />

          {/* HOD */}
          <PartyHelpComponent
            filters={filters}
            handleChange={handleChange}
            StrNature='Employee'
            filterKey='HODCode'
            nameKey='HODName'
            isMulti={false}
            label='HOD'
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
          <DepartmentHelpComponent<PendingIndentFilterData>
            filters={filters}
            handleChange={handleChange}
            filterKey='Department'
            nameKey='DepartmentName'
            isMulti={false}
            label={<>Department</>}
          />
        </div>

        {/* Column 3 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <ItemNameHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='ItemCode'
            nameKey='ItemName'
            isMulti={true}
            label='Item Name'
            showButton={false}
          />
          <CostCenterHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='CostCenter'
            nameKey='CostCenterName'
            isMulti={false}
            label='Cost Center'
            showButton={false}
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

export default PendingIndFilter
