import React from 'react'
import type { TermsAndConditionsProps } from '../interfaces/page'

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  TCT,
  onTCTChange,
  title = 'Terms and Conditions'
}) => {
  return (
    <div className='flex-1'>
      <h2 className='text-lg font-semibold text-black  mb-3'>{title}</h2>

      <div className='max-h-[250px] overflow-y-auto pr-2 space-y-3'>
        {TCT && TCT.length > 0 ? (
          TCT.map((item, index) => (
            <div key={index} className='flex items-start gap-3'>
              <label className='w-24 text-xs font-medium text-gray-700 mt-1'>{item.strTCName || ''}</label>

              {item.strValue && item.strValue.length > 50 ? (
                <textarea
                  className='w-full min-h-[40px] px-2 py-1 text-sm text-black  rounded-md border border-stroke bg-white resize-none'
                  value={item.strValue}
                  onChange={e => onTCTChange(index, e.target.value)}
                />
              ) : (
                <input
                  type='text'
                  className='w-full h-9 px-2 text-sm text-black  rounded-md border border-stroke bg-white'
                  value={item.strValue}
                  onChange={e => onTCTChange(index, e.target.value)}
                />
              )}
            </div>
          ))
        ) : (
          <div className='flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2'>
            <svg className='w-4 h-4 text-yellow-500 mr-2' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M8.257 3.099c.366-.756 1.42-.756 1.786 0l6.516 13.5A1 1 0 0 1 15.683 18H4.317a1 1 0 0 1-.876-1.401l6.516-13.5zM11 14a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm-1-2a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1z' />
            </svg>
            No Terms and Conditions available.
          </div>
        )}
      </div>
    </div>
  )
}

export default TermsAndConditions
