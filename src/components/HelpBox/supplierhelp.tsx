import React, { useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { SubGroupHelp } from '@/app/action/filteraction'
import MultiHelp from '../MultiHelp/MultiHelp'
import { Avatar } from '@mui/material'
import { SuppliercolumnsConfig } from '../Structure/page'
import type { Supplier } from '../interfaces/page'
import { useParams } from '@/context/paramcontext'

interface SelectOption {
  value: string
  label: string
}

interface SupplierHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  isMulti?: boolean
  label: React.ReactNode
  StrNature: string | string[]
  showButton: boolean
}

const SupplierHelpComponent = <T,>({
  filters,
  handleChange,
  StrNature,
  filterKey,
  nameKey,
  isMulti = false,
  label,
  showButton
}: SupplierHelpComponentProps<T>) => {
  const [parties, setParties] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(false)
  const [Mopen, MsetOpen] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  const fetchParties = async () => {
    setLoading(true)
    try {
      const data = await SubGroupHelp(StrNature, Site_Code as string, companyid as string, bu as string)
      setParties(data)
    } catch (err) {
      console.error('Error fetching party data:', err)
      alert('Failed to fetch party data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const nameToCodeMap = new Map(parties.map(c => [c.Name, c.SubCode]))
  const nameSet = new Set(parties.map(c => c.Name))

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

      // Clear extra fields in multi-select mode
      handleChange('strDesignation' as keyof T, '' as T[keyof T])
      handleChange('strDistributor' as keyof T, '' as T[keyof T])
      handleChange('strLocation' as keyof T, '' as T[keyof T])
    } else {
      const single = selected as SingleValue<SelectOption>

      if (single) {
        const selectedValue = single.value
        const selectedLabel = single.label

        handleChange(filterKey, selectedValue as T[typeof filterKey])
        handleChange(nameKey, selectedLabel as T[typeof nameKey])

        const selectedParty = parties.find(p => p.SubCode === selectedValue)

        if (selectedParty) {
          handleChange('strDesignation' as keyof T, selectedParty.Designation as T[keyof T])
          handleChange('strDistributor' as keyof T, selectedParty.DistributorName as T[keyof T])
          handleChange('strLocation' as keyof T, selectedParty.Location as T[keyof T])
        } else {
          handleChange('strDesignation' as keyof T, '' as T[keyof T])
          handleChange('strDistributor' as keyof T, '' as T[keyof T])
          handleChange('strLocation' as keyof T, '' as T[keyof T])
          console.log('No matching party found')
        }
      } else {
        // Cleared selection
        handleChange(filterKey, '' as T[typeof filterKey])
        handleChange(nameKey, '' as T[typeof nameKey])
        handleChange('strDesignation' as keyof T, '' as T[keyof T])
        handleChange('strDistributor' as keyof T, '' as T[keyof T])
        handleChange('strLocation' as keyof T, '' as T[keyof T])
      }
    }
  }

  const handleOpen = () => MsetOpen(true)
  const handleClose = () => MsetOpen(false)

  const handleSelect = (party: Supplier) => {
    handleClose()

    if (isMulti) {
      const currentValues = (filters[filterKey] as string)?.split(',') || []
      const currentLabels = (filters[nameKey] as string)?.split(',') || []

      // Avoid duplicates
      if (!currentValues.includes(party.SubCode)) {
        const newValues = [...currentValues, party.SubCode].join(',')
        const newLabels = [...currentLabels, party.Name].join(',')

        handleChange(filterKey, newValues as T[typeof filterKey])
        handleChange(nameKey, newLabels as T[typeof nameKey])
      }

      // Clear the extra fields in multi-select
      handleChange('strDesignation' as keyof T, '' as T[keyof T])
      handleChange('strDistributor' as keyof T, '' as T[keyof T])
      handleChange('strLocation' as keyof T, '' as T[keyof T])
    } else {
      handleChange(filterKey, party.SubCode as T[typeof filterKey])
      handleChange(nameKey, party.Name as T[typeof nameKey])
      handleChange('strDesignation' as keyof T, party.Designation as T[keyof T])
      handleChange('strDistributor' as keyof T, party.DistributorName as T[keyof T])
      handleChange('strLocation' as keyof T, party.Location as T[keyof T])
    }
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black mb-1'>{label}</label>
      <div className='flex items-center space-x-2'>
        <div className='flex-1'>
          <Select
            id='partyName'
            value={selectedOptions}
            onChange={handleSelectChange}
            onMenuOpen={fetchParties}
            isMulti={isMulti}
            isClearable={true}
            isLoading={loading}
            options={parties.map(party => ({
              value: party.SubCode,
              label: party.Name
            }))}
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
        <MultiHelp<Supplier>
          open={Mopen}
          onClose={handleClose}
          onSelect={handleSelect}
          fetchItems={() => SubGroupHelp(StrNature, Site_Code as string, companyid as string, bu as string)}
          defaultSearch=''
          title='Supplier  Help'
          dialogWidth='700px'
          columnsConfig={SuppliercolumnsConfig}
          searchField='Name'
        />
      )}
    </div>
  )
}

export default SupplierHelpComponent
