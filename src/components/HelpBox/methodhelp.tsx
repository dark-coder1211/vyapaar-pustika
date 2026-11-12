import React, { useState } from 'react'
import Select from 'react-select'
import type { SingleValue } from 'react-select'
import { useParams } from '@/context/paramcontext'
import { MethodHelp } from '@/app/action/filteraction'

interface MethodType {
  Code: string
  Name: string
}

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface MethodHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  label: React.ReactNode
}

const MethodHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  label
}: MethodHelpComponentProps<T>) => {
  const [method, setMethod] = useState<MethodType[]>([])
  const [loading, setLoading] = useState(false)
  const { companyid, bu } = useParams()

  const fetchMethodHelp = async () => {
    setLoading(true)
    try {
      const res = await MethodHelp(companyid as string, bu as string)
      setMethod(res)
    } catch (err) {
      console.error('Error fetching transaction types:', err)
      alert('Failed to fetch transaction types. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleMenuOpen = () => {
    fetchMethodHelp()
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const fetchedOptions: SelectOption[] = method.map(vt => ({
    value: vt.Code,
    label: vt.Name
  }))

  const descriptionToCodeMap = new Map(method.map(vt => [vt.Name, vt.Code]))
  const descriptionSet = new Set(method.map(vt => vt.Name))

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

export default MethodHelpComponent
