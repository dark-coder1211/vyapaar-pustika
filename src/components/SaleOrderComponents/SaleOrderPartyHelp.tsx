'use client'

import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Avatar } from '@mui/material'

interface partyData {
  Code: string
  Name: string | number
  keyData: number | string
}

interface SaleOrderPartyHelpProps {
  htmlforData: string
  labelData: string
  idData: string
  party: partyData[] | undefined
  valueData: string | number
  optionData: string | number
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onFocus: () => void
  onBlurFunction?: () => void
  stateToSet?: Dispatch<SetStateAction<boolean>>
  CoSNoStar?: boolean
  nameData?: string
}

const SaleOrderPartyHelp: React.FC<SaleOrderPartyHelpProps> = ({
  htmlforData,
  labelData,
  idData,
  party,
  valueData,
  optionData,
  onChange,
  onFocus,
  onBlurFunction,
  stateToSet,
  CoSNoStar,
  nameData
}) => {
  return (
    <div className='gap-2 mt-3'>
      <label htmlFor={htmlforData} className=' block text-sm font-medium text-black '>
        {labelData}
        {(labelData === 'Party' ||
          labelData === 'Against Form' ||
          labelData === 'Delivery' ||
          labelData === 'Freight Type' ||
          labelData === 'Sales Person' ||
          labelData === 'Transaction Type' ||
          labelData === 'Item Name' ||
          labelData === 'BF' ||
          labelData === 'GSM' ||
          labelData === 'Size Unit' ||
          CoSNoStar) && <span style={{ color: 'red' }}>*</span>}
      </label>
      <div className='flex items-center '>
        <select
          name={nameData}
          value={valueData}
          id={idData}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlurFunction}
          className='form-datepicker w-full rounded border border-gray-300 bg-transparent  h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'
        >
          <option value=''>Select</option>
          <option value={valueData} disabled hidden>
            {optionData}
          </option>
          {party?.map(ele => (
            <option key={ele.keyData} value={ele.Code}>
              {ele.Name}
            </option>
          ))}
        </select>
        {stateToSet && (
          <Avatar
            variant='rounded'
            sx={{
              ml: 1,
              width: 20,
              height: 20,
              fontSize: '14px',
              color: 'white',
              backgroundColor: '#2dd4bf',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            onClick={() => stateToSet(true)}
          >
            M
          </Avatar>
        )}
      </div>
    </div>
  )
}

export default SaleOrderPartyHelp
