import React, { useState, useEffect } from 'react'
import type { StrucQCNew, StrucQcResponseDetail } from './interfaces/page'
import { GetFilQCByIndentNoHelp } from '@/app/(dashboard)/purchaseOrderEntry/PurchaseOrder_Entry_action'
import { useParams } from '@/context/paramcontext'

interface PopupProps {
  isOpen: boolean
  togglePopup: () => void
  strIndNo: string
  StrItemCode: string
  StrV_date: string
}

const QCDetailsComp: React.FC<PopupProps> = ({ isOpen, togglePopup, strIndNo, StrItemCode, StrV_date }) => {
  const [qcData, setQcData] = useState<StrucQCNew[]>([])
  const { Site_Code, companyid, bu } = useParams()

  useEffect(() => {
    if (isOpen) {
      fetchQCData()
    }
  }, [isOpen])

  const fetchQCData = async () => {
    try {
      const result: StrucQcResponseDetail = await GetFilQCByIndentNoHelp(
        {
          strIndNo,
          StrItemCode,
          StrV_date
        },
        Site_Code as string,
        companyid as string
      )

      if (result?.success) {
        setQcData(result.data)
      } else {
        console.warn('No data received from GetFilQCByIndentNoHelp.')
        setQcData([])
      }
    } catch (error) {
      console.error('Error fetching QC details:', error)
      setQcData([])
    }
  }

  const handleOkClick = () => {
    console.log('QC Data:', qcData)
    togglePopup()
  }

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full mx-4 sm:mx-0 overflow-auto max-h-[90vh]'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold text-gray-700'>Lab Parameter</h2>
              <button onClick={togglePopup} className='text-gray-500 hover:text-gray-700 text-2xl'>
                &times;
              </button>
            </div>

            <div className='overflow-x-auto'>
              {/* ✅ Desktop Table View */}

              <table className='min-w-full border-collapse text-sm hidden sm:table'>
                <thead>
                  <tr className='bg-gray-100'>
                    {/* table headers */}
                    <th className='border px-2 py-1'>SNo</th>
                    <th className='border px-2 py-1'>Impurity Name</th>
                    <th className='border px-2 py-1'>Unit</th>
                    <th className='border px-2 py-1'>Range1</th>
                    <th className='border px-2 py-1'>Range2</th>
                    <th className='border px-2 py-1'>Formula For Qty</th>
                    <th className='border px-2 py-1'>Formula For Amount</th>
                    <th className='border px-2 py-1'>Formula For Deduction</th>
                    <th className='border px-2 py-1'>Reject Y/N</th>
                    <th className='border px-2 py-1'>BillPurity Y/N</th>
                    <th className='border px-2 py-1'>Std. Value</th>
                    <th className='border px-2 py-1'>Tolerance (+)</th>
                    <th className='border px-2 py-1'>Tolerance (-)</th>
                    <th className='border px-2 py-1'>Deduction</th>
                    <th className='border px-2 py-1'>Reject</th>
                    <th className='border px-2 py-1'>AboveBelow</th>
                    <th className='border px-2 py-1'>Net Wt Calc Y/N</th>
                    <th className='border px-2 py-1'>Ded As per Sheet</th>
                  </tr>
                </thead>
                {qcData.length > 0 ? (
                  <tbody>
                    {qcData.map((row, index) => (
                      <tr key={index} className='border-b'>
                        <td className='border px-2 py-1'>{row.SNo}</td>
                        <td className='border px-2 py-1'>{row.StrImpName}</td>
                        <td className='border px-2 py-1'>{row.strStrUnit}</td>
                        <td className='border px-2 py-1'>{row.DBlRange1}</td>
                        <td className='border px-2 py-1'>{row.DBlRange2}</td>
                        <td className='border px-2 py-1'>{row.StrFormulaQty}</td>
                        <td className='border px-2 py-1'>{row.StrFormulaAMt}</td>
                        <td className='border px-2 py-1'>{row.StrFormulaDeduction}</td>
                        <td className='border px-2 py-1'>{row.DblRejectOn}</td>
                        <td className='border px-2 py-1'>{row.StrBillPurityYn}</td>
                        <td className='border px-2 py-1'>{row.DblStdValue}</td>
                        <td className='border px-2 py-1'>{row.DblTolrencePlus}</td>
                        <td className='border px-2 py-1'>{row.DblTolrenceNegative}</td>
                        <td className='border px-2 py-1'>{row.DblDeductionOn}</td>
                        <td className='border px-2 py-1'>{row.DblRejectOn}</td>
                        <td className='border px-2 py-1'>{row.StrOnAboveBelow}</td>
                        <td className='border px-2 py-1'>{row.StrNetWeightCalcYN}</td>
                        <td className='border px-2 py-1'>{row.StrDed_ASpersheet}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <div className='hidden sm:flex justify-center items-center h-20 text-gray-500 text-sm'>
                    No records found.
                  </div>
                )}
              </table>

              {/* ✅ Mobile Card View */}
              <div className='block sm:hidden space-y-4 mt-4'>
                {qcData.length > 0 ? (
                  qcData.map((row, index) => (
                    <div key={index} className='border rounded p-3 shadow-sm bg-gray-50'>
                      <p>
                        <strong>SNo:</strong> {row.SNo}
                      </p>
                      <p>
                        <strong>Impurity Name:</strong> {row.StrImpName}
                      </p>
                      <p>
                        <strong>Unit:</strong> {row.strStrUnit}
                      </p>
                      <p>
                        <strong>Range1:</strong> {row.DBlRange1}
                      </p>
                      <p>
                        <strong>Range2:</strong> {row.DBlRange2}
                      </p>
                      <p>
                        <strong>Formula For Qty:</strong> {row.StrFormulaQty}
                      </p>
                      <p>
                        <strong>Formula For Amount:</strong> {row.StrFormulaAMt}
                      </p>
                      <p>
                        <strong>Formula For Deduction:</strong> {row.StrFormulaDeduction}
                      </p>
                      <p>
                        <strong>Reject Y/N:</strong> {row.DblRejectOn}
                      </p>
                      <p>
                        <strong>BillPurity Y/N:</strong> {row.StrBillPurityYn}
                      </p>
                      <p>
                        <strong>Std. Value:</strong> {row.DblStdValue}
                      </p>
                      <p>
                        <strong>Tolerance (+):</strong> {row.DblTolrencePlus}
                      </p>
                      <p>
                        <strong>Tolerance (-):</strong> {row.DblTolrenceNegative}
                      </p>
                      <p>
                        <strong>Deduction:</strong> {row.DblDeductionOn}
                      </p>
                      <p>
                        <strong>Reject:</strong> {row.DblRejectOn}
                      </p>
                      <p>
                        <strong>Above/Below:</strong> {row.StrOnAboveBelow}
                      </p>
                      <p>
                        <strong>Net Wt Calc Y/N:</strong> {row.StrNetWeightCalcYN}
                      </p>
                      <p>
                        <strong>Ded As per Sheet:</strong> {row.StrDed_ASpersheet}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className='text-center text-gray-500 text-sm'>No records found.</div>
                )}
              </div>
            </div>

            <div className='flex justify-end mt-4 space-x-4'>
              <button onClick={handleOkClick} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                OK
              </button>
              <button onClick={togglePopup} className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default QCDetailsComp
