import React, { useEffect, useState } from 'react'
import type { POFilterData } from '../interfaces/page'
import PartyHelp from '../HelpBox/partyhelp'
import PurchaseOrderNoHelp from '../HelpBox/purchaseorderNohelp'
import ItemNameHelpComponent from '../HelpBox/itemhelp'
import ItemGroupHelpComponent from '../HelpBox/itemgroup'
import ItemCategoryHelpComponent from '../HelpBox/itemcat'
import SiteHelpComponent from '../HelpBox/sitehelp'
import TransactionTypeHelpComponent from '../HelpBox/transactiontype'

// Define the component props type
interface PendingPOFilterProps {
  onApplyFilter: (filters: POFilterData) => void
  filterData: POFilterData
}

const PendingPOFilter: React.FC<PendingPOFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<POFilterData>({
    StrOrderNo: filterData.StrOrderNo || '',
    StrOrderNoValue: filterData.StrOrderNoValue || '',
    StrPartyCode: filterData.StrPartyCode || '',
    StrPartyName: filterData.StrPartyName || '',
    StrItemCode: filterData.StrItemCode || '',
    StrItemName: filterData.StrItemName || '',
    StrItemGroup: filterData.StrItemGroup || '',
    StrItemGroupName: filterData.StrItemGroupName || '',
    StrItemCat: filterData.StrItemCat || '',
    StrItemCatName: filterData.StrItemCatName || '',
    StrSiteName: filterData.StrSiteName || '',
    StrSiteNameValue: filterData.StrSiteNameValue || '',
    StrTransactionType: filterData.StrTransactionType || '', // Default to 0 if undefined
    StrTransactionTypeValue: filterData.StrTransactionTypeValue || '',
    StrAsOnDate: filterData.StrAsOnDate || ''
  })

  // useEffect(() => {
  //   // Set default dates on initial load
  //   const today = new Date()

  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     StrAsOnDate: today.toISOString().split('T')[0]
  //   }))
  // }, [])

  useEffect(() => {
    // Set default dates on initial load
    const today = new Date()
    if (!filterData.StrAsOnDate) {
      setFilters(prevFilters => ({
        ...prevFilters,
        StrAsOnDate: today.toISOString().split('T')[0]
      }))
    }
  }, [filterData.StrAsOnDate])

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
      StrOrderNo: '',
      StrOrderNoValue: '',
      StrPartyCode: '',
      StrPartyName: '',
      StrItemCode: '',
      StrItemName: '',
      StrItemGroup: '',
      StrItemGroupName: '',
      StrItemCat: '',
      StrItemCatName: '',
      StrSiteName: '',
      StrSiteNameValue: '',
      StrTransactionType: '',
      StrTransactionTypeValue: '',
      StrAsOnDate: today.toISOString().split('T')[0]
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
              value={filters.StrAsOnDate}
              onChange={e => handleChange('StrAsOnDate', e.target.value)}
              className='form-datepicker px-2 w-full rounded border border-stroke h-8 bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
            />
          </div>

          <PurchaseOrderNoHelp
            filters={filters}
            handleChange={handleChange}
            filterKey='StrOrderNo'
            nameKey='StrOrderNoValue'
            isMulti={true}
            label='Order No.'
          />

          <PartyHelp
            filters={filters}
            handleChange={handleChange}
            StrNature='supplier'
            filterKey='StrPartyCode'
            nameKey='StrPartyName'
            isMulti={true}
            label='Party Name'
            showButton={false}
          />
        </div>

        {/* Column 2 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          
          <ItemNameHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='StrItemCode'
            nameKey='StrItemName'
            isMulti={true}
            label='Item Name'
            showButton={false}
          />
          <ItemGroupHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='StrItemGroup'
            nameKey='StrItemGroupName'
            isMulti={true}
            label='Item Group'
          />

           <ItemCategoryHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='StrItemCat'
            nameKey='StrItemCatName'
            isMulti={true}
            label='Item Category'
          />
        </div>

        {/* Column 3 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
         
          <SiteHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='StrSiteName'
            nameKey='StrSiteNameValue'
            isMulti={true}
            label='Site Name'
          />
          <TransactionTypeHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='StrTransactionType'
            nameKey='StrTransactionTypeValue'
            StrCondition=' '
            isMulti={true}
            label='Transaction Type'
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

export default PendingPOFilter
