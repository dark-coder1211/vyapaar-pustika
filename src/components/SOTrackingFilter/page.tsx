import React, { useEffect, useState } from 'react'
import type { SOFilterData } from '../interfaces/page'
import SOHelp from '../HelpBox/SONoHelp'
import PartyHelp from '../HelpBox/partyhelp'
import ItemNameHelpComponent from '../HelpBox/itemhelp'
import BFHelpComponent from '../HelpBox/bfhelp'
import GSMHelpComponent from '../HelpBox/gsmhelp'
import WidthHelpComponent from '../HelpBox/widthhelp'
import LengthHelpComponent from '../HelpBox/lengthhelp'

interface PendingPOFilterProps {
  onApplyFilter: (filters: SOFilterData) => void
  filterData: SOFilterData
}

const SOTrackingFilter: React.FC<PendingPOFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<SOFilterData>({
    StrfromDate: filterData.StrfromDate || '',
    StrToDate: filterData.StrToDate || '',
    StrSaleOrderNo: filterData.StrSaleOrderNo || '',
    StrOrderNoValue: filterData.StrOrderNoValue || '',
    StrPartyCode: filterData.StrPartyCode || '',
    StrPartyName: filterData.StrPartyName || '',
    StrDealerCode: filterData.StrDealerCode || '',
    StrDealerName: filterData.StrDealerName || '',
    StrConsigneeCode: filterData.StrConsigneeCode || '',
    StrConsigneeName: filterData.StrConsigneeName || '',
    StrItemCode: filterData.StrItemCode || '',
    StrItemName: filterData.StrItemName || '',
    StrBFCode: filterData.StrBFCode || '',
    StrBFName: filterData.StrBFName || '',
    StrGSMCode: filterData.StrGSMCode || '',
    StrGSMName: filterData.StrGSMName || '',
    StrWidth: filterData.StrWidth || '',
    StrLength: filterData.StrLength || ''
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
    setFilters(prevFilters => ({
      ...prevFilters,
      StrfromDate: formatDate(firstDayOfMonth),
      StrToDate: today.toISOString().split('T')[0]
    }))
  }, [])

  const handleFilterSubmit = () => {
    onApplyFilter(filters)
  }

  const handleChange = (field: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value
    }))
  }

  useEffect(() => {
    // Sync filters state with parent filterData whenever filterData changes
    setFilters(filterData)
  }, [filterData])

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
      StrfromDate: formatDate(firstDayOfMonth),
      StrToDate: today.toISOString().split('T')[0],
      StrSaleOrderNo: '',
      StrOrderNoValue: '',
      StrPartyCode: '',
      StrPartyName: '',
      StrDealerCode: '',
      StrDealerName: '',
      StrConsigneeCode: '',
      StrConsigneeName: '',
      StrItemCode: '',
      StrItemName: '',
      StrBFCode: '',
      StrBFName: '',
      StrGSMCode: '',
      StrGSMName: '',
      StrWidth: '',
      StrLength: ''
    }))
  }

  return (
    <div className='p-4'>
      <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mt-2'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {/* Section 1: Date & Order */}
          <div className='flex flex-col gap-4 p-4 rounded border border-stroke bg-white dark:border-strokedark dark:bg-boxdark'>
            <div>
              <label className='block text-sm font-medium text-black '>From Date</label>
              <input
                type='date'
                name='StrfromDate'
                value={filters.StrfromDate}
                onChange={e => handleChange('StrfromDate', e.target.value)}
                className='form-datepicker w-full h-8 px-2 rounded border border-stroke bg-transparent dark:border-form-strokedark dark:bg-form-input'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-black '>To Date</label>
              <input
                type='date'
                name='StrToDate'
                value={filters.StrToDate}
                onChange={e => handleChange('StrToDate', e.target.value)}
                className='form-datepicker w-full h-8 px-2 rounded border border-stroke bg-transparent dark:border-form-strokedark dark:bg-form-input'
              />
            </div>
            <SOHelp
              filters={filters}
              handleChange={handleChange}
              filterKey='StrSaleOrderNo'
              nameKey='StrOrderNoValue'
              isMulti={true}
              label='Order No.'
            />
            <PartyHelp
              filters={filters}
              handleChange={handleChange}
              StrNature={['customer', 'agent']}
              filterKey='StrPartyCode'
              nameKey='StrPartyName'
              isMulti={true}
              label='Party Name'
              showButton={false}
            />
          </div>

          {/* Section 2: Party Info */}
          <div className='flex flex-col gap-4 p-4 rounded border border-stroke bg-white dark:border-strokedark dark:bg-boxdark'>
            <PartyHelp
              filters={filters}
              handleChange={handleChange}
              StrNature={['customer', 'agent']}
              filterKey='StrDealerCode'
              nameKey='StrDealerName'
              isMulti={true}
              label='Dealer Name'
              showButton={false}
            />
            <PartyHelp
              filters={filters}
              handleChange={handleChange}
              StrNature={['customer', 'agent']}
              filterKey='StrConsigneeCode'
              nameKey='StrConsigneeName'
              isMulti={true}
              label='Consignee'
              showButton={false}
            />
            <ItemNameHelpComponent
              filters={filters}
              handleChange={handleChange}
              filterKey='StrItemCode'
              nameKey='StrItemName'
              isMulti={true}
              label='Item Name'
              showButton={false}
            />
            <GSMHelpComponent
              filters={filters}
              handleChange={handleChange}
              filterKey='StrGSMCode'
              nameKey='StrGSMName'
              isMulti={true}
              label='GSM Name'
            />
          </div>

          {/* Section 3: Item Info */}
          <div className='flex flex-col gap-4 p-4 rounded border border-stroke bg-white dark:border-strokedark dark:bg-boxdark'>
            <BFHelpComponent
              filters={filters}
              handleChange={handleChange}
              filterKey='StrBFCode'
              nameKey='StrBFName'
              isMulti={true}
              label='BF Name'
            />
            <WidthHelpComponent
              filters={filters}
              handleChange={handleChange}
              filterKey='StrWidth'
              nameKey='StrWidth'
              isMulti={true}
              label='Width'
            />
            <LengthHelpComponent
              filters={filters}
              handleChange={handleChange}
              filterKey='StrLength'
              nameKey='StrLength'
              isMulti={true}
              label='Length'
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

export default SOTrackingFilter
