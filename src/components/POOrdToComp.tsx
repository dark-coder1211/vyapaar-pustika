import { clsSaleOrderItemDetail } from '@/app/(dashboard)/saleOrderEntry/SaleOrder_Entry_modal'
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { PoDetailInterface } from './interfaces/page'

interface PopupProps {
  isOpen: boolean
  togglePopup: () => void
  ordQty?: number // Ensure this is a number
  percentage: number
  setPercentage: (value: number) => void
  detail: clsSaleOrderItemDetail[]
  setDetail: Dispatch<SetStateAction<clsSaleOrderItemDetail[]>>
}

const POOrdToComp: React.FC<PopupProps> = ({
  isOpen,
  togglePopup,
  ordQty = 0,
  percentage,
  setPercentage,
  detail,
  setDetail
}) => {
  //   const [percentage, setPercentage] = useState<number>(10)
  const [percentageValue, setPercentageValue] = useState<number>(0)
  const [totalWithTolerance, setTotalWithTolerance] = useState<number>(ordQty)

  // Reset percentage to 10 whenever popup opens
  //   useEffect(() => {
  //     if (isOpen) {
  //       setPercentage(0)
  //     }
  //   }, [isOpen])

  // Recalculate values when ordQty or percentage changes
  useEffect(() => {
    const parsedOrdQty = Number(ordQty) || 0
    const parsedPercentage = Number(percentage) || 0

    const calcPercentageValue = (parsedOrdQty * parsedPercentage) / 100
    setPercentageValue(calcPercentageValue)
    setTotalWithTolerance(parsedOrdQty + calcPercentageValue)
  }, [ordQty, percentage])

  const handleOkClick = () => {
    setDetail(prevDetails =>
      prevDetails.map(item => {
        // Use a unique identifier like Intv_SNo if available
        if (item.DblWeight === ordQty) {
          return {
            ...item,
            // optional, store %
            Dbltl_ExcessQty: totalWithTolerance // store total with tolerance
          }
        }
        return item
      })
    )

    togglePopup()
  }

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 px-4'>
          <div className='bg-white rounded-lg shadow-lg w-full max-w-sm p-6 mx-2 sm:mx-0'>
            {/* Header */}
            <div className='flex justify-between items-center mb-5'>
              <h2 className='text-lg font-semibold text-gray-800'>Order Tolerance</h2>
              <button
                onClick={togglePopup}
                aria-label='Close'
                className='text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none cursor-pointer'
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <div className='space-y-5'>
              {/* Order Quantity */}
              <div className='space-y-1'>
                <label className='block text-sm font-medium text-gray-700'>Order Quantity</label>
                <input
                  type='number'
                  value={ordQty}
                  disabled
                  className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
                />
              </div>

              {/* Tolerance Excess */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>Tolerance Excess (+)</label>
                <div className='flex flex-wrap gap-3 items-center'>
                  {/* % input */}
                  <div className='flex items-center space-x-1 w-full sm:w-auto'>
                    <input
                      type='number'
                      value={percentage}
                      onChange={e => setPercentage(Number(e.target.value))}
                      className='w-full sm:w-20 border border-gray-300 rounded-md px-2 py-1.5 text-sm text-center'
                    />
                    <span className='text-sm font-medium text-gray-700'>%</span>
                  </div>

                  {/* Calculated % value */}
                  <input
                    type='number'
                    value={percentageValue.toFixed(2)}
                    disabled
                    className='w-full sm:w-24 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-center'
                  />

                  {/* Total value */}
                  <input
                    type='number'
                    value={totalWithTolerance.toFixed(2)}
                    disabled
                    className='w-full sm:w-24 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-center'
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row justify-end mt-6 space-y-3 sm:space-y-0 sm:space-x-3'>
              <button
                onClick={handleOkClick}
                className='w-full sm:w-auto px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
              >
                OK
              </button>
              <button
                onClick={togglePopup}
                className='w-full sm:w-auto px-5 py-2 text-sm font-medium bg-gray-500 text-white rounded-md hover:bg-gray-600 transition'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default POOrdToComp
