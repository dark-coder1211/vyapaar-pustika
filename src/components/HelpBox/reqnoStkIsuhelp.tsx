import React, { useState } from 'react'
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { ReqNoStkIsuHelp } from '@/app/action/filteraction'
import MultiHelp from '@/components/MultiHelp/MultiHelp'
import { ReqNoStkIsucolumnsConfig } from '@/components/Structure/page'
import { Avatar, Button } from '@mui/material'
import { useParams } from '@/context/paramcontext'
import type { Requisition } from '../interfaces/page'

interface SelectOption {
  value: string // SearchCode
  label: string // ReqNo
  isDisabled?: boolean
}

interface RequisitionHelpComponentProps<T> {
  filters: T
  handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  filterKey: keyof T
  nameKey: keyof T
  isMulti?: boolean
  label: string
  onFillDetailClick?: () => void
}

const ReqNoStkIsuHelpComponent = <T,>({
  filters,
  handleChange,
  filterKey,
  nameKey,
  isMulti = false,
  label,
  onFillDetailClick
}: RequisitionHelpComponentProps<T>) => {
  const [requisitions, setRequisitions] = useState<Requisition[]>([])
  const [loading, setLoading] = useState(false)

  const [Mopen, MsetOpen] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await ReqNoStkIsuHelp(Site_Code as string, companyid as string, bu as string)
      setRequisitions([{ ReqNo: 'All', SearchCode: 'ALL' }, ...data])
    } catch (err) {
      console.error('Error fetching requisition data:', err)
      alert('Failed to fetch requisitions.')
    } finally {
      setLoading(false)
    }
  }

  // selected names string → array
  const selectedReqnos =
    filters && typeof filters[nameKey] === 'string'
      ? (filters[nameKey] as string).split(',').filter(Boolean)
      : []

  const fetchedOptions: SelectOption[] = requisitions.map(req => ({
    value: req.SearchCode,
    label: req.ReqNo
  }))

  const reqnoToSearchCode = new Map(requisitions.map(r => [r.ReqNo, r.SearchCode]))
  const fetchedReqNoSet = new Set(requisitions.map(r => r.ReqNo))

  let selectedOptions: SelectOption[] = []

  if (isMulti) {
    if (selectedReqnos.includes('All')) {
      selectedOptions = fetchedOptions.filter(opt => opt.label !== 'All')
    } else {
      selectedOptions = selectedReqnos.map(reqNo => ({
        value: reqnoToSearchCode.get(reqNo) ?? reqNo,
        label: reqNo,
        isDisabled: !fetchedReqNoSet.has(reqNo)
      }))
    }
  } else {
    if (selectedReqnos.length > 0) {
      selectedOptions = [{
        value: reqnoToSearchCode.get(selectedReqnos[0]) ?? selectedReqnos[0],
        label: selectedReqnos[0],
        isDisabled: !fetchedReqNoSet.has(selectedReqnos[0])
      }]
    }
  }

  const handleSelectChange = (
    selected: MultiValue<SelectOption> | SingleValue<SelectOption>
  ) => {
    if (isMulti) {
      const multi = selected as MultiValue<SelectOption>
      const isAllSelected = multi.some(opt => opt.label === 'All')
      if (isAllSelected) {
        const allReqNos = requisitions
          .filter(req => req.ReqNo !== 'All')
          .map(req => req.ReqNo)
          .join(',')

        const allSearchCodes = requisitions
          .filter(req => req.ReqNo !== 'All')
          .map(req => req.SearchCode)
          .join(',')

        handleChange(filterKey, allSearchCodes as T[typeof filterKey])
        handleChange(nameKey, allReqNos as T[typeof nameKey])
      } else {
        const values = multi.map(opt => opt.value).join(',')
        const labels = multi.map(opt => opt.label).join(',')

        handleChange(filterKey, values as T[typeof filterKey])
        handleChange(nameKey, labels as T[typeof nameKey])
      }
    } else {
      const single = selected as SingleValue<SelectOption>

      handleChange(filterKey, (single?.value ?? '') as T[typeof filterKey])
      handleChange(nameKey, (single?.label ?? '') as T[typeof nameKey])
    }
  }

  const handleOpen = () => MsetOpen(true)
  const handleClose = () => MsetOpen(false)

  return (
    <div>
      <label className="block text-sm font-medium text-black mb-1">{label}</label>

      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Select
            id="reqno"
            value={selectedOptions}
            onChange={handleSelectChange}
            onMenuOpen={fetchData} // fetch only on menu open
            isMulti={isMulti}
            isClearable
            options={fetchedOptions}
            isOptionDisabled={option => option.isDisabled ?? false}
            isLoading={loading}
          />
        </div>


        <Avatar
          variant="rounded"
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


        <Button
          variant="contained"
          size="small"
          onClick={onFillDetailClick}
          sx={{ minWidth: '80px' }}
        >
          Fill Detail
        </Button>

      </div>

      <MultiHelp<Requisition>
        open={Mopen}
        onClose={handleClose}
        onSelect={(item) => {
          handleChange(filterKey, item.SearchCode as T[typeof filterKey])
          handleChange(nameKey, item.ReqNo as T[typeof nameKey])
          MsetOpen(false)
        }}
        fetchItems={() => ReqNoStkIsuHelp(Site_Code as string, companyid as string, bu as string)}
        defaultSearch=""
        title="Requisition No. Help"
        dialogWidth="450px"
        columnsConfig={ReqNoStkIsucolumnsConfig}
        searchField="ReqNo"
      />
    </div>
  )
}

export default ReqNoStkIsuHelpComponent
