import React, { useEffect, useState } from 'react'
import SiteHelpComponent from '../HelpBox/sitehelp'
import  type { GateVsInvoiceFilters } from '@/app/(dashboard)/reports/gatevsinvoice/GateVsInvoice_modal'
import PartyHelpComponent from '../HelpBox/partyhelp'
import VoucherTypeHelpComponent from '../HelpBox/vouchertypehelp'
import ReportHelpGVIComponent from '../HelpBox/reportforgiv'
import SaleTypeHelpComponent from '../HelpBox/saletypehelp'

// Define the component props type
interface GateVsInvoiceFilterProps {
  onApplyFilter: (filters: GateVsInvoiceFilters) => void
  filterData: GateVsInvoiceFilters
}

const GateVsInvoiceFilter: React.FC<GateVsInvoiceFilterProps> = ({ onApplyFilter, filterData }) => {
  const [filters, setFilters] = useState<GateVsInvoiceFilters>({
    FromDate: filterData.FromDate || '',
    ToDate: filterData.ToDate || '',
    Site_Code: filterData.Site_Code || '',
    Site_Name: filterData.Site_Name || '',
    PartyCode: filterData.PartyCode || '',
    PartyName: filterData.PartyName || '',
    DealerCode: filterData.DealerCode || '',
    DealerName: filterData.DealerName || '',
    ConsigneeCode: filterData.ConsigneeCode || '',
    ConsigneeName: filterData.ConsigneeName || '',
    VoucherType: filterData.VoucherType || '',
    VoucherName: filterData.VoucherName || '',
    ReportFor: filterData.ReportFor || '',
    ReportForName: filterData.ReportForName || '',
    SaleTypeCode: filterData.SaleTypeCode || '',
    SaleTypeName: filterData.SaleTypeName || ''
  })

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
      Site_Name: '',
      Site_Code: '',
      PartyCode: '',
      PartyName: '',
      DealerCode: '',
      DealerName: '',
      ConsigneeCode: '',
      ConsigneeName: '',
      VoucherType: '',
      VoucherName: '',
      ReportFor: '',
      ReportForName: '',
      SaleTypeCode: '',
      SaleTypeName: ''
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

          <PartyHelpComponent
            filters={filters}
            handleChange={handleChange}
            StrNature={['customer', 'agent']}
            filterKey='PartyCode'
            nameKey='PartyName'
            isMulti={true}
            label='Party Name'
            showButton={false}
          />
        </div>

        {/* Column 2 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <PartyHelpComponent
            filters={filters}
            handleChange={handleChange}
            StrNature={['customer', 'agent']}
            filterKey='DealerCode'
            nameKey='DealerName'
            isMulti={true}
            label='Dealer'
            showButton={false}
          />

          <PartyHelpComponent
            filters={filters}
            handleChange={handleChange}
            StrNature={['customer', 'agent']}
            filterKey='ConsigneeCode'
            nameKey='ConsigneeName'
            isMulti={true}
            label='Consignee'
            showButton={false}
          />

          <ReportHelpGVIComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='ReportFor'
            nameKey='ReportForName'
            label='Report For'
          />
        </div>

        {/* Column 3 */}
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4'>
          <VoucherTypeHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='VoucherType'
            nameKey='VoucherName'
            isMulti={true}
            label='Voucher Type'
            StrCondition="And NCat='Sale' And ActiveYN = 'Y' and Category In ('INV','INVW','SLRTN')"
          />

          <SiteHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='Site_Code'
            nameKey='Site_Name'
            isMulti={true}
            label='Site Name'
          />

          <SaleTypeHelpComponent
            filters={filters}
            handleChange={handleChange}
            filterKey='SaleTypeCode'
            nameKey='SaleTypeName'
            isMulti={true}
            label='Sale Type'
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

export default GateVsInvoiceFilter
