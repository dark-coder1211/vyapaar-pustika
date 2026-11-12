import React, { useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { ItemMakeHelp } from '@/app/action/filteraction'
import { useParams } from '@/context/paramcontext'

// Types
interface ItemMake {
  Code: string
  Name: string
}

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface ItemMakeHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  isMulti?: boolean
  label: string
}

const ItemMakeHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label
}: ItemMakeHelpComponentProps<T>) => {
  const [itemMakes, setItemMakes] = useState<ItemMake[]>([])
  const [loading, setLoading] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  const fetchItemMakes = async () => {
    setLoading(true)
    try {
      const data = await ItemMakeHelp(Site_Code as string, companyid as string, bu as string)
      setItemMakes(data)
    } catch (err) {
      console.error('Error fetching item make data:', err)
      alert('Failed to fetch item makes. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const nameToCodeMap = new Map(itemMakes.map(c => [c.Name, c.Code]))
  const nameSet = new Set(itemMakes.map(c => c.Name))

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
      handleChange(filterKey, (single?.value ?? '') as T[typeof filterKey])
      handleChange(nameKey, (single?.label ?? '') as T[typeof nameKey])
    }
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black mb-1'>{label}</label>
      <Select
        id='itemMakeName'
        value={isMulti ? selectedOptions : selectedOptions[0] ?? null}
        onChange={handleSelectChange}
        onMenuOpen={fetchItemMakes} // 🔄 Fetch on dropdown open
        isMulti={isMulti}
        isClearable={true}
        isLoading={loading} // 🌀 Show loading spinner
        options={itemMakes.map(make => ({
          value: make.Code,
          label: make.Name
        }))}
        isOptionDisabled={option => option.isDisabled ?? false}
        className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
      />
    </div>
  )
}

export default ItemMakeHelpComponent
