import React, { useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { VoucherTypeHelp } from '@/app/action/filteraction'
import { useParams } from '@/context/paramcontext'

interface VoucherType {
  V_Type: string
  Description: string
}

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface VoucherTypeHelpComponentProps<T> {
  filters: T | null
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  isMulti?: boolean
  label: React.ReactNode
  StrCondition: string
}

const VoucherTypeHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label,
  StrCondition
}: VoucherTypeHelpComponentProps<T>) => {
  const [voucherTypes, setVoucherTypes] = useState<VoucherType[]>([])
  const [loading, setLoading] = useState(false)

  const { Site_Code, companyid, bu } = useParams()

  const fetchVoucherTypes = async () => {
    setLoading(true)
    try {
      const data = await VoucherTypeHelp(StrCondition, Site_Code as string, companyid as string, bu as string)
      setVoucherTypes(data)
    } catch (err) {
      console.error('Error fetching voucher types:', err)
      alert('Failed to fetch voucher types. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleMenuOpen = () => {
    fetchVoucherTypes()
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const fetchedOptions: SelectOption[] = voucherTypes.map(vt => ({
    value: vt.V_Type,
    label: vt.Description
  }))

  const descriptionToCodeMap = new Map(voucherTypes.map(vt => [vt.Description, vt.V_Type]))
  const descriptionSet = new Set(voucherTypes.map(vt => vt.Description))

  const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
    value: descriptionToCodeMap.get(label) ?? label,
    label: label,
    isDisabled: !descriptionSet.has(label)
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
        id='voucherType'
        value={selectedOptions}
        onChange={handleSelectChange}
        onMenuOpen={handleMenuOpen} // <-- Fetch latest data here
        isMulti={isMulti}
        isClearable={true}
        options={fetchedOptions}
        isOptionDisabled={option => option.isDisabled ?? false}
        isLoading={loading}
        className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
      />
    </div>
  )
}

export default VoucherTypeHelpComponent
