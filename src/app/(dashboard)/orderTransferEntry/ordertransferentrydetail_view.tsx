'use client'

import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { ImCross } from 'react-icons/im'
import { ToastContainer } from 'react-toastify'
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode'
import ItemNameHelpComponent from '@/components/HelpBox/itemhelp'
import { fetchBf } from './OrderTransafer_Entry_action'
import { useParams } from '@/context/paramcontext'

interface OrderTransferEntryDetailProps {
  isAddModalActive: boolean
  isEditModalActive: boolean
  toggleAddModal: () => void
  toggleEditModal: () => void
}

interface orderTransferDetailInterface {
  orderTrfr_ItemCode?: string
  orderTrfr_ItemName?: string
}

const OrderTransferEntryDetail = ({
  isAddModalActive,
  isEditModalActive,
  toggleAddModal,
  toggleEditModal
}: OrderTransferEntryDetailProps) => {
  const [result, setResult] = useState<string>('')
  const [scanning, setScanning] = useState(false)
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null)
  const { Site_Code, companyid, UserName, bu } = useParams()

  const initialOtrFromData: orderTransferDetailInterface = {
    orderTrfr_ItemCode: '',
    orderTrfr_ItemName: ''
  }
  const [orderTransferDetail, setOrderTransferDetail] = useState<orderTransferDetailInterface>(initialOtrFromData)

  // useEffect(() => {
  //   if (!isAddModalActive) return

  //   const scanner = new Html5QrcodeScanner(
  //     'reader',
  //     {
  //       qrbox: {
  //         width: 250,
  //         height: 250
  //       },
  //       fps: 5,
  //       supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
  //     },
  //     false
  //   )

  //   scanner.render(
  //     result => {
  //       scanner.clear()
  //       // setScanResult(result)
  //     },
  //     err => {
  //       console.warn(err)
  //     }
  //   )

  //   return () => {
  //     scanner.clear().catch(e => console.error('Failed to clear scanner', e))
  //   }
  // }, [isAddModalActive])

  const startScanning = () => {
    if (scanning) return

    const newScanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: { width: 250, height: 250 },
        fps: 5,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
      },
      false
    )

    newScanner.render(
      decodedText => {
        newScanner.clear()
        setResult(decodedText)
        setScanning(false)
      },
      errorMessage => {
        console.warn(errorMessage)
      }
    )

    setScanner(newScanner)
    setScanning(true)
  }

  const stopScanning = () => {
    if (scanner) {
      scanner
        .clear()
        .then(() => {
          setScanning(false)
          setScanner(null)
        })
        .catch(err => {
          console.error('Failed to clear scanner', err)
        })
    }
  }

  const handleChange = (key: string, value: any) => {
    setOrderTransferDetail(prev => ({
      ...prev,
      [key]: value
    }))
  }

  useEffect(() => {
    console.log('Order Transfer Detail', orderTransferDetail)
  }, [orderTransferDetail])

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      {(isAddModalActive || isEditModalActive) && (
        <div className='fixed inset-0 z-[99] overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0  '>
            {/* Modal content */}
            <div className='md:mt-16 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle mt-16 w-full max-w-4xl'>
              <div className='flex justify-center bg-blue-400 rounded-lg p-2 '>
                <div className='text-xl font-bold text-center text-white'>
                  {'Item Feeding (Reel No. Wise / Barcode Wise)'}
                </div>
              </div>
              <button
                onClick={() => {
                  toggleAddModal()
                  stopScanning()
                }}
                className='absolute top-4 right-4 text-blue-950 hover:text-black-700 focus:outline-none'
              >
                <ImCross />
              </button>

              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4  dark:border-strokedark dark:bg-boxdark '>
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-2  max-w-3xl mx-auto over overflow-x-auto'>
                  {/* Left side */}
                  <div className=' space-y-3 md:flex-row  md:items-center'>
                    {/* CO S.No, Item Name *, Description */}
                    <div className='border border-transparent sm:border-2 sm:border-solid'>
                      <div className='mt-4 flex justify-center'>
                        <button
                          className='w-full max-w-xs sm:w-64 px-4 py-2 font-bold bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
                          onClick={startScanning}
                          disabled={scanning}
                        >
                          {scanning ? 'Scanning...' : 'Scan Barcode'}
                        </button>
                        {scanning && (
                          <button
                            onClick={stopScanning}
                            className='w-full max-w-xs sm:w-64 px-4 py-2 font-bold bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
                          >
                            Stop Scan
                          </button>
                        )}
                      </div>
                      <div id='reader' className='w-full max-w-[300px] mt-5 mx-auto'></div>
                      <div className='mt-4'>
                        <label className=' block text-sm font-medium text-black '>Reel No.</label>
                        <select
                          //   name={nameData}
                          //   value={valueData}
                          //   id={idData}
                          //   onChange={onChange}
                          //   onFocus={onFocus}
                          //   onBlur={onBlurFunction}
                          className='form-datepicker w-full rounded border border-gray-300 bg-transparent  h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'
                        >
                          <option value=''>Select</option>
                          {/* <option value={valueData} disabled hidden>
                            {optionData}
                          </option>
                          {party?.map(ele => (
                            <option key={ele.keyData} value={ele.Code}>
                              {ele.Name}
                            </option> 
                          ))}*/}
                        </select>
                      </div>
                      <div className='mt-3'>
                        <ItemNameHelpComponent
                          filters={orderTransferDetail}
                          handleChange={handleChange}
                          filterKey='orderTrfr_ItemCode'
                          nameKey='orderTrfr_ItemName'
                          isMulti={false}
                          label={
                            <>
                              Item Name <span className='text-red-500'>*</span>
                            </>
                          }
                        />
                      </div>
                    </div>

                    {/*BF *, GSM *, Size Unit * */}
                    <div className='flex flex-col md:grid md:grid-cols-3 gap-4 '>
                      <div className='flex-1'>
                        {/* <SaleOrderHelp
                          htmlforData='strbf'
                          labelData='BF'
                          idData='strbf'
                          party={bf[0]?.data?.map((ele, index) => ({
                            Code: ele.code,
                            Name: ele.Name,
                            keyData: index
                          }))}
                          valueData={formData.strbf || ''}
                          optionData={formData.strBFValue || 'Select'}
                          onChange={event =>
                            handleBFChange(
                              event,
                              bf,
                              setSelectedBF,
                              setFormData,
                              setBfError,
                              setStrBFCode,
                              fetchPriceList,
                              isPriceListApplicable,
                              contractDocId,
                              ordertype,
                              currentDate,
                              vsNo || formData.intcontractSoV_Sno,
                              bu,
                              formData
                            )
                          }
                          onFocus={() => {
                            fetchBf(
                              bu,
                              companyid,
                              setBf,
                              UserName,
                              header[0].strContractSalesOrder || '',
                              formData.intcontractSoV_Sno || 0
                            )
                          }}
                          CoSNoStar={true}
                        />
                        {bfError && <div className='text-danger text-sm text-red-700'>{bfError}</div>} */}
                        <label className=' block text-sm font-medium text-black '>BF</label>
                        <select
                          className='form-datepicker w-full rounded border border-gray-300 bg-transparent  h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'
                          onClick={() => fetchBf(bu as string, companyid as string, UserName as string)}
                        >
                          <option value=''>Select</option>
                          <option value='yo'>yo</option>
                        </select>
                      </div>

                      <div className='flex-1'>
                        <label className=' block text-sm font-medium text-black '>GSM</label>
                        <select className='form-datepicker w-full rounded border border-gray-300 bg-transparent  h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'>
                          <option value=''>Select</option>
                        </select>
                      </div>

                      <div className='flex-1'>
                        <label className=' block text-sm font-medium text-black '>Unit</label>
                        <select className='form-datepicker w-full rounded border border-gray-300 bg-transparent  h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'>
                          <option value=''>Select</option>
                        </select>
                      </div>
                    </div>

                    <div className='flex flex-col md:grid md:grid-cols-3 gap-4'>
                      <div className='flex-1'>
                        <label className=' block text-sm font-medium text-black '>Size</label>
                        <select className='form-datepicker w-full rounded border border-gray-300 bg-transparent  h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'>
                          <option value=''>Select</option>
                        </select>
                      </div>

                      <div className='flex-1'>
                        <label className=' block text-sm font-medium text-black '>Weight</label>
                        <select className='form-datepicker w-full rounded border border-gray-300 bg-transparent  h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'>
                          <option value=''>Select</option>
                        </select>
                      </div>

                      <div className='flex-1'>
                        <label className=' block text-sm font-medium text-black '>Rate</label>
                        <select className='form-datepicker w-full rounded border border-gray-300 bg-transparent  h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'>
                          <option value=''>Select</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className='flex-1'>
                    <div className='overflow-auto'>
                      {/* Reel/Pack *, Weight *, Unit */}
                      <div className='md:mt-[1px]'>
                        <div className='border border-transparent sm:border-2 sm:border-solid '>
                          <div className='flex justify-start gap-7 '>
                            <div className='w-1/2'>
                              <label className=' block text-sm font-medium text-black '>Container No.</label>
                              <select className='form-datepicker w-full rounded border border-gray-300 bg-transparent  h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'>
                                <option value=''>Select</option>
                              </select>
                            </div>

                            <div className='w-1/2'>
                              <label className=' block text-sm font-medium text-black '>Shipping Seal</label>
                              <select className='form-datepicker w-full rounded border border-gray-300 bg-transparent  h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'>
                                <option value=''>Select</option>
                              </select>
                            </div>
                          </div>
                          <div className='mt-3'>
                            <label className=' block text-sm font-medium text-black '>RFID Seal</label>
                            <input
                              className='form-datepicker w-full rounded border border-gray-300 bg-transparent px-1 py-3 h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-gray-500'
                              type='text'
                            ></input>
                          </div>
                        </div>
                        {/* Billing Rate *, Agreed Rate **/}
                      </div>
                    </div>

                    {/* Submit and Reload Button */}
                    <div className='flex justify-center mt-3'>
                      <div className='flex flex-col gap-3 mt-4 w-full max-w-xs'>
                        <button className='w-full px-3 h-8 text-sm font-bold rounded-md text-white bg-blue-500'>
                          Fill Reel Detail In Grid
                        </button>
                        <button className='w-full px-3 h-8 text-sm font-bold rounded-md text-white bg-blue-500'>
                          Fill Detail In Invoice Entry
                        </button>
                        <div className='flex gap-4'>
                          <button className='w-1/2 px-3 h-8 text-sm font-bold rounded-md text-white bg-blue-500'>
                            Clear
                          </button>
                          <button
                            className='w-1/2 px-3 h-8 text-sm font-bold rounded-md text-white bg-blue-500'
                            onClick={() => {
                              toggleAddModal()
                              stopScanning()
                            }}
                          >
                            Exit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='overflow-x-auto mt-2 '>
                  <div className='overflow-x-auto mt-2'>
                    {/* <TableThree /> */}
                    <div className='rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 '>
                      <div className='max-w-full overflow-x-auto'>
                        {/* Check if the screen is mobile */}
                        <div className='lg:hidden '>
                          {/* Mobile View */}
                          <div className='overflow-y-auto max-h-full md:hidden  px-4 sm:px-6 bg-cyan-50'>
                            <div className='space-y-6'>
                              {' '}
                              {/* Increased spacing between each item */}
                              {/* {!isSelect &&
                        IndentDet.map((ele, index) => ( */}
                              <div
                                // key={index}
                                className='bg-white rounded-xl shadow-lg mb-6 p-6  transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r duration-500 ease-in-out'
                              >
                                <div className='flex flex-col'>
                                  {' '}
                                  {/* Increased space between the details */}
                                  <div className='flex items-center space-x-2 border-b-2 border-cyan-900 pb-2'>
                                    <span className='text-sm font-bold text-cyan-900'>Order No. :</span>
                                    {/* <span className='text-sm font-semibold text-cyan-800 '>{ele.StrItemName}</span> */}
                                  </div>
                                  <div className='flex flex-col space-y-2 mt-2'>
                                    {' '}
                                    {/* Increased space between the details */}
                                    <div className='text-xs font-bold text-gray-700 '>
                                      <span className='text-xs font-semibold text-gray-600 '>Item Name :</span>
                                      {/* <span className='text-xs text-gray-700 '>{index + 1}</span> */}
                                    </div>
                                  </div>
                                  <div className='flex items-center space-x-2 mt-1'>
                                    <span className='text-xs font-semibold text-gray-600 '>BF :</span>
                                    {/* <span className='text-xs text-gray-700 '>{ele.StrICode}</span> */}
                                  </div>
                                  <div className='flex items-center space-x-2  mt-1'>
                                    <span className='text-xs font-semibold text-gray-600 '>Width :</span>
                                    {/* <span className='text-xs text-gray-700 '>{ele.StrMakeName}</span> */}
                                  </div>
                                  <div className='flex items-center space-x-2 mt-1'>
                                    <span className='text-xs font-semibold text-gray-600 '>Unit :</span>
                                    {/* <span className='text-xs text-gray-700 '>{ele.currentStock}</span> */}
                                  </div>
                                  <div className='flex items-center space-x-2 mt-1'>
                                    <span className='text-xs font-semibold text-gray-600 '>GSM :</span>
                                    {/* <span className='text-xs text-gray-700 '>{ele.MinStock}</span> */}
                                  </div>
                                  <div className='flex items-center space-x-2 mt-1'>
                                    <span className='text-xs font-semibold text-gray-600 '>Reel No. :</span>
                                    {/* <span className='text-xs text-gray-700 '>{ele.MaxStock}</span> */}
                                  </div>
                                  <div className='flex items-center space-x-2 mt-1'>
                                    <span className='text-xs font-semibold text-gray-600 '>Weight :</span>
                                    {/* <span className='text-xs text-gray-700 '>{ele.Reorder}</span> */}
                                  </div>
                                  <div className='flex items-center space-x-2 mt-1'>
                                    <span className='text-xs font-semibold text-gray-600 '>Rate :</span>
                                    {/* <span className='text-xs text-gray-700 '>{ele.dblAprQty}</span> */}
                                  </div>
                                  <div className='flex items-center space-x-2 mt-1'>
                                    <span className='text-xs font-semibold text-gray-600 '>Godown :</span>
                                    {/* <span className='text-xs text-gray-700 '>{ele.IndQty}</span> */}
                                  </div>
                                  <div className='flex items-center space-x-2 mt-1'>
                                    <span className='text-xs font-semibold text-gray-600 '>Batch No. :</span>
                                    <span className='text-xs text-gray-700 '> </span>
                                  </div>
                                </div>

                                <div className='flex items-center justify-end space-x-1 mt-4'>
                                  <IconButton color='primary' className='hover:bg-blue-100' sx={{ fontSize: 18 }}>
                                    <FaEdit />
                                  </IconButton>

                                  <IconButton
                                    color='error'
                                    className='hover:bg-red-100'
                                    sx={{ fontSize: 18 }}
                                    // onClick={e => {
                                    //   e.stopPropagation()
                                    //   openDialog(index) // Open dialog with the current row index
                                    // }}
                                  >
                                    <FaTrash />
                                  </IconButton>
                                </div>
                              </div>
                              {/* // ))} */}
                            </div>
                          </div>
                        </div>

                        {/* Desktop View (Optional) */}
                        <div className='hidden lg:block'>
                          <table className='w-full table-auto whitespace-nowrap'>
                            <thead>
                              <tr className='bg-teal-500 text-white '>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  Action
                                </th>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  Order No.
                                </th>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  Item Name
                                </th>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  BF
                                </th>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  Width
                                </th>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  Unit
                                </th>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  GSM
                                </th>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  Reel No.
                                </th>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  Weight
                                </th>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  Rate
                                </th>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  Godown
                                </th>
                                <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                                  Batch No.
                                </th>
                              </tr>
                            </thead>
                            {/* {!isSelect &&
                      IndentDet.map((ele, index) => { */}
                            {/* return ( */}
                            <tbody>
                              <tr className='hover:bg-gray-50 dark:hover:bg-gray-200'>
                                <td className='px-4 py-1 text-xs  text-blacktext-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  <div className='flex items-center justify-end space-x-1 '>
                                    <IconButton
                                      color='primary'
                                      className='hover:bg-blue-100'
                                      sx={{ fontSize: 18 }}
                                      // onClick={() =>
                                      //   handleEdit(index, IndentDet, setIsEditModalActive, setEditItem, setEditIndex)
                                      // }
                                    >
                                      <FaEdit />
                                    </IconButton>

                                    <IconButton
                                      color='error'
                                      className='hover:bg-red-100'
                                      sx={{ fontSize: 18 }}
                                      // onClick={e => {
                                      //   e.stopPropagation()
                                      //   openDialog(index) // Open dialog with the current row index
                                      // }}
                                    >
                                      <FaTrash />
                                    </IconButton>
                                  </div>
                                </td>
                                <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  {/* {index + 1} */}
                                </td>
                                <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  {/* {ele.StrItemName} */}
                                </td>
                                <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  {/* {ele.StrICode} */}
                                </td>
                                <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  {/* {ele.StrMakeName} */}
                                </td>
                                <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  {/* {ele.currentStock} */}
                                </td>
                                <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  {/* {ele.MinStock} */}
                                </td>
                                <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  {/* {ele.MaxStock} */}
                                </td>
                                <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  {/* {ele.Reorder} */}
                                </td>
                                <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  {/* {ele.dblAprQty} */}
                                </td>
                                <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  {/* {ele.IndQty} */}
                                </td>
                                <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                  {/* {ele.IndQty} */}
                                </td>
                              </tr>
                            </tbody>
                            {/* )})} */}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OrderTransferEntryDetail
