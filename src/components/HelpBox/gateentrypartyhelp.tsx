import React, { useState } from 'react'
import { useParams } from '@/context/paramcontext'
import { GateEntryPartyHelps } from '@/app/action/filteraction'
import WindowedSelect from 'react-windowed-select'

interface GatePartyType {
  Address: string
  City: string
  Code: string
  PartyName: string
  SubCode: string
}

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface GatePartyHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  label: React.ReactNode
}

const GateEntryPartyHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  label
}: GatePartyHelpComponentProps<T>) => {
  const [godown, setGodown] = useState<GatePartyType[]>([])
  const [loading, setLoading] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  const fetchGodownHelp = async () => {
    setLoading(true)
    try {
      const res = await GateEntryPartyHelps(Site_Code as string, companyid as string, bu as string)
      setGodown(res)
    } catch (err) {
      console.error('Error fetching transaction types:', err)
      alert('Failed to fetch transaction types. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleMenuOpen = () => {
    fetchGodownHelp()
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const fetchedOptions: SelectOption[] = godown.map(vt => ({
    value: vt.SubCode,
    label: vt.PartyName
  }))

  const descriptionToCodeMap = new Map(godown.map(vt => [vt.PartyName, vt.SubCode]))
  const descriptionSet = new Set(godown.map(vt => vt.PartyName))

  const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
    value: descriptionToCodeMap.get(label) ?? label,
    label: label,
    isDisabled: !descriptionSet.has(label)
  }))

  const handleSelectChange = (selected: any) => {
    handleChange(filterKey, (selected?.value ?? '') as T[typeof filterKey])
    handleChange(nameKey, (selected?.label ?? '') as T[typeof nameKey])
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black'>{label}</label>
      <WindowedSelect
        id='voucherType'
        value={selectedOptions}
        windowThreshold={100}
        onChange={handleSelectChange}
        onMenuOpen={handleMenuOpen} // <-- Fetch latest data here
        isClearable={true}
        options={fetchedOptions}
        isOptionDisabled={(option: any) => option.isDisabled ?? false}
        isLoading={loading}
        className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
      />
    </div>
  )
}

export default GateEntryPartyHelpComponent
