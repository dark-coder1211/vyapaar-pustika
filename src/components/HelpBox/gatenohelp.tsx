import React, { useState } from 'react'
import { GateNoHelp } from '@/app/action/filteraction'
import WindowedSelect from 'react-windowed-select'
import MultiHelp from '../MultiHelp/MultiHelp'
import { GateNoHelpcolumnsConfig } from '../Structure/page'
import type { GateNoType } from '../interfaces/page'
import { Avatar } from '@mui/material'
import { useParams } from '@/context/paramcontext'

interface SelectOption {
  value: string
  label: string
}

interface GateNoHelpProps {
  filters: Record<string, any>
  handleChange: (key: string, value: any) => void
  filterKey: string
  nameKey: string
  isMulti?: boolean
  label: React.ReactNode
  showButton?: boolean
  onItemSelect?: (item: GateNoType | null) => void
}

const GateNoHelpComponent: React.FC<GateNoHelpProps> = ({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label,
  showButton = true,
  onItemSelect
}) => {
  const [itemNames, setItemNames] = useState<GateNoType[]>([])
  const [cacheData, setCacheData] = useState<GateNoType[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [Mopen, MsetOpen] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  const fetchItemNames = async () => {
    if (cacheData) {
      setItemNames(cacheData)
      return
    }
    setLoading(true)
    try {
      const data: GateNoType[] = await GateNoHelp(Site_Code as string, companyid as string, bu as string)
      setItemNames(data)
      setCacheData(data)
    } finally {
      setLoading(false)
    }
  }

  const selectedNames = filters[nameKey]?.split(',').filter(Boolean) || []

  const nameToCode = new Map(itemNames.map(i => [i.GateEntryNo, i.GateEntryDocID]))

  const selectedOptions: SelectOption[] = selectedNames.map((label: string) => ({
    label,
    value: nameToCode.get(label) ?? label
  }))

  const handleSelectChange = (selected: any) => {
    if (isMulti) {
      const values = selected?.map((s: any) => s.value) || []
      const labels = selected?.map((s: any) => s.label) || []
      handleChange(filterKey, values.join(','))
      handleChange(nameKey, labels.join(','))
    } else {
      if (!selected) {
        handleChange(filterKey, '')
        handleChange(nameKey, '')
        onItemSelect?.(null) // <--- IMPORTANT FIX
        return
      }

      handleChange(filterKey, selected.value)
      handleChange(nameKey, selected.label)

      const item = itemNames.find(i => i.GateEntryDocID === selected.value)
      if (item) onItemSelect?.(item)
    }
  }

  const handleSelect = (item: GateNoType) => {
    handleChange(filterKey, item.GateEntryDocID)
    handleChange(nameKey, item.GateEntryNo)
    onItemSelect?.(item)
    MsetOpen(false)
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black mb-1'>{label}</label>

      <div className='flex items-center space-x-2'>
        <div className='flex-1'>
          <WindowedSelect
            id='gateNo'
            value={selectedOptions}
            onChange={handleSelectChange}
            onMenuOpen={fetchItemNames}
            isMulti={isMulti}
            isClearable={true}
            isLoading={loading}
            windowThreshold={10}
            options={itemNames.map((item: GateNoType) => ({
              label: item.GateEntryNo,
              value: item.GateEntryDocID
            }))}
            className='form-datepicker w-full rounded border-[1.5px] border-stroke'
          />
        </div>

        {showButton && (
          <Avatar
            variant='rounded'
            sx={{
              width: 32,
              height: 32,
              color: 'white',
              backgroundColor: '#2dd4bf',
              cursor: 'pointer'
            }}
            onClick={() => MsetOpen(true)}
          >
            M
          </Avatar>
        )}
      </div>

      {showButton && (
        <MultiHelp<GateNoType>
          open={Mopen}
          onClose={() => MsetOpen(false)}
          onSelect={handleSelect}
          fetchItems={() => GateNoHelp(Site_Code as string, companyid as string, bu as string)}
          defaultSearch=''
          title='Gate No. Help'
          dialogWidth='700px'
          columnsConfig={GateNoHelpcolumnsConfig}
          searchField='GateEntryNo'
        />
      )}
    </div>
  )
}

export default GateNoHelpComponent
