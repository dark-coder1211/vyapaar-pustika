import React, { useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { FGetCurrency } from '@/app/action/filteraction' // Adjust as per your project structure
import { useParams } from '@/context/paramcontext'

interface Currency {
  Code: string
  Name: string
}

interface SelectOption {
  value: string // Code
  label: string // Name
  isDisabled?: boolean
}

interface CurrencyHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T // Code
  nameKey: keyof T // Name
  isMulti?: boolean
  label: React.ReactNode
  StrCondition?: string
}

const CurrencyHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label
}: CurrencyHelpComponentProps<T>) => {
  const [currencyList, setCurrencyList] = useState<Currency[]>([])
  const [isDataFetched, setIsDataFetched] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  // useEffect(() => {
  //     if (!isDataFetched) {
  //         FGetCurrency()
  //             .then(data => {
  //                 setCurrencyList(data);
  //                 setIsDataFetched(true);
  //             })
  //             .catch(err => {
  //                 console.error('Error fetching currencies:', err);
  //                 alert('Failed to fetch currencies. Please try again later.');
  //             });
  //     }
  // }, [isDataFetched, StrCondition]);

  const fetchCurrencyData = async () => {
    if (!isDataFetched) {
      try {
        const data = await FGetCurrency(Site_Code as string, companyid as string, bu as string)
        setCurrencyList(data)
        setIsDataFetched(true)
      } catch (err) {
        console.error('Error fetching currencies:', err)
        alert('Failed to fetch currencies. Please try again later.')
      }
    }
  }
  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const fetchedOptions: SelectOption[] = currencyList.map(c => ({
    value: c.Code,
    label: c.Name
  }))

  const nameToCodeMap = new Map(currencyList.map(c => [c.Name, c.Code]))
  const nameSet = new Set(currencyList.map(c => c.Name))

  const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
    value: nameToCodeMap.get(label) ?? label,
    label: label,
    isDisabled: !nameSet.has(label)
  }))

  const allOptions = fetchedOptions

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
      <label className='block text-sm font-medium text-black '>{label}</label>
      <Select
        id='currencySelect'
        value={selectedOptions}
        onChange={handleSelectChange}
        isMulti={isMulti}
        isClearable={true}
        onMenuOpen={fetchCurrencyData}
        options={allOptions}
        isOptionDisabled={option => option.isDisabled ?? false}
        className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
      />
    </div>
  )
}

export default CurrencyHelpComponent
