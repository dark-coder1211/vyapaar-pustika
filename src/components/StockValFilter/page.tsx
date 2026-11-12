import React, { useEffect, useState } from 'react'
import ItemNameHelpComponent from '../HelpBox/itemhelp'
import ItemGroupHelpComponent from '../HelpBox/itemgroup'
import type { StockValReportFilterData } from '@/app/(dashboard)/reports/stockreportval/StockReportVal_modal'
import GodownHelpComponent from '../HelpBox/godownhelp'
import ItemCategoryHelpComponent from '../HelpBox/itemcat'
import SiteHelpComponent from '../HelpBox/sitehelp'
import MethodHelpComponent from '../HelpBox/methodhelp'
import ClassificationHelpComponent from '../HelpBox/classificationhelp'
import VarityHelpComponent from '../HelpBox/varityhelp'

// Define the component props type
interface StockValFilterProps {
  onApplyFilter: (filters: StockValReportFilterData) => void
  filterData: StockValReportFilterData
}

const StockValFilter: React.FC<StockValFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<StockValReportFilterData>({
    FromDate: filterData.FromDate || '',
    ToDate: filterData.ToDate || '',
    ItemCode: filterData.ItemCode || '',
    ItemName: filterData.ItemName || '',
    ItemGroupCode: filterData.ItemGroupCode || '',
    ItemGroupName: filterData.ItemGroupName || '',
    GodownCode: filterData.GodownCode || '',
    GodownName: filterData.GodownName || '',
    ItemCategoryCode: filterData.ItemCategoryCode || '',
    ItemCategoryName: filterData.ItemCategoryName || '',
    Site_Code: filterData.Site_Code || '',
    Site_Name: filterData.Site_Name || '',
    Method: filterData.Method || '',
    MethodName: filterData.MethodName || '',
    Classification: filterData.Classification || '',
    ClassificationName: filterData.ClassificationName || '',
    Variety: filterData.Variety || '',
    VarietyName: filterData.VarietyName || ''
  })

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
      ItemCode: '',
      ItemName: '',
      ItemGroupCode: '',
      ItemGroupName: '',
      GodownCode: '',
      GodownName: '',
      ItemCategoryCode: '',
      ItemCategoryName: '',
      Site_Code: '',
      Site_Name: '',
      Method: '',
      MethodName: '',
      Classification: '',
      ClassificationName: '',
      Variety: '',
      VarietyName: ''
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

          <ItemCategoryHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='ItemCategoryCode'
            nameKey='ItemCategoryName'
            isMulti={true}
            label='Item Category'
          />

          <MethodHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='Method'
            nameKey='MethodName'
            label='Method'
          />
        </div>

        {/* Column 2 */}
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

          <ItemGroupHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='ItemGroupCode'
            nameKey='ItemGroupName'
            isMulti={true}
            label='Item Group'
          />

          <VarityHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='Variety'
            nameKey='VarietyName'
            label='Variety'
          />
        </div>

        {/* Column 3 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <GodownHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='GodownCode'
            nameKey='GodownName'
            label='Godown'
          />

          <ClassificationHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='Classification'
            nameKey='ClassificationName'
            label='Classification'
          />

          <SiteHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='Site_Code'
            nameKey='Site_Name'
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

export default StockValFilter
