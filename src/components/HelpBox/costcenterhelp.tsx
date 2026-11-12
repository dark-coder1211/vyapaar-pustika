import React, { useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { CostCenterHelp } from '@/app/action/filteraction'
import MultiHelp from '../MultiHelp/MultiHelp'
import { Avatar } from '@mui/material'
import { CostCentercolumnsConfig } from '../Structure/page'
import { useParams } from '@/context/paramcontext'

// Types
interface CostCenter {
  Code: string
  Name: string
  ManualCode: string
}

interface SelectOption {
  value: string
  label: string
  isDisabled?: boolean
}

interface CostCenterHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  isMulti?: boolean
  label: React.ReactNode
  showButton?: boolean
}

const CostCenterHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label,
  showButton = true
}: CostCenterHelpComponentProps<T>) => {
  const [costCenters, setCostCenters] = useState<CostCenter[]>([])
  const [loading, setLoading] = useState(false)
  const [Mopen, MsetOpen] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  const fetchCostCenters = async () => {
    setLoading(true)
    try {
      const data = await CostCenterHelp(Site_Code as string, companyid as string, bu as string)
      setCostCenters(data)
    } catch (err) {
      console.error('Error fetching cost center data:', err)
      alert('Failed to fetch cost centers. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const selectedLabels =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const nameToCodeMap = new Map(costCenters.map(c => [c.Name, c.Code]))
  const nameSet = new Set(costCenters.map(c => c.Name))

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
      const selectedValue = single?.value ?? ''
      const selectedLabel = single?.label ?? ''
      handleChange(filterKey, selectedValue as T[typeof filterKey])
      handleChange(nameKey, selectedLabel as T[typeof nameKey])
    }
  }

  const allOptions = costCenters.map(c => ({
    value: c.Code,
    label: c.Name
  }))

  const handleOpen = () => MsetOpen(true)
  const handleClose = () => MsetOpen(false)

  const handleSelect = (item: CostCenter) => {
    if (!item || !item.Code || !item.Name) return

    handleChange(filterKey, item.Code as T[typeof filterKey])
    handleChange(nameKey, item.Name as T[typeof nameKey])
    handleClose()
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black mb-1'>{label}</label>

      <div className='flex items-center space-x-2'>
        <div className='flex-1'>
          <Select
            id='costCenterName'
            value={isMulti ? selectedOptions : selectedOptions[0] ?? null}
            onChange={handleSelectChange}
            onMenuOpen={fetchCostCenters}
            isMulti={isMulti}
            isClearable={true}
            isLoading={loading}
            options={allOptions}
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
        <MultiHelp<CostCenter>
          open={Mopen}
          onClose={handleClose}
          onSelect={handleSelect}
          fetchItems={() => CostCenterHelp(Site_Code as string, companyid as string, bu as string)}
          defaultSearch=''
          title='Cost Center Help'
          dialogWidth='400px'
          columnsConfig={CostCentercolumnsConfig}
          searchField='Name'
        />
      )}
    </div>
  )
}

export default CostCenterHelpComponent
