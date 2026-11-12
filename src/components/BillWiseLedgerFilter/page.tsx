import React, { useEffect, useState } from 'react'
import SiteHelpComponent from '../HelpBox/sitehelp'
import PartyHelpComponent from '../HelpBox/partyhelp'
import AccountGroupHelpComponent from '../HelpBox/accountgrouphelp'
import ReportOnHelpComponent from '../HelpBox/reportonhelp'
import type { BillWiseLedgerFilters } from '@/app/(dashboard)/reports/billwiseledger/BillWiseLedger_modal'

// Define the component props type
interface BillWiseLedgerFilterProps {
  onApplyFilter: (filters: BillWiseLedgerFilters) => void
  filterData: BillWiseLedgerFilters
}

const BillWiseLedgerFilter: React.FC<BillWiseLedgerFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<BillWiseLedgerFilters>({
    AsOnDate: filterData.AsOnDate || '',
    Site_Code: filterData.Site_Code || '',
    Site_Name: filterData.Site_Name || '',
    DistributorCode: filterData.DistributorCode || '',
    DistributorName: filterData.DistributorName || '',
    AccountCode: filterData.AccountCode || '',
    AccountName: filterData.AccountName || '',
    AccountGroupCode: filterData.AccountGroupCode || '',
    AccountGroupName: filterData.AccountGroupName || '',
    ReportOn: filterData.ReportOn || '',
    ReportOnName: filterData.ReportOnName || ''
  })

  useEffect(() => {
    if (!filterData.AsOnDate) {
      const today = new Date()

      setFilters(prev => ({
        ...prev,
        AsOnDate: today.toISOString().split('T')[0]
      }))
    }
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
      Site_Name: '',
      Site_Code: '',
      DistributorCode: '',
      DistributorName: '',
      AccountCode: '',
      AccountName: '',
      AccountGroupCode: '',
      AccountGroupName: '',
      ReportOn: '',
      ReportOnName: ''
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
          <ReportOnHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='ReportOn'
            nameKey='ReportOnName'
            label='Report On'
          />
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
            filterKey='DistributorCode'
            nameKey='DistributorName'
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

export default BillWiseLedgerFilter
