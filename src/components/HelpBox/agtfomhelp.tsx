import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { FGetAgainstForm } from '@/app/action/filteraction' // Adjust path as needed
import MultiHelp from '../MultiHelp/MultiHelp'
import { Avatar } from '@mui/material'
import { AgainstcolumnsConfig } from '../Structure/page'
import type { AgainstForm } from '../interfaces/page'
import { useParams } from '@/context/paramcontext'

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface FGetAgainstFormComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  isMulti?: boolean
  label: React.ReactNode
  StrV_Type?: string
  StrPartyLocation?: string
  showButton: boolean
}

const FGetAgainstFormComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label,
  StrV_Type,
  StrPartyLocation,
  showButton
}: FGetAgainstFormComponentProps<T>) => {
  const [formOptions, setFormOptions] = useState<AgainstForm[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [Mopen, MsetOpen] = useState(false)
    const { Site_Code, companyid, bu } = useParams()

  useEffect(() => {
    if (StrV_Type && StrPartyLocation) {
      setIsLoading(true)
      FGetAgainstForm(Site_Code as string, companyid as string, bu as string, StrV_Type, StrPartyLocation)
        .then((data: AgainstForm[]) => {
          setFormOptions(data)

          const validLabels = data.map(f => f.Form_Desc)
          const validCodes = data.map(f => f.Form_Code)

          const currentLabel = filters[nameKey] as string
          const currentCode = filters[filterKey] as string

          const selectedLabels = currentLabel?.split(',').filter(Boolean) || []
          const selectedCodes = currentCode?.split(',').filter(Boolean) || []

          const areLabelsValid = selectedLabels.every(label => validLabels.includes(label))
          const areCodesValid = selectedCodes.every(code => validCodes.includes(code))

          if (!currentLabel || !currentCode || selectedLabels.length === 0 || selectedCodes.length === 0) {
            // No current value — auto-select first option
            if (data.length > 0) {
              const first = data[0]
              handleChange(filterKey, first.Form_Code as T[typeof filterKey])
              handleChange(nameKey, first.Form_Desc as T[typeof nameKey])
            }
          } else if (!areLabelsValid || !areCodesValid) {
            // Existing value is invalid — clear it
            handleChange(filterKey, '' as T[typeof filterKey])
            handleChange(nameKey, '' as T[typeof nameKey])
          }
        })
        .catch(err => {
          console.error('Failed to fetch against forms:', err)
          alert('Error loading form options. Please try again.')
        })
        .finally(() => setIsLoading(false))
    } else {
      // Clear on missing dependencies
      setFormOptions([])
      handleChange(filterKey, '' as T[typeof filterKey])
      handleChange(nameKey, '' as T[typeof nameKey])
    }
  }, [StrV_Type, StrPartyLocation])

  // Build option list and current selection
  const nameToCodeMap = new Map(formOptions.map(form => [form.Form_Desc, form.Form_Code]))
  const nameSet = new Set(formOptions.map(form => form.Form_Desc))

  const selectOptions: SelectOption[] = formOptions.map(form => ({
    value: form.Form_Code,
    label: form.Form_Desc
  }))

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
    value: nameToCodeMap.get(label) ?? label,
    label,
    isDisabled: !nameSet.has(label)
  }))

  // Handle dropdown change
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

  const handleSelect = (against: AgainstForm) => {
    handleClose()

    const selectedValue = against.Form_Code
    const selectedLabel = against.Form_Desc

    if (isMulti) {
      const currentValues = (filters[filterKey] as string)?.split(',').filter(Boolean) ?? []
      const currentLabels = (filters[nameKey] as string)?.split(',').filter(Boolean) ?? []

      // Avoid duplicates
      if (!currentValues.includes(selectedValue)) {
        const newValues = [...currentValues, selectedValue].join(',')
        const newLabels = [...currentLabels, selectedLabel].join(',')

        handleChange(filterKey, newValues as T[typeof filterKey])
        handleChange(nameKey, newLabels as T[typeof nameKey])
      }
    } else {
      // Single-select
      handleChange(filterKey, selectedValue as T[typeof filterKey])
      handleChange(nameKey, selectedLabel as T[typeof nameKey])
    }
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black mb-1'>{label}</label>
      <div className='flex items-center space-x-2'>
        <div className='flex-1'>
          <Select
            id='againstFormSelect'
            value={isMulti ? selectedOptions : selectedOptions[0] ?? null}
            onChange={handleSelectChange}
            isMulti={isMulti}
            isClearable={true}
            isLoading={isLoading}
            options={selectOptions}
            isOptionDisabled={option => option.isDisabled ?? false}
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
        <MultiHelp<AgainstForm>
          open={Mopen}
          onClose={handleClose}
          onSelect={handleSelect}
          fetchItems={() => FGetAgainstForm(Site_Code as string, companyid as string, bu as string, StrV_Type, StrPartyLocation)}
          defaultSearch=''
          title='Requisition By Help'
          dialogWidth='700px'
          columnsConfig={AgainstcolumnsConfig}
          searchField='Form_Desc'
        />
      )}
    </div>
  )
}

export default FGetAgainstFormComponent
