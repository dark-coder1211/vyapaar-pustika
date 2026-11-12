import React, { useState } from 'react'
import Select from 'react-select'
import type { SingleValue } from 'react-select'
import { useParams } from '@/context/paramcontext'
import { GateEntryOrderNoHelps } from '@/app/action/filteraction'
import { toast } from 'react-toastify'

interface OrderType {
  ItemCode: string
  ItemName: string
  OrderDate: string
  OrderDocID: string
  OrderNo: string
  OrderV_SNo: number
  PendingQty: number
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
  partyCode: string
}

const GateEntryOrdNoHelpComponent =  <T extends { StrPartyCode: string },>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  label,
  partyCode
}: GateEntryOrdNoHelpComponentProps<T>) => {
  const [godown, setGodown] = useState<OrderType[]>([])
  const [loading, setLoading] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  // 🚫 BLOCK OPENING DROPDOWN IF PARTY NOT SELECTED
  const handleMenuOpen = () => {
    if (!filters.StrPartyCode) {
      toast.error('Please select Party Name first!')
      return
    }
    fetchGodownHelp()
  }

  const fetchGodownHelp = async () => {
    setLoading(true)
    try {
      const res = await GateEntryOrderNoHelps(
        Site_Code as string,
        companyid as string,
        bu as string,
        partyCode as string
      )
      setGodown(res)
    } catch (err) {
      console.error('Error fetching order no helps:', err)
      alert('Failed to fetch order numbers. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const fetchedOptions: SelectOption[] = godown.map(vt => ({
    value: vt.OrderDocID,
    label: vt.OrderNo
  }))

  const descriptionToCodeMap = new Map(godown.map(vt => [vt.OrderNo, vt.OrderDocID]))
  const descriptionSet = new Set(godown.map(vt => vt.OrderNo))

  const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
    value: descriptionToCodeMap.get(label) ?? label,
    label,
    isDisabled: !descriptionSet.has(label)
  }))

  // 🚫 BLOCK SELECTING ORDER IF PARTY NOT SELECTED
  const handleSelectChange = (selected: SingleValue<SelectOption>) => {
    if (!filters.StrPartyCode) {
      toast.error('Please select Party Name first!')
      return
    }

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
        onMenuOpen={handleMenuOpen} // ⬅️ validation added here
        isClearable={true}
        options={fetchedOptions}
        isOptionDisabled={option => option.isDisabled ?? false}
        isLoading={loading}
        className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
      />
    </div>
  )
}

export default GateEntryOrdNoHelpComponent
