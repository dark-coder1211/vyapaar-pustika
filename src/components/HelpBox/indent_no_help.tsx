import React, { useState } from 'react'
import Select from 'react-select'
import { IndentNoHelp } from '@/app/action/filteraction'
import { useParams } from '@/context/paramcontext'
import type { MultiValue, SingleValue } from 'react-select'

// Types
interface IndentNo {
  DocId: string
  RecId: string
  ManualCode: string
}

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface IndentNoHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  isMulti?: boolean
  label: React.ReactNode
  showButton?: boolean
}

const IndentNoHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label
}: IndentNoHelpComponentProps<T>) => {
  const [indentNos, setIndentNos] = useState<IndentNo[]>([])
  const [loading, setLoading] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  const fetchIndentNo = async () => {
    setLoading(true)
    try {
      const data = await IndentNoHelp(Site_Code as string, companyid as string, bu as string)
      setIndentNos(data)
    } catch (err) {
      console.error('Error fetching  indent no data:', err)
      alert('Failed to fetch indent no. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const nameToCodeMap = new Map(indentNos.map(c => [c.RecId, c.DocId]))
  const nameSet = new Set(indentNos.map(c => c.RecId))

  const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
    value: nameToCodeMap.get(label) ?? label,
    label,
    isDisabled: !nameSet.has(label)
  }))

  const handleSelectChange = (selected: MultiValue<SelectOption> | SingleValue<SelectOption>) => {
    if (isMulti) {
      const multi = selected as MultiValue<SelectOption>
      const values = multi.map(opt => opt.value).join(',')
      const labels = multi.map(opt => opt.label).join(',')
      handleChange(filterKey, values as T[typeof filterKey])
      handleChange(nameKey, labels as T[typeof nameKey])
    } else {
      const single = selected as SingleValue<SelectOption>
      const selectedValue = single?.value ?? ''
      const selectedLabel = single?.label ?? ''
      handleChange(filterKey, selectedValue as T[typeof filterKey])
      handleChange(nameKey, selectedLabel as T[typeof nameKey])
    }
  }

  const allOptions = indentNos.map(c => ({
    value: c.DocId,
    label: c.RecId
  }))

  return (
    <div>
      <label className='block text-sm font-medium text-black mb-1'>{label}</label>

      <div className='flex items-center space-x-2'>
        <div className='flex-1'>
          <Select
            id='indentNo'
            value={isMulti ? selectedOptions : selectedOptions[0] ?? null}
            onChange={handleSelectChange}
            onMenuOpen={fetchIndentNo}
            isMulti={isMulti}
            isClearable={true}
            isLoading={loading}
            options={allOptions}
            isOptionDisabled={option => option.isDisabled ?? false}
            className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
          />
        </div>
      </div>
    </div>
  )
}

export default IndentNoHelpComponent
