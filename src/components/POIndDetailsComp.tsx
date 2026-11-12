import React, { useState, useEffect } from 'react'
import { Typography, Button, Dialog, DialogContent, DialogActions } from '@mui/material'
import MultiHelp from './MultiHelp/MultiHelp'
import type { StrucIndent } from './interfaces/page'
import { CostCenterHelp } from '@/app/action/filteraction'
import { CostCentercolumnsConfig } from './Structure/page'
import { useParams } from '@/context/paramcontext'

interface PopupProps {
  isOpen: boolean
  togglePopup: () => void
  savedData: StrucIndent[] | null
  setSavedData: (data: StrucIndent[]) => void
}

interface CostCenter {
  Code: string
  Name: string
  ManualCode: string
}

const PODetailsComp: React.FC<PopupProps> = ({ isOpen, togglePopup, savedData, setSavedData }) => {
  const [editedData, setEditedData] = useState<StrucIndent[]>([])
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [helpRowIndex, setHelpRowIndex] = useState<number | null>(null)
  const [Mopen, MsetOpen] = useState(false)

  const { Site_Code, companyid, bu } = useParams()

  // Load latest data when popup opens
  useEffect(() => {
    if (isOpen && savedData) setEditedData(savedData)
  }, [isOpen, savedData])

  // Format date for display
  const formatDate = (date: string | Date): string => {
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    const year = d.getFullYear()
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')
    return `${day}/${month}/${year}`
  }

  // Quantity change (local state only)
  const handleQtyChange = (index: number, newQty: number) => {
    setEditedData(prev => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        DblOrdQty: isNaN(newQty) ? 0 : newQty
      }
      return updated
    })
  }

  // PO Cost Center selection (local state only)
  const handleSelectCostCenter = (item: CostCenter) => {
    if (helpRowIndex === null) return

    setEditedData(prev => {
      const updated = [...prev]
      updated[helpRowIndex] = {
        ...updated[helpRowIndex],
        StrPOCostCenter: item.Code,
        StrPOCostCenterName: item.Name
      }
      return updated
    })

    MsetOpen(false)
  }

  const openMultiHelp = (rowIndex: number) => {
    setHelpRowIndex(rowIndex)
    MsetOpen(true)
  }

  const closeMultiHelp = () => MsetOpen(false)

  // Validate and save on OK click
  const handleOkClick = () => {
    for (let i = 0; i < editedData.length; i++) {
      const row = editedData[i]
      const indQty = Number(row.DblIndQty ?? 0)
      const adjQty = Number(row.DblAdjQty ?? 0)
      const ordQty = Number(row.DblOrdQty ?? 0)

      if (ordQty > indQty - adjQty) {
        setErrorMessage('Order Quantity should not be greater than Indent Quantity.')
        setErrorDialogOpen(true)
        return
      }
    }

    setErrorDialogOpen(false)
    setSavedData(editedData) // ✅ commit to parent
    togglePopup()
  }

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg sm:text-xl font-semibold text-gray-700'>Indent Details</h2>
              <button onClick={togglePopup} className='text-gray-500 hover:text-gray-700 text-2xl'>
                &times;
              </button>
            </div>

            {/* Table Section */}
            <div className='overflow-x-auto'>
              <table className='min-w-full border-collapse text-sm hidden sm:table'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border px-4 py-2 text-sm'>Indent No.</th>
                    <th className='border px-4 py-2 text-sm'>Date</th>
                    <th className='border px-4 py-2 text-sm'>Ind. Cost Center</th>
                    <th className='border px-4 py-2 text-sm'>Ind. Qty</th>
                    <th className='border px-4 py-2 text-sm'>Adjust Qty</th>
                    <th className='border px-4 py-2 text-sm'>PO Cost Center</th>
                    <th className='border px-4 py-2 text-sm'>Ord. Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {editedData.map((row, index) => (
                    <tr key={index} className='border-b'>
                      <td className='px-4 py-2 text-xs'>
                        <a href={`/indentEntry?Docid=${row.StrDocId}`} className='text-blue-500 hover:underline'>
                          {row.StrIndNo}
                        </a>
                      </td>
                      <td className='px-4 py-2 text-xs'>{formatDate(row.StrIndDate || 'N/A')}</td>
                      <td className='px-4 py-2 text-xs'>{row.StrIndCostCenterName}</td>
                      <td className='px-4 py-2 text-xs'>{row.DblIndQty}</td>
                      <td className='px-4 py-2 text-xs'>{row.DblAdjQty}</td>
                      <td
                        className='px-4 py-2 text-xs cursor-pointer text-blue-600 hover:underline'
                        onClick={() => openMultiHelp(index)}
                      >
                        {row.StrPOCostCenterName && row.StrPOCostCenterName.trim() !== ''
                          ? row.StrPOCostCenterName
                          : row.StrIndCostCenterName || 'Select PO Cost Center'}
                      </td>
                      <td className='px-4 py-2'>
                        <input
                          type='number'
                          value={row.DblOrdQty ?? 0}
                          onFocus={e => e.target.select()}
                          onChange={e => handleQtyChange(index, parseFloat(e.target.value))}
                          className='border px-2 py-1 rounded w-20'
                          min={0}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Buttons */}
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

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
        <DialogContent>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialogOpen(false)} style={{ backgroundColor: '#EF5350', color: 'white' }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* MultiHelp Dialog */}
      <MultiHelp<CostCenter>
        open={Mopen}
        onClose={closeMultiHelp}
        onSelect={handleSelectCostCenter}
        fetchItems={() => CostCenterHelp(Site_Code as string, companyid as string, bu as string)}
        defaultSearch=''
        title='Select PO Cost Center'
        dialogWidth='400px'
        columnsConfig={CostCentercolumnsConfig}
        searchField='Name'
      />
    </>
  )
}

export default PODetailsComp
