'use client'

import React from "react"

interface SaleOrderAddressHelpProps{
    htmlForData: string
    labelData: string
    isStar: boolean
    valueData: string | number | undefined
    idData: string
    typeData: string
    isReadOnly: boolean
    nameData?: string
    placeHolderData?: string
    onChangeFun?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onFocusFun?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlurFun?: () => void
}

const SaleOrderInput: React.FC<SaleOrderAddressHelpProps> = ({htmlForData, labelData, isStar, valueData, idData, typeData, isReadOnly, nameData, placeHolderData, onChangeFun, onFocusFun, onBlurFun}) => {
  return (
    <div className='gap-2 mt-3'>
      <label htmlFor={htmlForData} className={`block text-sm font-medium text-black `}>
        {labelData}
        {(isStar) && <span style={{ color: 'red' }}>*</span>}
      </label>
      <div className='flex items-center'>
        <input
          value={valueData}
          name={nameData}
          id={idData}
          type={typeData}
          readOnly={isReadOnly}
          onChange={onChangeFun}
          onFocus={onFocusFun}
          onBlur={onBlurFun}
          placeholder={placeHolderData}
          className='form-datepicker w-full rounded border border-gray-300 bg-transparent px-1 py-3 h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'
        />
      </div>
    </div>
  )
}

export default SaleOrderInput;
