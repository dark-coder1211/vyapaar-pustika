import React, { useEffect, useState } from 'react'
import ItemNameHelpComponent from '../HelpBox/itemhelp'
import ItemGroupHelpComponent from '../HelpBox/itemgroup'
import SiteHelpComponent from '../HelpBox/sitehelp'
import type { FinishStockSummaryFilterData } from '@/app/(dashboard)/reports/finishstocksummary/FinishStock_modal'
import BFHelpComponent from '../HelpBox/bfhelp'
import GSMHelpComponent from '../HelpBox/gsmhelp'
import WidthHelpComponent from '../HelpBox/widthhelp'
import LengthHelpComponent from '../HelpBox/lengthhelp'
import SizeUnitHelpComponent from '../HelpBox/sizeunithelp'
import GodownHelpComponent from '../HelpBox/godownhelp'

// Define the component props type
interface FinishStockFilterProps {
  onApplyFilter: (filters: FinishStockSummaryFilterData) => void
  filterData: FinishStockSummaryFilterData
}

const FinishStockFilter: React.FC<FinishStockFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<FinishStockSummaryFilterData>({
    FromDate: filterData.FromDate || '',
    ToDate: filterData.ToDate || '',
    ItemName: filterData.ItemName || '',
    ItemCode: filterData.ItemCode || '',
    BFName: filterData.BFName || '',
    BFCode: filterData.BFCode || '',
    GSMName: filterData.GSMName || '',
    GSMCode: filterData.GSMCode || '',
    Width: filterData.Width || '',
    WidthNo: filterData.WidthNo || '',
    Length: filterData.Length || '',
    LengthNo: filterData.LengthNo || '',
    SizeUnit: filterData.SizeUnit || '',
    SizeUnitName: filterData.SizeUnitName || '',
    Site_Code: filterData.Site_Code || '',
    Site_Name: filterData.Site_Name || '',
    Godown: filterData.Godown || '',
    GodownName: filterData.GodownName || '',
    ItemGroupCode: filterData.ItemGroupCode || '',
    ItemGroupName: filterData.ItemGroupName || ''
  })

  // useEffect(() => {
  //   // Set default dates on initial load
  //   const today = new Date()
  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     FromDate: today.toISOString().split('T')[0],
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
      BFName: '',
      BFCode: '',
      GSMName: '',
      GSMCode: '',
      Width: '',
      WidthNo: '',
      Length: '',
      LengthNo: '',
      SizeUnit: '',
      SizeUnitName: '',
      Site_Name: '',
      Site_Code: '',
      Godown: '',
      GodownName: '',
      ItemGroupCode: '',
      ItemGroupName: ''
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
          <ItemGroupHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='ItemGroupCode'
            nameKey='ItemGroupName'
            isMulti={true}
            label='Item Group'
          />

          
        </div>

        {/* Column 2 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <BFHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='BFCode'
            nameKey='BFName'
            isMulti={true}
            label='BF'
          />

          <GSMHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='GSMCode'
            nameKey='GSMName'
            isMulti={true}
            label='GSM'
          />

          <WidthHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='Width'
            nameKey='WidthNo'
            isMulti={true}
            label='Width'
          />

          <LengthHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='Length'
            nameKey='LengthNo'
            isMulti={true}
            label='Length'
          />
        </div>

        {/* Column 3 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <SizeUnitHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='SizeUnit'
            nameKey='SizeUnitName'
            isMulti={true}
            label='Size Unit'
          />

          <GodownHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='Godown'
            nameKey='GodownName'
            label='Godown'
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

export default FinishStockFilter
