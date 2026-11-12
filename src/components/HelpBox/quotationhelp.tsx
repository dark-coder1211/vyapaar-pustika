import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { QuotationNoHelp } from '@/app/action/filteraction' // Adjust the import path
import { useParams } from '@/context/paramcontext'

// Interface for the data returned by QuotationNoHelp API
interface QuotationHelp {
  DocId: string
  QuotNo: string
}

// Select option format for react-select
interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

// Props interface for QuotationNoHelp component
interface QuotationNoHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T // Corresponds to DocId in data
  nameKey: keyof T // Corresponds to QuotNo in data
  isMulti?: boolean
  label: React.ReactNode
  StrSupplierCode?: string // API parameter
}

const QuotationNoHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label,
  StrSupplierCode
}: QuotationNoHelpComponentProps<T>) => {
  const [options, setOptions] = useState<QuotationHelp[]>([])
  const [loaded, setLoaded] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  useEffect(() => {
    if (!loaded && StrSupplierCode) {
      QuotationNoHelp(Site_Code as string, companyid as string, bu as string, StrSupplierCode)
        .then((data: QuotationHelp[]) => {
          setOptions(data)
          setLoaded(true)
        })
        .catch(err => {
          console.error('Failed to fetch quotation help:', err)
          alert('Error loading quotation options. Please try again.')
        })
    }
  }, [loaded, StrSupplierCode])

  // Extract selected labels as array (assuming string comma-separated)
  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  // Map QuotNo to DocId for lookup
  const nameToCodeMap = new Map(options.map(item => [item.QuotNo, item.DocId]))
  const nameSet = new Set(options.map(item => item.QuotNo))

  // Create react-select options
  const selectOptions: SelectOption[] = options.map(item => ({
    value: item.DocId,
    label: item.QuotNo
  }))

  // Prepare selected options for react-select value
  const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
    value: nameToCodeMap.get(label) ?? label,
    label,
    isDisabled: !nameSet.has(label)
  }))

  // Handle select change
  const handleSelectChange = (selected: MultiValue<SelectOption> | SingleValue<SelectOption>) => {
    if (isMulti) {
      const multi = selected as MultiValue<SelectOption>
      const values = multi.map(opt => opt.value).join(',')
      const labels = multi.map(opt => opt.label).join(',')

      handleChange(filterKey, values as T[typeof filterKey])
      handleChange(nameKey, labels as T[typeof nameKey])
    } else {
      const single = selected as SingleValue<SelectOption>
      const label = single?.label ?? ''
      const value = single?.value ?? ''

      handleChange(filterKey, value as T[typeof filterKey])
      handleChange(nameKey, label as T[typeof nameKey])
    }
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black '>{label}</label>
      <Select
        id='quotationNoHelpSelect'
        value={selectedOptions}
        onChange={handleSelectChange}
        isMulti={isMulti}
        isClearable={true}
        options={selectOptions}
        isOptionDisabled={option => option.isDisabled ?? false}
        className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
      />
    </div>
  )
}

export default QuotationNoHelpComponent
