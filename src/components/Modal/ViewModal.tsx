'use client'

import type  { DMSSordItemDetailUpdatePostData, ViewModalProps } from '../interfaces/page'
import React, { useEffect, useState } from 'react'

const ViewModal = ({ isViewModalOpen, viewItem, setIsViewModalOpen }: ViewModalProps) => {
  const [formData, setFormData] = useState<DMSSordItemDetailUpdatePostData>({
    intdocId: '', // string type
    intv_SNo: 0, // number type
    stritemCode: '', // string type
    strItemName: '', // string type
    stritemDesc: '', // string type
    strbf: '', // string type
    strBFValue: '', // string type
    dblwidth: 0, // number type
    dbllength: 0, // number type
    strsizeUnit: '', // string type
    strgsm: '', // string type
    strGsmValue: '', // string type
    strgrain: '', // string type
    strgrainValue: '', // string type
    dblqty: 0, // number type
    strtl_ExcessPer: '', // string type
    dbltl_ExcessQty: 0, // number type
    dblreel: 0, // number type
    dblrate: 0, // number type
    dblamount: 0, // number type
    strclosed: '', // string type
    dbloh_Amt_Gross: 0, // number type
    dbloh_At_Addition: 0, // number type
    dbloh_Amt_Addition: 0, // number type
    dbloh_At_Discount: 0, // number type
    dbloh_Amt_Discount: 0, // number type
    dbloh_Amt_Net: 0, // number type
    strpldDocId: '', // string type
    intpldV_SNo: 0, // number type
    strpldRateApplicableOn: '', // string type
    dbloh_Amt_AgreedRate: 0, // number type
    strcontractSoDocId: '', // string type
    intcontractSoV_Sno: 0, // number type
    intcontractSo_Sno: 0, // number type
    strsizeUnitName: '' // string type
  })

  useEffect(() => {
    if (viewItem) {
      setFormData(viewItem)
    }
  }, [viewItem])

  return (
    <>
      {isViewModalOpen && (
        <div className='fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-30 flex items-start justify-center pt-20 px-4'>
          {/* <div className="absolute inset-0 bg-black opacity-50 border-2 border-solid border-blue-700"></div>  */}
          <div className='md:fixed md:top-0 md:left-0 md:right-0 md:bottom-0 flex items-center justify-center'>
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='relative md:mx-auto md:max-w-2xl md:rounded-lg md:shadow-xl'>
                <button
                  className='absolute pt-4 right-2 text-gray-500 hover:text-gray-700'
                  onClick={() => setIsViewModalOpen(false)}
                >
                  <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
                <div className='p-2 text-sm'>
                  <form className='flex font-sans flex-col md:flex-row rounded-md'>
                    <div className=' p-6 shadow-lg'>
                      <h1 className='text-3xl font-bold text-blue-400 '>Item Name</h1>
                      <div className='font-medium text-slate-900 '>{formData.strItemName}</div>
                      <h1 className='text-xl mt-2 font-bold text-slate-900 '>Description</h1>
                      <div className='text-sm font-bold text-slate-600 '>{formData.stritemDesc}</div>
                      <h1 className='text-lg mt-2 font-bold text-slate-900 '>Size Unit</h1>
                      <div className='text-sm font-bold text-slate-600 '>{formData.strsizeUnitName}</div>
                      <h1 className='text-lg mt-2 font-bold text-slate-900 '>Width</h1>
                      <div className='text-sm font-bold text-slate-600 '>{formData.dblwidth}</div>
                      <h1 className='text-lg mt-2 font-bold text-slate-900 '>Length</h1>
                      <div className='text-sm font-bold text-slate-600 '>{formData.dbllength}</div>
                    </div>

                    <div className='p-6 shadow-lg'>
                      <h1 className='text-lg mt-2 font-bold text-slate-900 '>Reel/Packs</h1>
                      <div className='text-sm font-bold text-slate-600 '>{formData.dblreel}</div>
                      <h1 className='text-lg mt-2 font-bold text-slate-900 '>Weight</h1>
                      <div className='text-sm font-bold text-slate-600 '>{formData.dblqty}</div>
                      <h1 className='text-lg mt-2 font-bold text-slate-900 '>Unit</h1>
                      <div className='text-sm font-bold text-slate-600 '>{formData.strsizeUnitName}</div>
                      <h1 className='text-lg mt-2 font-bold text-slate-900 '>Billing Rate</h1>
                      <div className='text-sm font-bold text-slate-600 '>{formData.dblrate}</div>
                      <h1 className='text-lg mt-2 font-bold text-slate-900 '>Agreed Rate</h1>
                      <div className='text-sm font-bold text-slate-600 '>{formData.dbloh_Amt_AgreedRate}</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ViewModal
