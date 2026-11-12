import React, { useState } from 'react'
import Select from 'react-select'
import type {SingleValue } from 'react-select'
import { useParams } from '@/context/paramcontext'
import { GateEntryAdviseChangeItemHelps } from '@/app/action/filteraction'
import { toast } from 'react-toastify'

interface AdviseItemType {
  ItemCode: string
  ItemName: string
  ManualCode: string
  SKU: string
}

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface GateEntryOrdNoHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  label: React.ReactNode
  itemCode: string
}

const GateEntryAdvChangeItemHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  label,
  itemCode
}: GateEntryOrdNoHelpComponentProps<T>) => {
  const [godown, setGodown] = useState<AdviseItemType[]>([])
  const [loading, setLoading] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  const fetchGodownHelp = async () => {
    setLoading(true)
    try {
      const res = await GateEntryAdviseChangeItemHelps(
        Site_Code as string,
        companyid as string,
        bu as string,
        itemCode as string
      )
      setGodown(res)
    } catch (err) {
      console.error('Error fetching transaction types:', err)
      alert('Failed to fetch transaction types. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  //   const handleMenuOpen = () => {
  //     fetchGodownHelp()
  //   }

  const handleMenuOpen = () => {
    if (!itemCode) {
      toast.error('Please select Item Name first!')
      return
    }
    fetchGodownHelp()
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const fetchedOptions: SelectOption[] = godown.map(vt => ({
    value: vt.ItemCode,
    label: vt.ItemName
  }))

  const descriptionToCodeMap = new Map(godown.map(vt => [vt.ItemName, vt.ItemCode]))
  const descriptionSet = new Set(godown.map(vt => vt.ItemName))

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

export default GateEntryAdvChangeItemHelpComponent
