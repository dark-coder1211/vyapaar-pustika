import React, { useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { ReqNoHelp } from '@/app/action/filteraction'
import MultiHelp from '@/components/MultiHelp/MultiHelp'
import { ReqNocolumnsConfig } from '@/components/Structure/page'
import { Avatar } from '@mui/material'
import { useParams } from '@/context/paramcontext'

interface Requisition {
  Reqdocid: string
  Reqno: string
  ReqDate: string
}

interface SelectOption {
  value: string // Reqdocid
  label: string // Reqno
  isDisabled?: boolean
}

interface RequisitionHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  isMulti?: boolean
  label: string
}

const ReqNoHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label
}: RequisitionHelpComponentProps<T>) => {
  const [requisitions, setRequisitions] = useState<Requisition[]>([])
  const [loading, setLoading] = useState(false)

  const [Mopen, MsetOpen] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await ReqNoHelp(Site_Code as string, companyid as string, bu as string)
      setRequisitions(data)
    } catch (err) {
      console.error('Error fetching requisition data:', err)
      alert('Failed to fetch requisitions. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const selectedReqnos =
    filters && typeof filters[nameKey] === 'string' ? (filters[nameKey] as string).split(',').filter(Boolean) : []

  const fetchedOptions: SelectOption[] = requisitions.map(dep => ({
    value: dep.Reqdocid,
    label: dep.Reqno
  }))

  const reqnoToReqdocidMap = new Map(requisitions.map(dep => [dep.Reqno, dep.Reqdocid]))

  const fetchedReqnosSet = new Set(requisitions.map(dep => dep.Reqno))

  const selectedOptions: SelectOption[] = selectedReqnos.map(reqno => ({
    value: reqnoToReqdocidMap.get(reqno) ?? reqno,
    label: reqno,
    isDisabled: !fetchedReqnosSet.has(reqno)
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
      handleChange(filterKey, (single?.value ?? '') as T[typeof filterKey])
      handleChange(nameKey, (single?.label ?? '') as T[typeof nameKey])
    }
  }
  const handleOpen = () => MsetOpen(true)
  const handleClose = () => MsetOpen(false)
  const handleSelect = (product: any) => {
    // setSelectedProduct(product)

    handleChange(filterKey, product.Reqdocid as T[typeof filterKey])
    handleChange(nameKey, product.Reqno as T[typeof nameKey])
    MsetOpen(false)
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black mb-1'>{label}</label>

      <div className='flex items-center space-x-2'>
        <div className='flex-1'>
          <Select
            id='reqno'
            value={selectedOptions}
            onChange={handleSelectChange}
            onMenuOpen={fetchData}
            isMulti={isMulti}
            isClearable={true}
            options={fetchedOptions}
            isOptionDisabled={option => option.isDisabled ?? false}
            isLoading={loading}
            className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
          />
        </div>

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
      </div>

      <MultiHelp<Requisition>
        open={Mopen}
        onClose={handleClose}
        onSelect={handleSelect}
        fetchItems={() => ReqNoHelp(Site_Code as string, companyid as string, bu as string)}
        defaultSearch=''
        title='Requisition No. Help'
        dialogWidth='450px'
        columnsConfig={ReqNocolumnsConfig}
        searchField='Reqno'
      />
    </div>
  )
}

export default ReqNoHelpComponent
