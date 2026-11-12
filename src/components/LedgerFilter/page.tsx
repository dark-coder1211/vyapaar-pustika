import React, { useEffect, useState } from 'react'
import SiteHelpComponent from '../HelpBox/sitehelp'
import type { LedgerFilters } from '@/app/(dashboard)/reports/ledger/Ledger_modal'
import PartyHelpComponent from '../HelpBox/partyhelp'
import AccountGroupHelpComponent from '../HelpBox/accountgrouphelp'

// Define the component props type
interface LedgerFilterProps {
  onApplyFilter: (filters: LedgerFilters) => void
  filterData: LedgerFilters
}

const LedgerFilter: React.FC<LedgerFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<LedgerFilters>({
    StrFromDate: filterData.StrFromDate || '',
    StrToDate: filterData.StrToDate || '',
    Site_Code: filterData.Site_Code || '',
    Site_Name: filterData.Site_Name || '',
    StrDistributorCode: filterData.StrDistributorCode || '',
    StrDistributorName: filterData.StrDistributorName || '',
    AccountCode: filterData.AccountCode || '',
    AccountName: filterData.AccountName || '',
    AccountGroupCode: filterData.AccountGroupCode || '',
    AccountGroupName: filterData.AccountGroupName || ''
  })

  useEffect(() => {
    if (!filterData.StrFromDate && !filterData.StrToDate) {
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
        ToDate: today.toISOString().split('T')[0]
      }))
    }
  }, [filterData.StrFromDate, filterData.StrToDate])

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
      StrFromDate: formatDate(firstDayOfMonth),
      StrToDate: today.toISOString().split('T')[0],
      Site_Name: '',
      Site_Code: '',
      StrDistributorCode: '',
      StrDistributorName: '',
      AccountCode: '',
      AccountName: '',
      AccountGroupCode: '',
      AccountGroupName: ''
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
              value={filters.StrFromDate}
              onChange={e => handleChange('StrFromDate', e.target.value)}
              className='form-datepicker px-2 w-full rounded border border-stroke h-8 bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-black '>To Date</label>
            <input
              type='date'
              value={filters.StrToDate}
              onChange={e => handleChange('StrToDate', e.target.value)}
              className='form-datepicker px-2 w-full rounded border border-stroke h-8 bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <PartyHelpComponent
            filters={filters}
            handleChange={handleChange}
            StrNature={['customer', 'agent']}
            filterKey='AccountCode'
            nameKey='AccountName'
            isMulti={true}
            label='Account Name'
            showButton={false}
          />

          <PartyHelpComponent
            filters={filters}
            handleChange={handleChange}
            StrNature={['customer', 'agent']}
            filterKey='StrDistributorCode'
            nameKey='StrDistributorName'
            isMulti={true}
            label='Distributor'
            showButton={false}
          />
        </div>

        {/* Column 3 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <AccountGroupHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='AccountGroupCode'
            nameKey='AccountGroupName'
            label='Account Group Name'
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

export default LedgerFilter
