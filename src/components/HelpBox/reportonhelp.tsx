import React, { useState } from 'react'
import Select from 'react-select'
import type {SingleValue } from 'react-select'
import { useParams } from '@/context/paramcontext'
import { ReportOnHelp } from '@/app/action/filteraction'

interface ReportOnType {
  Name: string
  Code: string
}

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface ReportOnHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  label: React.ReactNode
}

const ReportOnHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  label
}: ReportOnHelpComponentProps<T>) => {
  const [reporton, setReporton] = useState<ReportOnType[]>([])
  const [loading, setLoading] = useState(false)
  const { companyid, bu } = useParams()

  const fetchReportOnHelp = async () => {
    setLoading(true)
    try {
      const res = await ReportOnHelp(companyid as string, bu as string)
      setReporton(res)
    } catch (err) {
      console.error('Error fetching transaction types:', err)
      alert('Failed to fetch transaction types. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleMenuOpen = () => {
    fetchReportOnHelp()
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const fetchedOptions: SelectOption[] = reporton.map(vt => ({
    value: vt.Code,
    label: vt.Name
  }))

  const descriptionToCodeMap = new Map(reporton.map(vt => [vt.Name, vt.Code]))
  const descriptionSet = new Set(reporton.map(vt => vt.Name))

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
        id='voucherType'
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

export default ReportOnHelpComponent
