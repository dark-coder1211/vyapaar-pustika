import React, { useEffect, useState } from 'react'
import type { PSOFilterData } from '../interfaces/page'
import PartyHelp from '../HelpBox/partyhelp'
import ItemNameHelpComponent from '../HelpBox/itemhelp'
import SiteHelpComponent from '../HelpBox/sitehelp'
import TransactionTypeHelpComponent from '../HelpBox/transactiontype'
import SOHelp from '../HelpBox/SONoHelp'
import GSMHelpComponent from '../HelpBox/gsmhelp'
import BFHelpComponent from '../HelpBox/bfhelp'
import ZoneHelpComponent from '../HelpBox/zonehelp'
import StatusHelpComponent from '../HelpBox/statushelp'
import OrderTypeHelpComponent from '../HelpBox/ordertypehelp'
import ReportForHelpComponent from '../HelpBox/reportforhelp'
import WidthHelpComponent from '../HelpBox/widthhelp'
import SizeUnitHelpComponent from '../HelpBox/sizeunithelp'

interface PendingPOFilterProps {
  onApplyFilter: (filters: PSOFilterData) => void
  filterData: PSOFilterData
}

const PendingSOFilter: React.FC<PendingPOFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<PSOFilterData>({
    StrBFCode: filterData.StrBFCode || '',
    StrBFName: filterData.StrBFName || '',
    StrVDate: filterData.StrVDate || '',
    StrConsignee: filterData.StrConsignee || '',
    StrConsigneeName: filterData.StrConsigneeName || '',
    StrDealerCode: filterData.StrDealerCode || '',
    StrDealerName: filterData.StrDealerName || '',
    StrGSMCode: filterData.StrGSMCode || '',
    StrGSMName: filterData.StrGSMName || '',
    StrItemCode: filterData.StrItemCode || '',
    StrItemName: filterData.StrItemName || '',
    StrOrderNoValue: filterData.StrOrderNoValue || '',
    StrOrderStatus: filterData.StrOrderStatus || '',
    StrOrderStatusValue: filterData.StrOrderStatusValue || '',
    StrOrderType: filterData.StrOrderType || '',
    StrOrderTypeValue: filterData.StrOrderTypeValue || '',
    StrPartyCode: filterData.StrPartyCode || '',
    StrPartyName: filterData.StrPartyName || '',
    StrReportFor: filterData.StrReportFor || '',
    StrReportForValue: filterData.StrReportForValue || '',
    StrSaleOrderNo: filterData.StrSaleOrderNo || '',
    StrSiteName: filterData.StrSiteName || '',
    StrSiteNameValue: filterData.StrSiteNameValue || '',
    StrSizeUnit: filterData.StrSizeUnit || '',
    StrSizeUnitValue: filterData.StrSizeUnitValue || '',
    StrStatus: filterData.StrStatus || '',
    StrStatusValue: filterData.StrStatusValue || '',
    StrTransactionType: filterData.StrTransactionType || '',
    StrTransactionTypeValue: filterData.StrTransactionTypeValue || '',
    StrWidth: filterData.StrWidth || '',
    StrZoneF: filterData.StrZoneF || '',
    StrZoneValue: filterData.StrZoneValue || '',
  })

  // useEffect(() => {
  //   // Set default dates on initial load
  //   const today = new Date()
  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     StrVDate: today.toISOString().split('T')[0]
  //   }))
  // }, [])

  useEffect(() => {
      // Set default dates on initial load
      const today = new Date()
      if (!filterData.StrVDate) {
        setFilters(prevFilters => ({
          ...prevFilters,
          StrVDate: today.toISOString().split('T')[0]
        }))
      }
    }, [filterData.StrVDate])
  

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
      StrVDate: today.toISOString().split('T')[0],
      StrSaleOrderNo: '',
      StrOrderNoValue: '',
      StrPartyCode: '',
      StrPartyName: '',
      StrDealerCode: '',
      StrDealerName: '',
      StrConsignee: '',
      StrConsigneeName: '',
      StrItemCode: '',
      StrItemName: '',
      StrBFCode: '',
      StrBFName: '',
      StrGSMCode: '',
      StrGSMName: '',
      StrZoneF: '',
      StrZoneValue: '',
      StrStatus: '',
      StrStatusValue: '',
      StrReportFor: '',
      StrReportForValue: '',
      StrOrderStatus: '',
      StrOrderStatusValue: '',
      StrSizeUnit: '',
      StrSizeUnitValue: '',
      StrOrderType: '',
      StrOrderTypeValue: '',
      StrTransactionType: '',
      StrTransactionTypeValue: '',
      StrSiteName: '',
      StrSiteNameValue: '',
      StrWidth: ''
    }))
  }

  return (
    <div>
      <div className='rounded-sm bg-white shadow-default border border-stroke dark:bg-boxdark mt-2 p-4'>
        {/* Filter Fields */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Column 1 */}
          <div className='flex flex-col gap-3 '>
            <div className='rounded-sm bg-white shadow-default border border-stroke dark:bg-boxdark p-4'>
              <div className='flex flex-col gap-4'>
                <div>
                  <label className='block text-sm font-medium text-black'>As On Date</label>
                  <input
                    type='date'
                    id='StrVDate'
                    name='StrVDate'
                    value={filters.StrVDate}
                    onChange={e => handleChange('StrVDate', e.target.value)}
                    className='form-datepicker px-1 w-full rounded border-[1.5px] border-stroke bg-transparent h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    placeholder='DD/MM/YYYY'
                  />
                </div>

                <SOHelp
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
                  StrNature={['customer', 'agent']}
                  filterKey='StrPartyCode'
                  nameKey='StrPartyName'
                  isMulti={true}
                  label='Party Name'
                  showButton={false}
                />

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
                  filterKey='StrConsignee'
                  nameKey='StrConsigneeName'
                  isMulti={true}
                  label='Consignee'
                  showButton={false}
                />
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className='flex flex-col gap-3 '>
            <div className='rounded-sm bg-white shadow-default border border-stroke dark:bg-boxdark p-4'>
              <div className='flex flex-col gap-4'>
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

                <BFHelpComponent
                  filters={filters}
                  handleChange={handleChange}
                  filterKey='StrBFCode'
                  nameKey='StrBFName'
                  isMulti={true}
                  label='BF Name'
                />

                <SiteHelpComponent
                  filters={filters}
                  handleChange={handleChange}
                  filterKey='StrSiteName'
                  nameKey='StrSiteNameValue'
                  isMulti={true}
                  label='Site Name'
                />

                <ZoneHelpComponent
                  filters={filters}
                  handleChange={handleChange}
                  filterKey='StrZoneF'
                  nameKey='StrZoneValue'
                  isMulti={true}
                  label='Zone'
                />

                <StatusHelpComponent
                  filters={filters}
                  handleChange={handleChange}
                  filterKey='StrStatus'
                  nameKey='StrStatusValue'
                  isMulti={true}
                  label='Status'
                />
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className='flex flex-col gap-3 '>
            <div className='rounded-sm bg-white shadow-default border border-stroke dark:bg-boxdark p-4'>
              <div className='flex flex-col gap-4'>
                <OrderTypeHelpComponent
                  filters={filters}
                  handleChange={handleChange}
                  filterKey='StrOrderType'
                  nameKey='StrOrderTypeValue'
                  label='Order Type'
                />

                <ReportForHelpComponent
                  filters={filters}
                  handleChange={handleChange}
                  filterKey='StrReportFor'
                  nameKey='StrReportForValue'
                  label='Report For'
                />

                <WidthHelpComponent
                  filters={filters}
                  handleChange={handleChange}
                  filterKey='StrWidth'
                  nameKey='StrWidth'
                  isMulti={true}
                  label='Width'
                />

                <SizeUnitHelpComponent
                  filters={filters}
                  handleChange={handleChange}
                  filterKey='StrSizeUnit'
                  nameKey='StrSizeUnitValue'
                  isMulti={true}
                  label='Size Unit'
                />

                <TransactionTypeHelpComponent
                  filters={filters}
                  handleChange={handleChange}
                  filterKey='StrTransactionType'
                  nameKey='StrTransactionTypeValue'
                  isMulti={true}
                  label='Transaction Type'
                  showButton={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex justify-end gap-4 m-3'>
        <button
          onClick={handleFilterSubmit}
          className='px-6 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition mt-1 mb-1 mr-1'
        >
          OK
        </button>
        <button
          onClick={handleCancel}
          className='px-6 py-2 rounded bg-gray-500 text-white font-medium hover:bg-gray-600 transition mt-1 mb-1'
        >
          Refresh
        </button>
      </div>
    </div>
  )
}

export default PendingSOFilter
