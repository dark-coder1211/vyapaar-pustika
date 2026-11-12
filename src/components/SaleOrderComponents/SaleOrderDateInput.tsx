'use client'
import React from 'react'

interface SaleOrderDateInputProps {
  htmlForData?: string
  labelData: React.ReactNode
  isReadable: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  valueData: string
  idData: string
  nameData: string
  minDate?: string
}

const SaleOrderDateInput: React.FC<SaleOrderDateInputProps> = ({
  htmlForData,
  labelData,
  isReadable,
  onChange,
  valueData,
  idData,
  nameData,
  minDate
}) => {
  return (
    <div className='gap-2 mt-3 '>
      <label htmlFor={htmlForData} className='block text-sm font-medium text-black '>
        {labelData}
      </label>

      <input
        type='date'
        onChange={onChange}
        value={valueData}
        id={idData}
        name={nameData}
        className='form-datepicker px-1 w-full rounded border border-gray-300 bg-transparent  h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'
        placeholder='DD/MM/YYYY'
        readOnly={isReadable} // Prevent input interaction if readOnly
        min={minDate}
      />
    </div>
  )
}

export default SaleOrderDateInput
