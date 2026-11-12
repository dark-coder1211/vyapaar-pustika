import React, { useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { PendingIndentNoHelp } from '@/app/action/filteraction' // Adjust this path
import { Avatar } from '@mui/material'
import MultiHelp from '../MultiHelp/MultiHelp'
import type { PendingIndentHelp } from '../interfaces/page'
import { IndentcolumnsConfig } from '../Structure/page'
import { useParams } from '@/context/paramcontext'

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface PendingIndentNoHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T // Corresponds to IndentDocID
  nameKey: keyof T // Corresponds to IndentNo
  isMulti?: boolean
  label: React.ReactNode
  StrSupplierCode?: string
  StrV_Date?: string
  isDisabled?: boolean // <-- add this
  showButton: boolean
}

const PendingIndentNoHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label,
  StrSupplierCode,
  StrV_Date,
  isDisabled = false, // <-- default to false
  showButton
}: PendingIndentNoHelpComponentProps<T>) => {
  const [options, setOptions] = useState<PendingIndentHelp[]>([])
  const [loaded, setLoaded] = useState(false)
  const [Mopen, MsetOpen] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  const handleMenuOpen = () => {
    if (!loaded && StrSupplierCode && StrV_Date) {
      PendingIndentNoHelp(Site_Code as string, companyid as string, bu as string, StrSupplierCode, StrV_Date)
        .then((data: PendingIndentHelp[]) => {
          setOptions(data)
          setLoaded(true)
        })
        .catch(err => {
          console.error('Failed to fetch pending indent help:', err)
          alert('Error loading pending indent options. Please try again.')
        })
    }
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const nameToCodeMap = new Map(options.map(item => [item.IndentNo, item.IndentDocID]))
  const nameSet = new Set(options.map(item => item.IndentNo))

  const selectOptions: SelectOption[] = options.map(item => ({
    value: item.IndentDocID,
    label: item.IndentNo
  }))

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
      const label = single?.label ?? ''
      const value = single?.value ?? ''

      handleChange(filterKey, value as T[typeof filterKey])
      handleChange(nameKey, label as T[typeof nameKey])
    }
  }

  const handleOpen = () => MsetOpen(true)
  const handleClose = () => MsetOpen(false)

  const handleSelect = (indent: PendingIndentHelp) => {
    const value = indent.IndentDocID
    const label = indent.IndentNo

    if (isMulti) {
      const currentValues = filters[filterKey] ? (filters[filterKey] as string).split(',').filter(Boolean) : []
      const currentLabels = filters[nameKey] ? (filters[nameKey] as string).split(',').filter(Boolean) : []

      // Avoid duplicates
      if (!currentValues.includes(value)) {
        const updatedValues = [...currentValues, value].join(',')
        const updatedLabels = [...currentLabels, label].join(',')

        handleChange(filterKey, updatedValues as T[typeof filterKey])
        handleChange(nameKey, updatedLabels as T[typeof nameKey])
      }
    } else {
      handleChange(filterKey, value as T[typeof filterKey])
      handleChange(nameKey, label as T[typeof nameKey])
    }

    handleClose()
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black mb-1'>{label}</label>
      <div className='flex items-center space-x-2'>
        <div className='flex-1'>
          <Select
            id='pendingIndentNoHelpSelect'
            value={selectedOptions}
            onChange={handleSelectChange}
            isMulti={isMulti}
            isClearable={true}
            options={selectOptions}
            onMenuOpen={handleMenuOpen}
            isDisabled={isDisabled}
            className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
          />
        </div>
        {showButton !== false && !isDisabled && (
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
      {showButton !== false && !isDisabled && (
        <MultiHelp<PendingIndentHelp>
          open={Mopen}
          onClose={handleClose}
          onSelect={handleSelect}
          fetchItems={() => {
            if (StrSupplierCode && StrV_Date) {
              return PendingIndentNoHelp(Site_Code as string, companyid as string, bu as string, StrSupplierCode, StrV_Date)
            } else {
              return Promise.resolve([]) // fallback if either is missing
            }
          }}
          defaultSearch=''
          title='Indent Help'
          dialogWidth='700px'
          columnsConfig={IndentcolumnsConfig}
          searchField='IndentNo'
        />
      )}
    </div>
  )
}

export default PendingIndentNoHelpComponent
