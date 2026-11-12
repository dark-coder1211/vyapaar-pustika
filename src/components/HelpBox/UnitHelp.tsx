import React, { useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { UnitHelp } from '@/app/action/filteraction'
import { useParams } from '@/context/paramcontext'

interface SelectOption {
  value: string
  label: string
}

interface Unit {
  code: string
  unit: string
}

interface UnitHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T      // stores code
  nameKey: keyof T        // stores unit label
  isMulti?: boolean
  label: React.ReactNode
}

const UnitHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label
}: UnitHelpComponentProps<T>) => {
  const [units, setUnits] = useState<Unit[]>([])
  const [loading, setLoading] = useState(false)

  const { Site_Code, companyid, bu } = useParams()

  // 🔄 Fetch Unit List on dropdown open
  const fetchUnits = async () => {
    setLoading(true)
    try {
      const data = await UnitHelp(Site_Code as string, companyid as string, bu as string)
      setUnits(data || [])
    } catch (err) {
      console.error('Error fetching units:', err)
      alert('Failed to load units.')
    } finally {
      setLoading(false)
    }
  }

  // Handle selected options
  const selectedLabels =
    filters && typeof filters[nameKey] === 'string'
      ? (filters[nameKey] as string).split(',').filter(Boolean)
      : []

  const nameToCode = new Map(units.map(u => [u.unit, u.code]))
  const allNames = new Set(units.map(u => u.unit))

  const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
    value: nameToCode.get(label) ?? label,
    label,
    isDisabled: !allNames.has(label)
  }))

  // Handle dropdown change
  const handleSelectChange = (selected: MultiValue<SelectOption> | SingleValue<SelectOption>) => {
    if (isMulti) {
      const multi = selected as MultiValue<SelectOption>
      const values = multi.map(opt => opt.value).join(',')
      const labels = multi.map(opt => opt.label).join(',')

      handleChange(filterKey, values as T[keyof T])
      handleChange(nameKey, labels as T[keyof T])
    } else {
      const single = selected as SingleValue<SelectOption>

      if (single) {
        handleChange(filterKey, single.value as T[keyof T])
        handleChange(nameKey, single.label as T[keyof T])
      } else {
        handleChange(filterKey, '' as T[keyof T])
        handleChange(nameKey, '' as T[keyof T])
      }
    }
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black mb-1'>{label}</label>

      <Select
        value={selectedOptions}
        onChange={handleSelectChange}
        onMenuOpen={fetchUnits}
        isMulti={isMulti}
        isClearable
        isLoading={loading}
        options={units.map(u => ({
          value: u.code,
          label: u.unit
        }))}
        className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent
                   font-normal outline-none transition focus:border-primary'
      />
    </div>
  )
}

export default UnitHelpComponent
