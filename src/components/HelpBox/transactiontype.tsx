import React, { useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { TransactionTypeHelp } from '@/app/action/filteraction'
import MultiHelp from '../MultiHelp/MultiHelp'
import { Avatar } from '@mui/material'
import type { TransactionType } from '../interfaces/page'
import { TransactionTypecolumnsConfig } from '../Structure/page'
import { useParams } from '@/context/paramcontext'

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface TransactionTypeHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  categoryKey?: keyof T
  isMulti?: boolean
  label: React.ReactNode
  StrCondition?: string
  showButton: boolean
}

const TransactionTypeHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  categoryKey,
  isMulti = false,
  label,
  StrCondition,
  showButton
}: TransactionTypeHelpComponentProps<T>) => {
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>([])
  const [loading, setLoading] = useState(false)
  const [Mopen, MsetOpen] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  // 🔄 Fetch data on dropdown open
  const fetchTransactionTypes = async () => {
    setLoading(true)
    try {
      const data = await TransactionTypeHelp(Site_Code as string, companyid as string, bu as string, StrCondition)
      setTransactionTypes(data)
    } catch (err) {
      console.error('Error fetching transaction types:', err)
      alert('Failed to fetch transaction types. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const fetchedOptions: SelectOption[] = transactionTypes.map(tt => ({
    value: tt.Code,
    label: tt.Name
  }))

  const nameToCodeMap = new Map(transactionTypes.map(tt => [tt.Name, tt.Code]))
  const nameToCategoryMap = new Map(transactionTypes.map(tt => [tt.Name, tt.TansType_Category]))
  const nameSet = new Set(transactionTypes.map(tt => tt.Name))

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

      if (categoryKey) {
        const categories = multi
          .map(opt => nameToCategoryMap.get(opt.label) ?? '')
          .filter(Boolean)
          .join(',')
        handleChange(categoryKey, categories as T[typeof categoryKey])
      }
    } else {
      const single = selected as SingleValue<SelectOption>
      const selectedName = single?.label ?? ''
      const selectedValue = single?.value ?? ''

      handleChange(filterKey, selectedValue as T[typeof filterKey])
      handleChange(nameKey, selectedName as T[typeof nameKey])

      if (categoryKey) {
        handleChange(categoryKey, (nameToCategoryMap.get(selectedName) ?? '') as T[typeof categoryKey])
      }
    }
  }

  const handleOpen = () => MsetOpen(true)
  const handleClose = () => MsetOpen(false)

  const handleSelect = (transaction: TransactionType) => {
    handleClose()

    const selectedValue = transaction.Code
    const selectedLabel = transaction.Name
    const selectedCategory = transaction.TansType_Category ?? ''

    if (isMulti) {
      // If multiple values already exist, append the new one (if not duplicated)
      const currentValues = (filters[filterKey] as string)?.split(',').filter(Boolean) ?? []
      const currentLabels = (filters[nameKey] as string)?.split(',').filter(Boolean) ?? []
      const currentCategories = categoryKey ? (filters[categoryKey] as string)?.split(',').filter(Boolean) ?? [] : []

      if (!currentValues.includes(selectedValue)) {
        const newValues = [...currentValues, selectedValue].join(',')
        const newLabels = [...currentLabels, selectedLabel].join(',')
        const newCategories = categoryKey ? [...currentCategories, selectedCategory].join(',') : ''

        handleChange(filterKey, newValues as T[typeof filterKey])
        handleChange(nameKey, newLabels as T[typeof nameKey])
        if (categoryKey) {
          handleChange(categoryKey, newCategories as T[typeof categoryKey])
        }
      }
    } else {
      // Single select 
      handleChange(filterKey, selectedValue as T[typeof filterKey])
      handleChange(nameKey, selectedLabel as T[typeof nameKey])
      if (categoryKey) {
        handleChange(categoryKey, selectedCategory as T[typeof categoryKey])
      }
    }
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black mb-1'>{label}</label>
      <div className='flex items-center space-x-2'>
        <div className='flex-1'>
          <Select
            id='transactionType'
            value={selectedOptions}
            onChange={handleSelectChange}
            onMenuOpen={fetchTransactionTypes} // 👈 Fetch latest on dropdown open
            isMulti={isMulti}
            isClearable={true}
            options={fetchedOptions}
            isOptionDisabled={option => option.isDisabled ?? false}
            isLoading={loading} // 👈 Show loading spinner when fetching
            className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
          />
        </div>
        {showButton !== false && (
          <Avatar
            variant='rounded'
            sx={{
              width: 32,
              height: 32,
              fontSize: '14px',
              color: 'white',
              backgroundColor: '#2dd4bf',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            onClick={handleOpen}
          >
            M
          </Avatar>
        )}
      </div>
      {showButton !== false && (
        <MultiHelp<TransactionType>
          open={Mopen}
          onClose={handleClose}
          onSelect={handleSelect}
          fetchItems={() => TransactionTypeHelp(Site_Code as string, companyid as string, bu as string, StrCondition)}
          defaultSearch=''
          title='Transaction Type Help'
          dialogWidth='400px'
          columnsConfig={TransactionTypecolumnsConfig}
          searchField='Name'
        />
      )}
    </div>
  )
}

export default TransactionTypeHelpComponent
