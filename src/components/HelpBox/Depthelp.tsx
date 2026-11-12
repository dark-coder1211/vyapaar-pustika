import React, { useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { DepartmentHelp } from '@/app/action/filteraction'
import { useParams } from '@/context/paramcontext'

interface Department {
  Code: string
  Name: string
}

interface SelectOption {
  value: string
  label: string
}

interface DepartmentHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  isMulti?: boolean
  label: React.ReactNode
}

const DepartmentHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label
}: DepartmentHelpComponentProps<T>) => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  // Optionally refresh on dropdown open
  const fetchDepartments = async () => {
    setLoading(true)
    try {
      const data = await DepartmentHelp(Site_Code as string, companyid as string, bu as string)
      setDepartments(data)
    } catch (err) {
      console.error('Error fetching department data:', err)
      alert('Failed to fetch departments. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const nameToCodeMap = new Map(departments.map(c => [c.Name, c.Code]))
  const nameSet = new Set(departments.map(c => c.Name))

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
      <label className='block text-sm font-medium text-black'>{label}</label>
      <Select
        id='departmentName'
        value={selectedOptions}
        onChange={handleSelectChange}
        onMenuOpen={fetchDepartments} // 👈 Fetch fresh data on dropdown open
        isMulti={isMulti}
        isClearable={true}
        isLoading={loading} // 👈 Show spinner when loading
        options={departments.map(dep => ({
          value: dep.Code,
          label: dep.Name
        }))}
        className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
      />
    </div>
  )
}

export default DepartmentHelpComponent
