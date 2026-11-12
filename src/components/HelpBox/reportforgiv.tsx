import React, { useState } from 'react'
import Select from 'react-select'
import type {  SingleValue } from 'react-select'
import { useParams } from '@/context/paramcontext'
import { ReportForHelpGateVsInvoice } from '@/app/action/filteraction'

interface ReportType {
  Code: string
  Name: string
}

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface ReportHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  label: React.ReactNode
}

const ReportHelpGVIComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  label
}: ReportHelpComponentProps<T>) => {
  const [report, setReport] = useState<ReportType[]>([])
  const [loading, setLoading] = useState(false)
  const { companyid, bu } = useParams()

  const fetchReportHelp = async () => {
    setLoading(true)
    try {
      const res = await ReportForHelpGateVsInvoice(companyid as string, bu as string)
      setReport(res)
    } catch (err) {
      console.error('Error fetching transaction types:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleMenuOpen = () => {
    fetchReportHelp()
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const fetchedOptions: SelectOption[] = report.map(vt => ({
    value: vt.Code,
    label: vt.Name
  }))

  const descriptionToCodeMap = new Map(report.map(vt => [vt.Name, vt.Code]))
  const descriptionSet = new Set(report.map(vt => vt.Name))

  const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
    value: descriptionToCodeMap.get(label) ?? label,
    label: label,
    isDisabled: !descriptionSet.has(label)
  }))

  const handleSelectChange = (selected: SingleValue<SelectOption>) => {
    handleChange(filterKey, (selected?.value ?? '') as T[typeof filterKey])
    handleChange(nameKey, (selected?.label ?? '') as T[typeof nameKey])
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black'>{label}</label>
      <Select
        id='report-help-gatevsinvoice'
        value={selectedOptions}
        onChange={handleSelectChange}
        onMenuOpen={handleMenuOpen} // <-- Fetch latest data here
        isClearable={true}
        options={fetchedOptions}
        isOptionDisabled={option => option.isDisabled ?? false}
        isLoading={loading}
        className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
      />
    </div>
  )
}

export default ReportHelpGVIComponent
