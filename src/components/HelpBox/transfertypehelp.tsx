import React, { useState } from 'react'
import Select from 'react-select'
import type { SingleValue } from 'react-select'
import { useParams } from '@/context/paramcontext'
import { TransferTypeHelp } from '@/app/(dashboard)/orderTransferEntry/OrderTransafer_Entry_action'

interface TransferType {
  Code: string
  Name: string
}

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface TransferTypeHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  label: React.ReactNode
}

const TransferTypeHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  label
}: TransferTypeHelpComponentProps<T>) => {
  const [transferType, setTransferType] = useState<TransferType[]>([])
  const [loading, setLoading] = useState(false)
  const { Site_Code, companyid, UserName, bu } = useParams()

  const fetchTransferTypeHelp = async () => {
    setLoading(true)
    try {
      const res = await TransferTypeHelp(Site_Code as string, companyid as string, UserName as string, bu as string)
      setTransferType(res.data)
    } catch (err) {
      console.error('Error fetching transaction types:', err)
      alert('Failed to fetch transaction types. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleMenuOpen = () => {
    fetchTransferTypeHelp()
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const fetchedOptions: SelectOption[] = transferType.map(vt => ({
    value: vt.Code,
    label: vt.Name
  }))

  const descriptionToCodeMap = new Map(transferType.map(vt => [vt.Name, vt.Code]))
  const descriptionSet = new Set(transferType.map(vt => vt.Name))

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

export default TransferTypeHelpComponent
