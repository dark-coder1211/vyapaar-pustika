'use client'

import SaleOrderEntryDetail from './saleorderentrydetail_view'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import TextBoxOne from '@/components/TextBoxOne'
import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { SiHomebridge } from 'react-icons/si'
import { BsBank2 } from 'react-icons/bs'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  type ApiResponse,
  type ApiResponseDetail,
  type Contract,
  type DMSSordItemDetailUpdatePostData,
  type cosno,
  type IsPriceListResponse,
  type Site,
  type Add_PlaceOrder,
  type TCT,
  type TCTData,
  type EnviroData,
  type clsDMSSordOHHeader,
  type clsDMSSordOH,
  type LineOH,
  type HeaderOH,
  type TransactionTypeDataforSale,
  type OrderTypeForSale,
  type PartyDataforSaleOrder,
  type ToPlaceHelpInterface,
  type ExcisableInterface,
  type clsSaleOrderHeader,
  type ConsigneeDataForSale,
  NotificationInterface,
  clsSaleOrderItemDetail
} from './SaleOrder_Entry_modal'
import { useOrderState } from '@/components/states/useOrderState'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import { GrView } from 'react-icons/gr'
import ErrorModal from '@/components/ErrorModal'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import getOrderDetailById from '@/app/action/getOrderDetailById'
import getOrderHeaderById from '@/app/action/getOrderHeaderById'
import {
  fetchAddressbook,
  fetchConsignees,
  fetchDelAddressbook,
  formatDate,
  handleAgtFormChange,
  handleAgtFormFocus,
  handleCloseErrorModal,
  handleCloseModal,
  handleConsigneeChange,
  handleConsigneeFocus,
  handleDeliveryToChange,
  handleEdit,
  handleEditFormSubmit,
  handleFormSubmit,
  handleHeaderChange,
  handleOrderTypeChange,
  handleOrderTypeDataFocus,
  handlePartyChange,
  handlePartyDataFocus,
  handleReset,
  handleRowSelect,
  handleTableDelete,
  toggleAddModal,
  toggleEditModal,
  toggleViewModal
} from '@/components/Functions/SaleOrder/SaleOrder'
import MultiHelp from '@/components/MultiHelp/MultiHelp'
import {
  ConsigneesAction,
  DeliveryAction,
  TransactionTypeAction,
  OrderNumberAction,
  Addressbookaction,
  SiteDataAction,
  PartyAction,
  GetTermsCondAction,
  TermsCondAction,
  placeOrderAction,
  ContractSalesOrderAction,
  cosonoAction,
  IsPriceListApplicableAction,
  OrderTypeAction,
  ToPlaceAction,
  ExcisableAction,
  OrderNoAction
} from './SaleOrder_Entry_action'
import { consigneeColumnsConfig, PartyColumnsConfig, ToPlaceColumnsConfig } from '@/components/Structure/page'
import OrderTypeErrorPopup from '@/components/OrderTypeErrorPopup'
import {
  handleApprovedConfirm,
  handleOrderTypeError,
  handleVerifiedConfirm
} from '@/components/Functions/SaleOrder/OrderStatus'
import ViewModal from '@/components/Modal/ViewModal'
import ApprovedPopup from '@/components/ApprovedPopup'
import { FaRegCopy } from 'react-icons/fa'
import VerifiedPopup from '@/components/VerifiedPopup'
import { fetchBf, fetchGsm, fetchItemName } from '@/components/Functions/SaleOrder/AddEditModal'
import { useParams } from '@/context/paramcontext'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import SaleOrderDateinput from '@/components/SaleOrderComponents/SaleOrderDateInput'
import SaleOrderHelp from '@/components/SaleOrderComponents/SaleOrderHelp'
import SaleOrderInput from '@/components/SaleOrderComponents/SaleOrderInput'
import { getOHheaderByDocIdAction } from '@/app/action/getOHHeaderByDocid'
import { getOHheaderAction } from '@/app/action/getOHHeader'
import HeaderOHComp from '@/components/HeaderOHComp/HeaderOHComp'
import { getOHlineAction } from '@/app/action/getOHline'
import { getOHlineByDocIdAction } from '@/app/action/getOHlineByDocId'
import VoucherTypeHelpComponent from '@/components/HelpBox/vouchertypehelp'
import { TiArrowSortedDown } from 'react-icons/ti'
import POOrdToComp from '@/components/POOrdToComp'
import HeadingTab from '@/components/HeadingTab'
import { Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material'
import ExitToApp from '@/components/ExitToApp'

const SaleOrderEntry = () => {
  const {
    partyName,
    setPartyName,
    isModalOpen,
    setIsModalOpen,
    isPlaced,
    setIsPlaced,
    totalGrossAmount,
    setTotalGrossAmount,
    totalCGST,
    setTotalCGST,
    totalSGST,
    setTotalSGST,
    totalIGST,
    setTotalIGST,
    totalAdditionAmount,
    setTotalAdditionAmount,
    totalAmount,
    setTotalAmount,
    totalDiscount,
    setTotalDiscount,
    isAddModalActive,
    setIsAddModalActive,
    isEditModalActive,
    setIsEditModalActive,
    submittedData,
    setSubmittedData,
    submissions,
    setSubmissions,
    roundOff,
    setRoundOff,
    netAmount,
    setNetAmount,
    consignees,
    setConsignees,
    addressbook,
    setAddressbook,
    deladdressbook,
    setDelAddressbook,
    partyaddressbook,
    setPartyaddressbook,
    delivery,
    setDelivery,
    party,
    setParty,
    freighttype,
    setFreightType,
    salesperson,
    setSalesPerson,
    agtForm,
    setAgtForm,
    contractSales,
    setcontractSales,
    isFetchedCon,
    setIsFetchedCon,
    isFetchedParty,
    setIsFetchedParty,
    isFetchedSalesPerson,
    setIsFetchedSalesPerson,
    isFetchedAgtForm,
    setIsFetchedAgtForm,
    editItem,
    setEditItem,
    viewItem,
    setViewItem,
    viewIndex,
    setViewIndex,
    editIndex,
    setEditIndex,
    error,
    setError,
    orderType,
    setOrderType,
    isErrorModalOpen,
    setIsErrorModalOpen,
    isFetchedCOS,
    setisFetchedCOS,
    selectedRelatedOrders,
    setSelectedRelatedOrders,
    partyCode,
    setpartyCode,
    currentDate,
    setCurrentDate,
    docId,
    setdocId,
    detail,
    setDetail,
    // header,
    // setHeader,
    openConsigneeHelp,
    setOpenConsigneeHelp,
    openAddressBookHelp,
    setOpenAddressBookHelp,
    openDelAddressBookHelp,
    setOpenDelAddressBookHelp,
    openPartyHelp,
    setOpenPartyHelp,
    openPartyAddressBookHelp,
    setOpenPartyAddressBookHelp,
    openDeliveryHelp,
    setOpenDeliveryHelp,
    isViewModalOpen,
    setIsViewModalOpen,
    isFetchedTransaction,
    setIsFetchedTransaction,
    transaction,
    setTransaction,
    orderNumber,
    setOrderNumber,
    contractDocId,
    setContractDocId,
    selectedParty,
    setSelectedParty,
    cosono,
    setCosono,
    isFetchedCoSnO,
    setIsFetchedCoSnO,
    StrConsignee,
    setStrConsignee,
    isPriceListApplicable,
    setIsPriceListApplicable,
    currentOrderStatus,
    setCurrentOrderStatus,
    transTypeCat,
    setTransTypeCat,
    item,
    setItem,
    bf,
    setBf,
    gsm,
    setGsm,
    clientCode,
    setClientCode,
    LinkCode,
    setLinkCode,
    StrToken,
    setStrToken
  } = useOrderState()

  const [triggerFetch, setTriggerFetch] = useState<{ type: string; code: string | undefined } | null>(null)

  const [approvedpopupVisible, setApprovedpopupVisible] = useState(false)
  const [orderTypeerror, setOrderTypeerror] = useState<boolean>(false)
  const [consigneeError, setConsigneeError] = useState<string>('')
  const [partyError, setPartyError] = useState<string>('')
  const [salespersonError, setSalesPersonError] = useState<string>('')
  const [agtFormError, setAgtFormError] = useState<string>('')
  const [deliveryError, setDeliveryError] = useState<string>('')
  const [partyOrderNoError, setPartyOrderNoError] = useState<string>('')
  const [toPlaceError, setToPlaceError] = useState<string>('')
  const [siteError, setSiteError] = useState<string>('')
  const [delDateError, setDelDateError] = useState<string>('')
  const [freightTypeError, setFreightTypeError] = useState<string>('')
  const [isCopy, setIsCopy] = useState<boolean>(false)
  const [isPaste, setIsPaste] = useState<boolean>(false)
  const [isSelect, setIsSelect] = useState<boolean>(false)
  const [verifiedpopupVisible, setVerifiedpopupVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Select')
  const [TCT, setTCT] = useState<TCT[]>([]) // Store fetched data
  const { Site_Code, companyid, bu, UserName } = useParams()
  const [ohList, setOHList] = useState<clsDMSSordOH[]>([])
  const [ohHeader, setOHHeader] = useState<clsDMSSordOHHeader[]>([])
  const [notification, setNotification] = useState<NotificationInterface[]>([])
  const [orderTypeforSale, setOrderTypeforSale] = useState<OrderTypeForSale[]>([])
  const [toPlaceHelp, setToPlaceHelp] = useState<ToPlaceHelpInterface[]>([])
  const [excisableData, setExcisableData] = useState<ExcisableInterface[]>([])
  const [mergedDone, setMergedDone] = useState(false)
  const [header, setHeader] = useState<clsSaleOrderHeader>({})
  const [deliveryTo, setDeliveryTo] = useState<ConsigneeDataForSale[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [selectedOrdQty, setSelectedOrdQty] = useState<number | undefined>(undefined)
  const [TolPopupOpenIndex, setTolPopupOpenIndex] = useState<number | null>(null)
  const [selectedPercentage, setSelectedPercentage] = useState<number>(0)
  const [percentageByRow, setPercentageByRow] = useState<{ [key: number]: number }>({})

  const [openToPlaceHelp, setOpenToPlaceHelp] = useState(false)
  const [detailLoading, setDetailLoading] = useState(true)
  const [ohLoading, setOhLoading] = useState(true)

  const searchParams = useSearchParams()

  const handleChange = (index: number, value: string) => {
    setTCT(prev => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        strValue: value
      }
      return updated
    })
  }

  // const handleVtypeChange = <K extends keyof clsSaleOrderHeader>(key: K, value: clsSaleOrderHeader[K]) => {
  //   setHeader(prev => {
  //     if (!prev) return prev
  //     return {
  //       ...prev,
  //       [key]: value
  //     }
  //   })
  //   if (key === 'StrV_Type') {
  //     if (!value) {
  //       setOHHeader([])
  //       setTCT([])
  //       setOrderNumber('')
  //     } else {
  //       let tranTypeCode = ''
  //       if(key === 'StrTransactionTypeCode'){
  //         if(header && header.StrTransactionTypeCode){
  //           tranTypeCode = header.StrTransactionTypeCode

  //       }
  //       console.log('va')
  //       fetchOrderNo(
  //         value as string, // ✅ use new vtype directly
  //         companyid as string,
  //         Site_Code as string,
  //         UserName as string,
  //         bu as string,
  //         tranTypeCode
  //       )
  //     }

  //     }
  //   }
  // }

  const handleVtypeChange = <K extends keyof clsSaleOrderHeader>(key: K, value: clsSaleOrderHeader[K]) => {
    setHeader(prev => {
      if (!prev) return prev

      const updated = {
        ...prev,
        [key]: value
      }

      if (key === 'StrV_Type') {
        if (!value) {
          setOHHeader([])
          setTCT([])
          setOrderNumber('')
        } else {
          fetchOrderNo(value as string, companyid as string, Site_Code as string, UserName as string, bu as string, '')
        }
        updated.StrTransactionTypeCode = '' // Reset Transaction Type Code
        updated.StrTransactionTypeName = '' // Reset Transaction Type Name
      }

      return updated
    })
  }

  const toggleTolPopup = (ordQty?: number, index?: number) => {
    if (ordQty !== undefined) {
      setSelectedOrdQty(ordQty)
    }

    if (index === undefined) return // exit early to avoid invalid setState

    // If this row has no percentage yet, initialize to 10
    setPercentageByRow(prev => ({
      ...prev,
      [index]: prev[index] ?? 10
    }))
    if (TolPopupOpenIndex === index) {
      setTolPopupOpenIndex(null)
    } else {
      setTolPopupOpenIndex(index)
    }
  }

  const fetchOrderNo = async (
    vType: string,
    companyid: string,
    Site_Code: string,
    UserName: string,
    bu: string,
    tranTypeCode: string
  ) => {
    try {
      const response = await OrderNoAction(
        vType,
        formatDate(new Date()),
        companyid,
        Site_Code,
        UserName,
        bu,
        tranTypeCode
      )
      console.log('OrderNoResponse', response)
      const data = response
      if (data.success) {
        setOrderNumber(data.data)
      } else {
        toast.error(data.error, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        setTransaction([])
      }
    } catch (error) {
      console.error('Failed to fetch transaction types:', error)
    }
  }

  const secretKey = 'your-secret-key'

  const decryptCookie = (cookieValue: string | undefined): string | null => {
    if (!cookieValue) return null

    try {
      const bytes = CryptoJS.AES.decrypt(cookieValue, secretKey)
      const decrypted = bytes.toString(CryptoJS.enc.Utf8)
      return decrypted || null
    } catch (err) {
      console.error('Error decrypting cookie:', err)
      return null
    }
  }

  useEffect(() => {
    const value = Cookies.get('isCopy')
    const ISCOPY = decryptCookie(value)

    if (ISCOPY) {
      setIsCopy(true)
    }
  }, [isCopy])

  useEffect(() => {
    if (isAddModalActive || isEditModalActive) {
      handleCoSNoFocus(isFetchedCoSnO, setIsFetchedCoSnO, () => fetchCoSnO(docId, setCosono, contractDocId, bu))
      fetchIsPriceListApplicable()
      if (companyid && UserName && clientCode && StrToken && Site_Code) {
        fetchItemName(companyid, setItem, UserName, transTypeCat, Site_Code, bu, contractDocId)
        fetchBf(bu, companyid, setBf, UserName, contractDocId)
        fetchGsm(bu, companyid, setGsm, UserName, contractDocId)
      }
    }
  }, [isAddModalActive, isEditModalActive, companyid, UserName, Site_Code, bu])

  useEffect(() => {
    if (!triggerFetch) return

    const { type, code } = triggerFetch

    const isValid = UserName && Site_Code && companyid && bu

    if (!isValid) {
      console.warn('Missing required data for fetch')
      setTriggerFetch(null) // clean up even if invalid
      return
    }

    if (type === 'strconsignee') {
      fetchDelAddressbook(setDelAddressbook, code, UserName, Site_Code, companyid, bu)
    } else if (type === 'strdelAt') {
      fetchAddressbook(setAddressbook, code, UserName, Site_Code, companyid, bu)
    }

    setTriggerFetch(null) // ✅ always reset at the end
  }, [triggerFetch, bu, Site_Code, companyid, UserName])

  const handleClose = () => {
    setOpenConsigneeHelp(false)
    setOpenDeliveryHelp(false)
    setOpenPartyHelp(false)
    setOpenAddressBookHelp(false)
    setOpenDelAddressBookHelp(false)
    setOpenPartyAddressBookHelp(false)
    setOpenToPlaceHelp(false)
  }

  const handleTransactionFocus = (
    isFetchedTransaction: boolean,
    setIsFetchedTransaction: Dispatch<SetStateAction<boolean>>,
    v_Type: string | undefined,
    companyid: string,
    Site_Code: string,
    bu: string
  ) => {
    // if (!isFetchedTransaction) {
    fetchTransactionType(v_Type, companyid, Site_Code, bu).then(() => setIsFetchedTransaction(true))
    // }
  }

  const fetchTransactionType = async (v_Type: string | undefined, companyid: string, Site_Code: string, bu: string) => {
    try {
      const response = await TransactionTypeAction(v_Type, companyid, Site_Code, bu)
      const data: TransactionTypeDataforSale[] = response
      // console.log('TransactionType', data)
      if (data) {
        setTransaction(data)
      } else {
        toast.error('Something Went Wrong', {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        setTransaction([])
      }
    } catch (error) {
      console.error('Failed to fetch transaction types:', error)
    }
  }

  const fetchToPlace = async (companyid: string, Site_Code: string, bu: string) => {
    try {
      const response = await ToPlaceAction(companyid, Site_Code, bu)
      const data: ToPlaceHelpInterface[] = response
      if (data) {
        setToPlaceHelp(data)
      } else {
        toast.error('Something Went Wrong', {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        setTransaction([])
      }
    } catch (error) {
      console.error('Failed to fetch transaction types:', error)
    }
  }

  const fetchExcisable = async (companyid: string, Site_Code: string, bu: string) => {
    try {
      const response = await ExcisableAction(companyid, Site_Code, bu)
      const data: ExcisableInterface[] = response
      if (data) {
        setExcisableData(data)
      } else {
        toast.error('Something Went Wrong', {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        setTransaction([])
      }
    } catch (error) {
      console.error('Failed to fetch transaction types:', error)
    }
  }

  useEffect(() => {
    clientId = searchParams.get('DocId')
    if (clientId) {
      setdocId(clientId)
    }
  }, [])

  var clientId

  useEffect(() => {
    const fetchData = async () => {
      try {
        clientId = searchParams.get('DocId') // Get the clientId from URL

        if (clientId) {
          setdocId(clientId)
          const data: ApiResponse | null = await getOrderHeaderById({ clientId }, UserName, Site_Code, companyid, bu)

          if (data?.success == true) {
            // Check if data is not null and has items
            // console.log('HeaderData1', data)
            setIsPaste(false)
            setHeader(data.data[0]) // Set the fetched single object
            if (data?.data[0].StrContractSalesOrderDocID) {
              setContractDocId(data.data[0].StrContractSalesOrderDocID)
            } else {
              setContractDocId('') // or any default value you prefer
            }
            if (data.data[0].StrRecId) {
              setOrderNumber(data.data[0].StrRecId)
            }
            if (data?.data[0].StrPartyCode) {
              setSelectedParty(data.data[0].StrPartyCode)
            } else {
              setSelectedParty('') // or any default value you prefer
            }
          } else {
            const Today = formatDate(new Date()) // Execute this when data is empty or null
            setCurrentDate(Today)
          }
        } else {
          const Today = formatDate(new Date()) // Execute this when data is empty or null
          setCurrentDate(Today)
        }
      } catch (error) {
        console.error('Error fetching header data:', error)
      }
    }

    if (UserName && Site_Code && companyid && searchParams) {
      fetchData()
    }
  }, [searchParams, UserName, companyid, Site_Code, isPaste])

  useEffect(() => {
    const Today = formatDate(new Date()) // Execute this when data is empty or null

    setCurrentDate(Today)
  }, [])

  // useEffect(() => {
  //   async function getOrderNumber() {
  //     const res: orderNoInterface = await OrderNumberAction(UserName, companyid, Site_Code, bu)
  //     const clientId = searchParams.get('clientId')
  //     if (!clientId) {
  //       if (res?.success) {
  //         console.log('yaha')
  //         setOrderNumber(res?.data) // Set state if data is not null
  //       } else {
  //         // If there is an error, log the error message
  //         const errorMessage = res.error || 'Unknown error'
  //         console.error('Error:', errorMessage)
  //         toast.error(errorMessage, {
  //           position: 'top-center',
  //           autoClose: false,
  //           hideProgressBar: false,
  //           closeOnClick: false,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: 'light'
  //         })
  //         setConsignees([])
  //       }
  //     }
  //   }
  //   if (UserName && companyid && Site_Code) {
  //     getOrderNumber()
  //   }
  // }, [setOrderNumber, isSelect, UserName, companyid, Site_Code])

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (!docId) return

        setDetailLoading(true)

        const data = await getOrderDetailById({ clientIdd: docId }, UserName, Site_Code, companyid, bu)
        console.log('DetailData', data)
        if (data?.success) {
          setDetail(data.data || [])
        } else {
          setDetail([])
        }
      } catch (error) {
        console.error('Error fetching detail data:', error)
        setDetail([])
      } finally {
        setDetailLoading(false)
      }
    }

    if (UserName && Site_Code && companyid && bu) {
      fetchDetail()
    }
  }, [docId, UserName, Site_Code, companyid, bu])

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const clientId = searchParams.get('DocId')
        let resp

        if (clientId) {
          resp = await getOHheaderByDocIdAction(
            companyid as string,
            Site_Code as string,
            UserName as string,
            { clientId },
            bu as string
          )
          // console.log('ohbydocid', resp)
          setOHHeader(resp.data)
        } else {
          resp = await getOHheaderAction(
            companyid as string,
            Site_Code as string,
            UserName as string,
            bu as string,
            header?.StrV_Type as string
          )
          console.log('oh', resp)
          setOHHeader(resp.data)
        }
      } catch (err) {
        console.error('Error fetching OH header:', err)
        setOHHeader([])
      }
    }
    if (companyid && Site_Code && UserName && header?.StrV_Type && !isPaste) {
      fetchHeader()
    }
  }, [companyid, Site_Code, UserName, bu, searchParams.get('DocId'), header?.StrV_Type])

  useEffect(() => {
    const fetchOHLine = async () => {
      try {
        if (!docId || isAddModalActive) return

        setOhLoading(true)

        const data = await getOHlineByDocIdAction(companyid!, Site_Code!, UserName!, { clientId: docId }, bu!)

        if (data?.data?.length) {
          setOHList(data.data)
        } else {
          setOHList([])
        }
      } catch (error) {
        console.error('Failed to fetch OH Line details:', error)
        setOHList([])
      } finally {
        setOhLoading(false)
      }
    }

    if (companyid && Site_Code && UserName && bu) {
      fetchOHLine()
    }
  }, [docId, companyid, Site_Code, UserName, bu, isAddModalActive])

  useEffect(() => {
    const totalGross = detail.reduce((acc, item) => acc + (item.DblAmount ?? 0), 0)
    setTotalGrossAmount(totalGross)

    const totalcgst = detail.reduce((acc, item) => acc + (item.DblCGSTAmt ?? 0), 0)
    setTotalCGST(totalcgst)

    const totalsgst = detail.reduce((acc, item) => acc + (item.DblSGSTAmt ?? 0), 0)
    setTotalSGST(totalsgst)

    const totaligst = detail.reduce((acc, item) => acc + (item.DblIGSTAmt ?? 0), 0)
    setTotalIGST(totaligst)

    const totalAdditionAmt = detail.reduce((acc, item) => acc + (item.DblAdditionAmt ?? 0), 0)
    setTotalAdditionAmount(totalAdditionAmt)

    const totalDiscountAmt = detail.reduce((acc, item) => acc + (item.DblDiscAmt ?? 0), 0)
    setTotalDiscount(totalDiscountAmt)
  }, [detail, setTotalAdditionAmount, setTotalDiscount, setTotalGrossAmount, setTotalCGST, setTotalSGST, setTotalIGST])

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await SiteDataAction(companyid, UserName, bu)
        const data: Site = response

        if (data.success) {
          // setHeader(prevHeader => [
          //   {
          //     ...prevHeader[0],
          //     strSite_Code: data.data[0].Code,
          //     strSite_Name: data.data[0].Name
          //   }
          // ])
        } else {
          // If there is an error, log the error message
          const errorMessage = data.error || 'Unknown error'

          toast.error(errorMessage, {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
          // setParty([]);
        }
      } catch (error) {
        console.error('Error fetching site data:', error)
      }
    }

    if (companyid && UserName) {
      fetchSiteData()
    }
  }, [companyid, UserName])

  const submitForm = (formData: clsSaleOrderItemDetail) => {
    handleFormSubmit(
      formData,
      setSubmissions,
      setDetail,
      setSubmittedData,
      toggleAddModal,
      setTotalGrossAmount,
      setTotalCGST,
      setTotalSGST,
      setTotalIGST,
      setTotalAdditionAmount,
      setTotalDiscount,
      isAddModalActive,
      setIsAddModalActive,
      ohHeader,
      setOHHeader
    )
  }

  const submitEditForm = (formData: clsSaleOrderItemDetail) => {
    handleEditFormSubmit(
      formData,
      editIndex,
      detail,
      setDetail,
      setTotalGrossAmount,
      setTotalCGST,
      setTotalSGST,
      setTotalIGST,
      setTotalAdditionAmount,
      setTotalDiscount,
      setTotalAmount,
      setSubmissions,
      toggleEditModal,
      setHeader,
      handleReset,
      setEditIndex,
      isEditModalActive,
      setIsEditModalActive,
      ohHeader,
      setOHHeader
    )
  }

  useEffect(() => {
    const totalAdditionAmt = parseFloat(totalAdditionAmount.toFixed(2))
    const totalGrossAmt = parseFloat(totalGrossAmount.toFixed(2))
    const totalCGSTAmt = parseFloat(totalCGST.toFixed(2))
    const totalSGSTAmt = parseFloat(totalSGST.toFixed(2))
    const totalIGSTAmt = parseFloat(totalIGST.toFixed(2))
    const totalDiscountAmt = parseFloat(totalDiscount.toFixed(2))
    const calculatedTotalAmount =
      totalGrossAmt + totalAdditionAmt - totalDiscountAmt + totalCGSTAmt + totalSGSTAmt + totalIGSTAmt
    const calculatedTotalAmt = parseFloat(calculatedTotalAmount.toFixed(2))
    const calculatedRoundOff = Math.round(calculatedTotalAmt) - calculatedTotalAmt
    const totalRoundOf = parseFloat(calculatedRoundOff.toFixed(2))

    setHeader(prevHeader => ({
      ...prevHeader,
      DblGAmount: totalGrossAmt
    }))

    setHeader(prevHeader => ({
      ...prevHeader,
      DblCGSTAmt: totalCGSTAmt
    }))
    setHeader(prevHeader => ({
      ...prevHeader,
      DblSGSTAmt: totalSGSTAmt
    }))
    setHeader(prevHeader => ({
      ...prevHeader,
      DblIGSTAmt: totalIGSTAmt
    }))
    setHeader(prevHeader => ({
      ...prevHeader,
      DblAdditionAmt: totalAdditionAmt
    }))
    setHeader(prevHeader => ({
      ...prevHeader,
      DblDiscAmt: totalDiscountAmt
    }))
    setHeader(prevHeader => ({
      ...prevHeader,
      DblTotalAmt: calculatedTotalAmt
    }))
    setHeader(prevHeader => ({
      ...prevHeader,
      DblROffAmt: totalRoundOf
    }))
    setHeader(prevHeader => ({
      ...prevHeader,
      DblNAmount: netAmount
    }))

    setTotalAmount(calculatedTotalAmount)
    setRoundOff(calculatedRoundOff)
    setNetAmount(calculatedTotalAmount + calculatedRoundOff)
  }, [
    totalGrossAmount,
    totalAdditionAmount,
    totalDiscount,
    totalCGST,
    totalSGST,
    totalIGST,
    roundOff,
    netAmount,
    setHeader,
    setNetAmount,
    setRoundOff,
    setTotalAmount
  ])

  const handlePostSubmit = async (
    // setIsPlaced: Dispatch<React.SetStateAction<boolean>>,
    event: React.MouseEvent<HTMLButtonElement>,
    header: clsSaleOrderHeader | null,
    setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>>,
    detail: clsSaleOrderItemDetail[],
    setDetail: Dispatch<SetStateAction<clsSaleOrderItemDetail[]>>,
    docId: string,
    setIsModalOpen: Dispatch<React.SetStateAction<boolean>>,
    setIsSelect: Dispatch<SetStateAction<boolean>>,
    bu: string | null
  ) => {
    event.preventDefault()
    setIsSaving(true)
    // console.log('Submitted TCT values:', TCT)
    const updatedPostFormData: clsSaleOrderHeader = {
      StrDocID: header?.StrDocID || '',
      StrV_Type: header?.StrV_Type || '',
      StrV_TypeDesc: header?.StrV_TypeDesc || '',
      StrTransactionTypeCode: header?.StrTransactionTypeCode || '',
      StrTransactionTypeName: header?.StrTransactionTypeName || '',
      StrRecId: header?.StrRecId || '',
      StrV_Date: header?.StrV_Date || new Date().toISOString().split('T')[0], // current date
      StrSiteList_Code: header?.StrSiteList_Code || '',
      StrSiteList_Name: header?.StrSiteList_Name || '',
      IntV_No: header?.IntV_No || 0,
      StrRecIdPrefix: header?.StrRecIdPrefix || '',
      IntV_Prefix: header?.IntV_Prefix || 0,
      StrPartyCode: header?.StrPartyCode || '',
      StrPartyName: header?.StrPartyName || '',
      StrDistributor: header?.StrDistributor || '',
      StrDistributorName: header?.StrDistributorName || '',
      StrSalesPersonCode: header?.StrSalesPersonCode || '',
      StrSalesPersonName: header?.StrSalesPersonName || '',
      strSaleInvoiceV_Type: header?.strSaleInvoiceV_Type || '',
      StrSaleInvoiceV_TypeDesc: header?.StrSaleInvoiceV_TypeDesc || '',
      StrContractSalesOrderDocID: header?.StrContractSalesOrderDocID || '',
      StrContractSalesOrderNo: header?.StrContractSalesOrderNo || '',
      StrPartyOrdNo: header?.StrPartyOrdNo || '',
      StrPartyOrdDt: header?.StrPartyOrdDt || '',
      StrConsignee: header?.StrConsignee || '',
      StrConsigneeName: header?.StrConsigneeName || '',
      StrPerformaInvoiceDocid: header?.StrPerformaInvoiceDocid || '',
      StrPerformaInvoiceNo: header?.StrPerformaInvoiceNo || '',
      StrAgainstFormCode: header?.StrAgainstFormCode || '',
      StrAgainstFormName: header?.StrAgainstFormName || '',
      StrExcisableCode: header?.StrExcisableCode || '',
      StrExcisableName: header?.StrExcisableName || '',
      StrOrderTypeCode: header?.StrOrderTypeCode || '',
      StrOrderTypeName: header?.StrOrderTypeName || '',
      StrDelAt: header?.StrDelAt || '',
      StrDelAtName: header?.StrDelAtName || '',
      StrDelDate: header?.StrDelDate || '',
      StrDelDateBeforEdit: header?.StrDelDateBeforEdit || '',
      StrToPlace: header?.StrToPlace || '',
      StrToPlaceName: header?.StrToPlaceName || '',
      StrPriceListDocID: header?.StrPriceListDocID || '',
      StrPriceListNo: header?.StrPriceListNo || '',
      StrPolicyApplyYN: header?.StrPolicyApplyYN || '',
      StrPolicyApplicableOnCode: header?.StrPolicyApplicableOnCode || '',
      strPolicyDocID: header?.strPolicyDocID || '',
      strPolicyNo: header?.strPolicyNo || '',
      strCurrencyDependOn: header?.strCurrencyDependOn || '',
      strCurrencyDependOnName: header?.strCurrencyDependOnName || '',
      ImportOrderYN: header?.ImportOrderYN || '',
      StrRevisionNo: header?.StrRevisionNo || '',
      StrTransfered: header?.StrTransfered || '',
      strAmendmentOrderDocID: header?.strAmendmentOrderDocID || '',
      strAmendmentOrderNo: header?.strAmendmentOrderNo || '',
      IntCreditDays: header?.IntCreditDays || 0,
      StrCurrencyCode: header?.StrCurrencyCode || '',
      StrCurrencyName: header?.StrCurrencyName || '',
      StrPreparedBy: header?.StrPreparedBy || '',
      StrModifiedBy: header?.StrModifiedBy || '',
      StrModifiedDate: header?.StrModifiedDate || '',
      StrApprovedBy: header?.StrApprovedBy || '',
      StrApprovedDate: header?.StrApprovedDate || '',
      StrVerifiedBy: header?.StrVerifiedBy || '',
      StrVerifiedDate: header?.StrVerifiedDate || '',
      StrRemarks: header?.StrRemarks || '',
      StrToleranceModifiedBy: header?.StrToleranceModifiedBy || '',
      StrToleranceModifiedDate: header?.StrToleranceModifiedDate || '',
      StrDiscountBy: header?.StrDiscountBy || '',
      StrDiscountDate: header?.StrDiscountDate || '',
      DblIGSTAMT: header?.DblIGSTAMT || 0,
      DblCGSTAMT: header?.DblCGSTAMT || 0,
      DblSGSTAMT: header?.DblSGSTAMT || 0,
      DblUGSTAMT: header?.DblUGSTAMT || 0,
      DblCESSAMT: header?.DblCESSAMT || 0,
      DblGAmount: header?.DblGAmount || 0,
      DblTotalAmt: header?.DblTotalAmt || 0,
      DblNAmount: header?.DblNAmount || 0,
      DblROffAmt: header?.DblROffAmt || 0,
      DblAdditionAmt: header?.DblAdditionAmt || 0,
      DblDiscAmt: header?.DblDiscAmt || 0,
      DblTaxableValue: header?.DblTaxableValue || 0,
      dblCMN_Addition: header?.dblCMN_Addition || 0,
      dblCMN_Deduction: header?.dblCMN_Deduction || 0,

      clsSaleOrderItemDetail: detail,
      clsSaleOrderOH: ohHeader,
      clsTermCondition: TCT
    }

    setIsModalOpen(false)
    let res: Add_PlaceOrder | null = null
    console.log(JSON.stringify(updatedPostFormData, null, 2))
    try {
      res = await placeOrderAction(
        updatedPostFormData,
        UserName as string,
        Site_Code as string,
        companyid as string,
        bu as string
      )
      // console.log('res', res)
      const showToastAndReload = async () => {
        if (res?.success) {
          // Show success toast
          if (docId === '') {
            toast.success('Order Placed Successfully!', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            })

            // Reset the state of the header and detail
            setHeader({
              ...header,
              StrDocID: '',
              StrV_Type: '',
              StrV_TypeDesc: '',
              StrTransactionTypeCode: '',
              StrTransactionTypeName: '',
              StrRecId: '',
              StrV_Date: new Date().toISOString().split('T')[0], // current date
              StrSiteList_Code: '',
              StrSiteList_Name: '',
              IntV_No: 0,
              StrRecIdPrefix: '',
              IntV_Prefix: 0,
              StrPartyCode: '',
              StrPartyName: '',
              StrDistributor: '',
              StrDistributorName: '',
              StrSalesPersonCode: '',
              StrSalesPersonName: '',
              strSaleInvoiceV_Type: '',
              StrSaleInvoiceV_TypeDesc: '',
              StrContractSalesOrderDocID: '',
              StrContractSalesOrderNo: '',
              StrPartyOrdNo: '',
              StrPartyOrdDt: '',
              StrConsignee: '',
              StrConsigneeName: '',
              StrPerformaInvoiceDocid: '',
              StrPerformaInvoiceNo: '',
              StrAgainstFormCode: '',
              StrAgainstFormName: '',
              StrExcisableCode: '',
              StrExcisableName: '',
              StrOrderTypeCode: '',
              StrOrderTypeName: '',
              StrDelAt: '',
              StrDelAtName: '',
              StrDelDate: '',
              StrDelDateBeforEdit: '',
              StrToPlace: '',
              StrToPlaceName: '',
              StrPriceListDocID: '',
              StrPriceListNo: '',
              StrPolicyApplyYN: '',
              StrPolicyApplicableOnCode: '',
              strPolicyDocID: '',
              strPolicyNo: '',
              strCurrencyDependOn: '',
              strCurrencyDependOnName: '',
              ImportOrderYN: '',
              StrRevisionNo: '',
              StrTransfered: '',
              strAmendmentOrderDocID: '',
              strAmendmentOrderNo: '',
              IntCreditDays: 0,
              StrCurrencyCode: '',
              StrCurrencyName: '',
              StrPreparedBy: '',
              StrModifiedBy: '',
              StrModifiedDate: '',
              StrApprovedBy: '',
              StrApprovedDate: '',
              StrVerifiedBy: '',
              StrVerifiedDate: '',
              StrRemarks: '',
              StrToleranceModifiedBy: '',
              StrToleranceModifiedDate: '',
              StrDiscountBy: '',
              StrDiscountDate: '',
              DblIGSTAMT: 0,
              DblCGSTAMT: 0,
              DblSGSTAMT: 0,
              DblUGSTAMT: 0,
              DblCESSAMT: 0,
              DblGAmount: 0,
              DblTotalAmt: 0,
              DblNAmount: 0,
              DblROffAmt: 0,
              DblAdditionAmt: 0,
              DblDiscAmt: 0,
              DblTaxableValue: 0,
              dblCMN_Addition: 0,
              dblCMN_Deduction: 0,

              clsSaleOrderItemDetail: [],
              clsSaleOrderOH: [],
              clsTermCondition: []
            })

            setDetail([
              {
                ...detail[0],
                StrDocID: '',
                Intv_SNo: 0,
                StrGoodsServices: '',
                StrGoodsServicesName: '',
                StrClosed: '',
                strOrderCloseRemark: '',
                IntcontractSoV_Sno: 0,
                IntCO_ItemRateSNo: 0,
                StrItemCode: '',
                StrItemName: '',
                StritemDesc: '',
                StrBf: '',
                StrBFName: '',
                DblWidth: 0,
                DblLength: 0,
                StrSizeUnit: '',
                // StrSizeUnitName?: string
                DblSizeInch: 0,
                DblSizeCm: 0,
                StrGrain: '',
                StrGrainName: '',
                StrGsm: '',
                StrGsmName: '',
                StrCorePipeCode: '',
                StrCorePipeName: '',
                DblOuterDIA: 0,
                DblInnerDIA: 0,
                DblBulk: 0,
                DblPerReelWeight: 0,
                DblReel: 0,
                DblWeightSDU: 0,
                StrSDU: '',
                DblConverstionRate: 0,
                DblWeight: 0,
                DblShortWeight: 0,
                Dtrtl_ExcessPer: 0,
                Dbltl_ExcessQty: 0,
                StrSKU: '',
                DblRate: 0,
                DblAmount: 0,
                StrLocalCurrencyCode: '',
                StrLocalCurrencyName: '',
                DblRateFC: 0,
                DblAmountFC: 0,
                DblCurrencyExchangeRate: 0,
                StrForeignCurrencyCode: '',
                StrForeignCurrencyName: '',
                DblOrderNetValue: 0,
                DblLineDiscount: 0,
                DblItemNetAmount: 0,
                DblAgreedRate: 0,
                StrItemGroupCode: '',
                StrItemGroupName: '',
                strPackingType: '',
                strPackingTypeName: '',
                StrStatus: '',
                StrStatusName: '',
                DblExchangeRate: 0,
                DblTaxableValue: 0,
                DblItemNetValue: 0,
                DblIGST_Per: 0,
                DblCGST_Per: 0,
                DblSGST_Per: 0,
                DblUGST_Per: 0,
                DblCess_Per: 0,
                DblIGSTAmt: 0,
                DblCGSTAmt: 0,
                DblSGSTAmt: 0,
                DblUGSTAmt: 0,
                DblCessAmt: 0,
                DblAdditionAmt: 0,
                DblDiscAmt: 0,
                DblItemValue: 0,
                DblServiceValue: 0,
                DblInsuranceValue: 0,
                DblFreightValue: 0,

                clsSaleOrderOHLine: []
              }
            ])

            initializePartyOrderDate() // Sets today's party order date
            fetchEnviroDataAndSetDeliveryDate() // Fetches delivery date from API
            setTCT([])
            setOHHeader([])
            setOrderNumber('')
            setIsSelect(true)
            setIsPlaced(true)
            // header?.StrOrderTypeCode
          } else {
            toast.success('Order Edited Successfully!', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            })
          }
        } else {
          toast.error(res?.error, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
        }
      }

      showToastAndReload()
    } catch (error) {
      toast.error('API call failed', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
    setIsSaving(false)
  }

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // if (header?.strapprovedBy) {
    //   setApprovedpopupVisible(true)
    // }
    // else if (header?.struserVerifiedBy) {
    //   setVerifiedpopupVisible(true)
    // }
    //  else {
    const validateField = (
      fieldValue: string | undefined,
      setError: React.Dispatch<React.SetStateAction<string>>,
      errorMessage: string
    ) => {
      if (!fieldValue) {
        setError(errorMessage)
        return false
      }
      setError('')
      return true
    }

    const isPartyValid = validateField(header?.StrPartyCode, setPartyError, 'Please fill Party')
    const isDeliveryValid = validateField(header?.StrDelAt, setDeliveryError, 'Please fill Delivery To')
    const isPartyOrderNoValid = validateField(
      header?.StrPartyOrdNo,
      setPartyOrderNoError,
      'Please fill party order number'
    )
    const isAgtFormValid = validateField(header?.StrAgainstFormCode, setAgtFormError, 'Please fill Against Form')

    if (header) {
      const orderDateString = header?.StrV_Date
        ? new Date(header?.StrV_Date)
            .toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })
            .replace(/ /g, '/') // Replace spaces with slashes
        : isPaste
          ? new Date(currentDate)
              .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })
              .replace(/ /g, '/')
          : new Date(currentDate)
              .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })
              .replace(/ /g, '/')

      const deliveryDateString = header?.StrDelDate
      const partyorderDateString = header?.StrPartyOrdDt

      let FlgDateCon = false

      if (orderDateString && deliveryDateString) {
        const orderDate = new Date(orderDateString)
        const deliveryDate = new Date(deliveryDateString)

        if (orderDate > deliveryDate) {
          FlgDateCon = true
          setDelDateError('Order date is greater than delivery date')
          return
        } else {
          FlgDateCon = false
          setDelDateError('')
        }
      } else {
        FlgDateCon = true
        setDelDateError(' order date or delivery date is missing or invalid')
      }

      if (partyorderDateString && deliveryDateString) {
        const partyorderDate = new Date(partyorderDateString)
        const deliveryDate = new Date(deliveryDateString)

        if (partyorderDate > deliveryDate) {
          FlgDateCon = true
          setDelDateError('Party Order date is greater than delivery date')
          return
        } else {
          FlgDateCon = false
          setDelDateError('')
        }
      } else {
        FlgDateCon = true
        setDelDateError('Party order date or delivery date is missing or invalid')
        return
      }
    }

    if (
      isPartyValid &&
      isDeliveryValid &&
      isPartyOrderNoValid &&
      // isSiteValid &&
      // isSalesPersonValid &&
      // isFreightTypeValid &&
      isAgtFormValid
    ) {
      handlePostSubmit(
        // setIsPlaced,
        event,
        header,
        setHeader,
        detail,
        setDetail,
        docId, // Ensure `docId` is defined and available in your component
        setIsModalOpen,
        // UserName, // Ensure `StrUserCode` is defined and available
        setIsSelect,
        bu
      )
    }
    // }
  }

  var status
  useEffect(() => {
    status = searchParams.get('status')
    console.log('status', status)
    if (status) {
      setCurrentOrderStatus(status)
    }
  }, [])

  const handleAddClick = async () => {
    if ((!header?.StrOrderTypeCode || header?.StrOrderTypeCode === 'Select') && docId === '') {
      setOrderTypeerror(true)
    } else {
      setOrderTypeerror(false)

      // Fetch OH Line Data
      await fetchOHLineData()

      // Then open modal
      toggleAddModal(isAddModalActive, setIsAddModalActive)
    }
  }

  const fetchOHLineData = async () => {
    try {
      const data: LineOH = await getOHlineAction(
        companyid as string,
        Site_Code as string,
        UserName as string,
        bu as string,
        header?.StrV_Type as string
      )
      if (data) {
        setOHList(data.data)
      }
    } catch (error) {
      console.error('Error fetching OH Line data:', error)
    }
  }

  const handleContractSalesOrderFocus = (
    isFetchedCOS: boolean,
    setisFetchedCOS: Dispatch<SetStateAction<boolean>>,
    setcontractSales: Dispatch<React.SetStateAction<Contract[]>>,
    docId: string,
    selectedParty: string,
    PartyCode: string | number | true | object,
    username: string | number | true | object | null,
    bu: string | number | true | object | null
  ) => {
    if (true) {
      fetchContractSalesOrder(setcontractSales, docId, selectedParty, PartyCode, username, bu).then(() =>
        setisFetchedCOS(true)
      )
    }
  }

  const fetchContractSalesOrder = async (
    setcontractSales: Dispatch<React.SetStateAction<Contract[]>>,
    docId: string,
    selectedParty: string,
    PartyCode: string | number | true | object,
    username: string | number | true | object | null,
    bu: string | number | true | object | null
  ) => {
    try {
      // Assuming that ContractSalesOrderAction expects a docId string as a parameter, not setContractDocId
      const response = await ContractSalesOrderAction(
        docId,
        selectedParty,
        PartyCode,
        username,
        Site_Code as string,
        companyid as string,
        bu
      )

      const data: Contract = response

      if (data.success) {
        setcontractSales([data])
      } else {
        // If there is an error, log the error message
        const errorMessage = data.error

        toast.error('Something Went Wrong', {})
        setcontractSales([])
      }
    } catch (error) {
      console.error('Failed to fetch contract sales order:', error)
    }
  }

  // const handleContractSalesOrderChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>,
  //   contractSales: Contract[],
  //   setHeader: React.Dispatch<React.SetStateAction<clsSaleOrderHeader | null>>,
  //   setContractDocId: React.Dispatch<React.SetStateAction<string | undefined>>
  // ) => {
  //   const code = event.target.value
  //   const coData = contractSales[0]?.data.find(ele => ele.DocId == code)
  //   if (coData) {
  //     setHeader(prevHeader => [
  //       {
  //         ...prevHeader[0],
  //         strContractSalesOrder: coData.DocId,
  //         strContractSalesOrderValue: coData.OrderNo
  //       }
  //     ])
  //     setContractDocId(coData.DocId)
  //     setDetail([])
  //   } else {
  //     setHeader(prevHeader => [
  //       {
  //         ...prevHeader[0],
  //         strContractSalesOrder: '',
  //         strContractSalesOrderValue: ''
  //       }
  //     ])
  //     setContractDocId('')
  //     setDetail([])
  //   }
  // }

  const handleContractSalesOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    contractSales: Contract[],
    setHeader: React.Dispatch<React.SetStateAction<clsSaleOrderHeader>>,
    setContractDocId: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => {
    const code = event.target.value
    const coData = contractSales[0]?.data.find(ele => ele.DocId === code)

    setHeader(prevHeader =>
      prevHeader
        ? {
            ...prevHeader,
            StrContractSalesOrderDocID: coData?.DocId ?? '',
            StrContractSalesOrderNo: coData?.OrderNo ?? ''
          }
        : prevHeader
    )

    setContractDocId(coData?.DocId ?? '')
    setDetail([])
  }

  const handleCoSNoFocus = (
    isFetchedCoSnO: boolean,
    setIsFetchedCoSnO: Dispatch<SetStateAction<boolean>>,
    fetchCoSnO: () => Promise<void>
  ) => {
    fetchCoSnO()
  }

  const fetchCoSnO = async (
    docId: string,
    setCosono: React.Dispatch<React.SetStateAction<cosno[]>>,
    contractDocId: string | undefined,
    bu: string | null
  ) => {
    try {
      const response = await cosonoAction(
        docId,
        contractDocId,
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu
      )
      const data: cosno = response

      if (data) {
        setCosono([data])
      }
    } catch (error) {
      console.error('Failed to fetch item name:', error)
    }
  }

  // Your fetch function
  const fetchIsPriceListApplicable = async () => {
    try {
      // Call the action that returns the response
      const response = await IsPriceListApplicableAction(
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )

      // Assuming the response is of type PriceListResponse
      const data: IsPriceListResponse = response
      // You can now use the response data with proper type checking
      if (data.statusCode === 200) {
        // This will print "Price is applicable."
        // Do something with the data here
      } else {
      }

      // Handle data appropriately
      setIsPriceListApplicable(data.statusCode) // Assuming setCosono expects a list
    } catch (error) {
      console.error('Failed to fetch item name:', error)
    }
  }

  const handleCoSoNoChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    cosono: cosno[],
    setFormData: React.Dispatch<React.SetStateAction<DMSSordItemDetailUpdatePostData>>
  ) => {
    const selectedcOsNoName = event.target.value

    // Find the corresponding ItemCode object for the selected ItemName
    const selectedItem = cosono.find(item => item.data[0].V_SNo == Number(selectedcOsNoName))

    if (selectedItem) {
      setFormData(prevFormData => ({
        ...prevFormData,
        // intcontractSo_Sno: selectedItem.ConCode,
        intcontractSoV_Sno: selectedItem.data[0].V_SNo,
        strcontractSoDocId: selectedItem.data[0].DocId
      }))
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        intcontractSoV_Sno: 0,
        strcontractSoDocId: ''
      }))
    }
  }

  useEffect(() => {
    if (contractSales.length === 0) {
      setContractDocId('')
    } else {
    }
  }, [contractSales])

  const handleCopy = () => {
    setIsCopy(true)

    const encryptedDocId = CryptoJS.AES.encrypt(docId, secretKey).toString()
    Cookies.set('docId', encryptedDocId)

    const encryptedisCopy = CryptoJS.AES.encrypt('1', secretKey).toString()
    Cookies.set('isCopy', encryptedisCopy)

    toast('Copied!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
  }

  const handlePaste = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setSelectedOption(selectedValue)
    // if (!isCopy) return; // Early return if not a copy action
    setIsPaste(true)
    setIsCopy(false)
    // secureLocalStorage.setItem('isCopy', "0");

    const encryptedisCopy = CryptoJS.AES.encrypt('0', secretKey).toString()
    Cookies.set('isCopy', encryptedisCopy)

    // const clientId = secureLocalStorage.getItem('docId');

    const value = Cookies.get('docId')
    const clientId = decryptCookie(value)

    // Ensure clientId is a string or null
    if (typeof clientId !== 'string') {
      setCurrentDate(formatDate(new Date())) // Set current date if invalid
      return
    }

    if (!clientId) {
      setCurrentDate(formatDate(new Date())) // Set current date if no clientId
      return
    }

    // Fetch header data
    const fetchHeaderData = async () => {
      try {
        // Pass clientId to getOrderHeaderById (no change needed here)
        const data: ApiResponse | null = await getOrderHeaderById({ clientId }, UserName, Site_Code, companyid, bu)

        if (data?.success == true) {
          setHeader(data.data[0])
          const headerData = data.data[0]
          // Filter out unwanted fields from headerData
          const { StrPartyOrdNo, StrPartyOrdDt, StrDelDate, StrV_Date, ...filteredData } = headerData

          // Set the filtered data into state (excluding unwanted fields)
          setHeader(filteredData)
          setContractDocId(headerData.StrContractSalesOrderDocID || '')
          setSelectedParty(headerData.StrPartyCode || '')
        } else {
          setCurrentDate(formatDate(new Date()))
        }
      } catch (error) {
        console.error('Error fetching header data:', error)
      }
    }

    const fetchDetailData = async () => {
      try {
        const data: ApiResponseDetail | null = await getOrderDetailById(
          { clientIdd: clientId },
          UserName,
          Site_Code,
          companyid,
          bu
        )

        if (data?.success) {
          const detailList = data.data

          // Call OH fetch separately before or after, ensure OHList is filled
          const ohData: LineOH = await getOHlineByDocIdAction(
            companyid as string,
            Site_Code as string,
            UserName as string,
            { clientId },
            bu as string
          )

          const mergedDetail = detailList.map(detailItem => {
            const matchingOH = ohData?.data?.filter(oh => oh.intV_Sno === detailItem.Intv_SNo) || []

            return {
              ...detailItem,
              clsSaleOrderOHLine: matchingOH // Merge OH data here
            }
          })

          console.log('Merged Detail with OH Data:', mergedDetail)
          setDetail(mergedDetail)
        }
      } catch (error) {
        console.error('Error fetching detail data:', error)
      }
    }

    const fetchTCTData = async () => {
      try {
        const data: TCTData = await GetTermsCondAction({ clientId }, UserName, Site_Code, companyid, bu)
        if (data) {
          setTCT(data.data)
        }
      } catch (error) {
        console.error('Error fetching detail data:', error)
      }
    }

    const fetchOHHeaderData = async () => {
      try {
        const data: HeaderOH = await getOHheaderByDocIdAction(
          companyid as string,
          Site_Code as string,
          UserName as string,
          { clientId },
          bu as string
        )

        if (data) {
          console.log('OH Header Data:', data.data)
          setOHHeader(data.data)
        }
      } catch (error) {
        console.error('Error fetching detail data:', error)
      }
    }

    // Prepare an array of promises based on the selected value
    const promises: Promise<void>[] = []
    if (selectedValue == 'Select') {
      setIsSelect(true)
      setIsPaste(false)

      setHeader(prevHeader => ({
        ...prevHeader,
        StrDocID: '',
        StrV_Type: '',
        StrV_TypeDesc: '',
        StrTransactionTypeCode: '',
        StrTransactionTypeName: '',
        StrRecId: '',
        StrV_Date: new Date().toISOString().split('T')[0], // current date
        StrSiteList_Code: '',
        StrSiteList_Name: '',
        IntV_No: 0,
        StrRecIdPrefix: '',
        IntV_Prefix: 0,
        StrPartyCode: '',
        StrPartyName: '',
        StrDistributor: '',
        StrDistributorName: '',
        StrSalesPersonCode: '',
        StrSalesPersonName: '',
        strSaleInvoiceV_Type: '',
        StrSaleInvoiceV_TypeDesc: '',
        StrContractSalesOrderDocID: '',
        StrContractSalesOrderNo: '',
        StrPartyOrdNo: '',
        StrPartyOrdDt: '',
        StrConsignee: '',
        StrConsigneeName: '',
        StrPerformaInvoiceDocid: '',
        StrPerformaInvoiceNo: '',
        StrAgainstFormCode: '',
        StrAgainstFormName: '',
        StrExcisableCode: '',
        StrExcisableName: '',
        StrOrderTypeCode: '',
        StrOrderTypeName: '',
        StrDelAt: '',
        StrDelAtName: '',
        StrDelDate: '',
        StrDelDateBeforEdit: '',
        StrToPlace: '',
        StrToPlaceName: '',
        StrPriceListDocID: '',
        StrPriceListNo: '',
        StrPolicyApplyYN: '',
        StrPolicyApplicableOnCode: '',
        strPolicyDocID: '',
        strPolicyNo: '',
        strCurrencyDependOn: '',
        strCurrencyDependOnName: '',
        ImportOrderYN: '',
        StrRevisionNo: '',
        StrTransfered: '',
        strAmendmentOrderDocID: '',
        strAmendmentOrderNo: '',
        IntCreditDays: 0,
        StrCurrencyCode: '',
        StrCurrencyName: '',
        StrPreparedBy: '',
        StrModifiedBy: '',
        StrModifiedDate: '',
        StrApprovedBy: '',
        StrApprovedDate: '',
        StrVerifiedBy: '',
        StrVerifiedDate: '',
        StrRemarks: '',
        StrToleranceModifiedBy: '',
        StrToleranceModifiedDate: '',
        StrDiscountBy: '',
        StrDiscountDate: '',
        DblIGSTAMT: 0,
        DblCGSTAMT: 0,
        DblSGSTAMT: 0,
        DblUGSTAMT: 0,
        DblCESSAMT: 0,
        DblGAmount: 0,
        DblTotalAmt: 0,
        DblNAmount: 0,
        DblROffAmt: 0,
        DblAdditionAmt: 0,
        DblDiscAmt: 0,
        DblTaxableValue: 0,
        dblCMN_Addition: 0,
        dblCMN_Deduction: 0,

        clsSaleOrderItemDetail: [],
        clsSaleOrderOH: [],
        clsTermCondition: []
      }))

      setDetail(prevHeader => [
        {
          ...prevHeader[0],
          StrDocID: '',
          Intv_SNo: 0,
          StrGoodsServices: '',
          StrGoodsServicesName: '',
          StrClosed: '',
          strOrderCloseRemark: '',
          IntcontractSoV_Sno: 0,
          IntCO_ItemRateSNo: 0,
          StrItemCode: '',
          StrItemName: '',
          StritemDesc: '',
          StrBf: '',
          StrBFName: '',
          DblWidth: 0,
          DblLength: 0,
          StrSizeUnit: '',
          // StrSizeUnitName?: string
          DblSizeInch: 0,
          DblSizeCm: 0,
          StrGrain: '',
          StrGrainName: '',
          StrGsm: '',
          StrGsmName: '',
          StrCorePipeCode: '',
          StrCorePipeName: '',
          DblOuterDIA: 0,
          DblInnerDIA: 0,
          DblBulk: 0,
          DblPerReelWeight: 0,
          DblReel: 0,
          DblWeightSDU: 0,
          StrSDU: '',
          DblConverstionRate: 0,
          DblWeight: 0,
          DblShortWeight: 0,
          Dtrtl_ExcessPer: 0,
          Dbltl_ExcessQty: 0,
          StrSKU: '',
          DblRate: 0,
          DblAmount: 0,
          StrLocalCurrencyCode: '',
          StrLocalCurrencyName: '',
          DblRateFC: 0,
          DblAmountFC: 0,
          DblCurrencyExchangeRate: 0,
          StrForeignCurrencyCode: '',
          StrForeignCurrencyName: '',
          DblOrderNetValue: 0,
          DblLineDiscount: 0,
          DblItemNetAmount: 0,
          DblAgreedRate: 0,
          StrItemGroupCode: '',
          StrItemGroupName: '',
          strPackingType: '',
          strPackingTypeName: '',
          StrStatus: '',
          StrStatusName: '',
          DblExchangeRate: 0,
          DblTaxableValue: 0,
          DblItemNetValue: 0,
          DblIGST_Per: 0,
          DblCGST_Per: 0,
          DblSGST_Per: 0,
          DblUGST_Per: 0,
          DblCess_Per: 0,
          DblIGSTAmt: 0,
          DblCGSTAmt: 0,
          DblSGSTAmt: 0,
          DblUGSTAmt: 0,
          DblCessAmt: 0,
          DblAdditionAmt: 0,
          DblDiscAmt: 0,
          DblItemValue: 0,
          DblServiceValue: 0,
          DblInsuranceValue: 0,
          DblFreightValue: 0,

          clsSaleOrderOHLine: []
        }
      ])
      setTCT([])
      // const generalData: TCTData = await TermsCondAction(header?.StrV_Type as string, companyid, Site_Code, bu)
      // if (generalData) {
      //   setTCT(generalData.data)
      // } else {
      //   setTCT([])
      // }

      // const resp = await getOHheaderAction(
      //   companyid as string,
      //   Site_Code as string,
      //   UserName as string,
      //   bu as string,
      //   header?.StrV_Type || ''
      // )
      setOHHeader([])

      return
    }

    if (selectedValue === 'All') {
      setIsSelect(false)
      // If 'All' is selected, fetch both header and detail data
      promises.push(fetchHeaderData(), fetchDetailData(), fetchTCTData(), fetchOHHeaderData())
      console.log('pasteall')
    } else if (selectedValue === 'Detail') {
      setIsSelect(false)
      // If 'Detail' is selected, only fetch the detail data
      setHeader(prevHeader => ({
        ...prevHeader,
        StrDocID: '',
        StrV_Type: '',
        StrV_TypeDesc: '',
        StrTransactionTypeCode: '',
        StrTransactionTypeName: '',
        StrRecId: '',
        StrV_Date: new Date().toISOString().split('T')[0], // current date
        StrSiteList_Code: '',
        StrSiteList_Name: '',
        IntV_No: 0,
        StrRecIdPrefix: '',
        IntV_Prefix: 0,
        StrPartyCode: '',
        StrPartyName: '',
        StrDistributor: '',
        StrDistributorName: '',
        StrSalesPersonCode: '',
        StrSalesPersonName: '',
        strSaleInvoiceV_Type: '',
        StrSaleInvoiceV_TypeDesc: '',
        StrContractSalesOrderDocID: '',
        StrContractSalesOrderNo: '',
        StrPartyOrdNo: '',
        StrPartyOrdDt: '',
        StrConsignee: '',
        StrConsigneeName: '',
        StrPerformaInvoiceDocid: '',
        StrPerformaInvoiceNo: '',
        StrAgainstFormCode: '',
        StrAgainstFormName: '',
        StrExcisableCode: '',
        StrExcisableName: '',
        StrOrderTypeCode: '',
        StrOrderTypeName: '',
        StrDelAt: '',
        StrDelAtName: '',
        StrDelDate: '',
        StrDelDateBeforEdit: '',
        StrToPlace: '',
        StrToPlaceName: '',
        StrPriceListDocID: '',
        StrPriceListNo: '',
        StrPolicyApplyYN: '',
        StrPolicyApplicableOnCode: '',
        strPolicyDocID: '',
        strPolicyNo: '',
        strCurrencyDependOn: '',
        strCurrencyDependOnName: '',
        ImportOrderYN: '',
        StrRevisionNo: '',
        StrTransfered: '',
        strAmendmentOrderDocID: '',
        strAmendmentOrderNo: '',
        IntCreditDays: 0,
        StrCurrencyCode: '',
        StrCurrencyName: '',
        StrPreparedBy: '',
        StrModifiedBy: '',
        StrModifiedDate: '',
        StrApprovedBy: '',
        StrApprovedDate: '',
        StrVerifiedBy: '',
        StrVerifiedDate: '',
        StrRemarks: '',
        StrToleranceModifiedBy: '',
        StrToleranceModifiedDate: '',
        StrDiscountBy: '',
        StrDiscountDate: '',
        DblIGSTAMT: 0,
        DblCGSTAMT: 0,
        DblSGSTAMT: 0,
        DblUGSTAMT: 0,
        DblCESSAMT: 0,
        DblGAmount: 0,
        DblTotalAmt: 0,
        DblNAmount: 0,
        DblROffAmt: 0,
        DblAdditionAmt: 0,
        DblDiscAmt: 0,
        DblTaxableValue: 0,
        dblCMN_Addition: 0,
        dblCMN_Deduction: 0,

        clsSaleOrderItemDetail: [],
        clsSaleOrderOH: [],
        clsTermCondition: []
      }))
      // const generalData: TCTData = await TermsCondAction(header?.StrV_Type as string, companyid, Site_Code, bu)
      // if (generalData) {
      //   setTCT(generalData.data)
      // } else {
      //   setTCT([])
      // }
      // const resp = await getOHheaderAction(
      //   companyid as string,
      //   Site_Code as string,
      //   UserName as string,
      //   bu as string,
      //   header?.StrV_Type || ''
      // )
      setOHHeader([])
      setTCT([])
      console.log('pastedetail')
      promises.push(fetchDetailData())
    }

    // Wait for all promises to resolve in parallel
    await Promise.all(promises)

    if (header) {
      await fetchEnviroDataAndSetDeliveryDate()
      initializePartyOrderDate()
    }
  }

  const fetchPartyData = async (
    setParty: Dispatch<SetStateAction<PartyDataforSaleOrder[]>>,
    strV_TypeCode: string | undefined,
    Site_Code: string | number | true | object | null,
    companyid: string | number | true | object | null,
    bu: string | number | true | object | null
  ) => {
    try {
      const response = await PartyAction(strV_TypeCode, Site_Code, companyid, bu)
      const data: PartyDataforSaleOrder[] = response
      if (data) {
        setParty(data)
      } else {
        // If there is an error, log the error message
        const errorMessage = 'Unknown error'

        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        // setParty([]);
      }
    } catch (error) {
      console.error('Failed to fetch consignees:', error)
    }
  }

  const fetchOrderTypeData = async (
    setOrderType: Dispatch<SetStateAction<OrderTypeForSale[]>>,
    Site_Code: string | number | true | object | null,
    companyid: string | number | true | object | null,
    bu: string | number | true | object | null
  ) => {
    try {
      const response = await OrderTypeAction(Site_Code, companyid, bu)
      const data: OrderTypeForSale[] = response
      if (data) {
        setOrderType(data)
      } else {
        // If there is an error, log the error message
        const errorMessage = 'Unknown error'

        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        // setParty([]);
      }
    } catch (error) {
      console.error('Failed to fetch consignees:', error)
    }
  }

  const handleTransactionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    transaction: TransactionTypeDataforSale[],
    setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>>
  ) => {
    const code = e.target.value

    setHeader(prevHeader => {
      if (!prevHeader) return prevHeader // ✅ null guard

      if (code === '') {
        return {
          ...prevHeader,
          StrTransactionTypeCode: '',
          StrTransactionTypeName: ''
        }
      }

      const transactionData = transaction.find(ele => ele.Code === code)

      if (!transactionData) return prevHeader

      fetchOrderNo(
        header.StrV_Type as string,
        companyid as string,
        Site_Code as string,
        UserName as string,
        bu as string,
        transactionData.Code
      )

      return {
        ...prevHeader,
        StrTransactionTypeCode: transactionData.Code,
        StrTransactionTypeName: transactionData.Name
      }
    })
  }

  const handleOrderTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    orderTypeforSale: OrderTypeForSale[],
    setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>>
  ) => {
    const code = e.target.value

    setHeader(prevHeader => {
      if (!prevHeader) return prevHeader // ✅ null guard

      if (code === '') {
        return {
          ...prevHeader,
          StrOrderTypeCode: '',
          StrOrderTypeName: ''
        }
      }

      const orderData = orderTypeforSale.find(ele => ele.Code === code)

      if (!orderData) return prevHeader

      return {
        ...prevHeader,
        StrOrderTypeCode: orderData.Code,
        StrOrderTypeName: orderData.Name
      }
    })
  }

  const handleToPlaceChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    toPlaceHelp: ToPlaceHelpInterface[],
    setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>>
  ) => {
    const code = e.target.value

    setHeader(prevHeader => {
      if (!prevHeader) return prevHeader // ✅ null guard

      if (code === '') {
        return {
          ...prevHeader,
          StrToPlace: '',
          StrToPlaceName: ''
        }
      }

      const toPlaceHelpData = toPlaceHelp.find(ele => ele.CityCode === code)

      if (!toPlaceHelpData) return prevHeader

      return {
        ...prevHeader,
        StrToPlace: toPlaceHelpData.CityCode,
        StrToPlaceName: toPlaceHelpData.CityName
      }
    })
  }

  const handleExcisableChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    excisableData: ExcisableInterface[],
    setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>>
  ) => {
    const code = e.target.value

    setHeader(prevHeader => {
      if (!prevHeader) return prevHeader // ✅ null guard

      if (code === '') {
        return {
          ...prevHeader,
          StrExcisableName: '',
          StrExcisableCode: ''
        }
      }

      const excisableHelpData = excisableData.find(ele => ele.Code === code)

      if (!excisableHelpData) return prevHeader

      return {
        ...prevHeader,
        StrExcisableCode: excisableHelpData.Code,
        StrExcisableName: excisableHelpData.Name
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientId = searchParams.get('DocId') // Get the clientId from URL

        if (clientId) {
          setdocId(clientId)
          const data: TCTData = await GetTermsCondAction({ clientId }, UserName, Site_Code, companyid, bu)
          if (data) {
            setTCT(data.data)
            // console.log('Fetched client-specific data:', data)
            return // Skip general fetch if client-specific data is found
          }
        }

        // If no clientId or client-specific data not found, fetch general data
        const generalData: TCTData = await TermsCondAction(header?.StrV_Type as string, companyid, Site_Code, bu)
        // console.log('tct', generalData)
        if (generalData) {
          setTCT(generalData.data)
          // console.log('Fetched general data:', generalData)
        } else {
          setTCT([])
        }
      } catch (error) {
        console.error('Failed to fetch TCT details:', error)
        setTCT([])
      }
    }

    if (companyid && Site_Code && header?.StrV_Type) {
      fetchData()
    }
  }, [companyid, Site_Code, header?.StrV_Type])

  const fetchEnviroDataAndSetDeliveryDate = async () => {
    try {
      const response = await fetch(
        `http://localhost/BSA/SaleOrder/FGetEnviro?site_code=${Site_Code}&companyid=${companyid}`
      )
      const data: EnviroData[] = await response.json()

      const { SordDeliveryDays } = data[0]
      const deliveryDays = SordDeliveryDays ?? 0

      const orderDate = new Date()
      orderDate.setDate(orderDate.getDate() + deliveryDays)
      const strdelDate = orderDate.toISOString().split('T')[0]

      // setHeader(prev => {
      //   const updated = { ...prev[0], strdelDate }
      //   return [updated]
      // })
    } catch (error) {
      console.error('Error fetching environment data:', error)
    }
  }

  const initializePartyOrderDate = () => {
    const today = new Date().toISOString().split('T')[0]

    // setHeader(prev => {
    //   if (!prev[0]?.strpartyOrdDt) {
    //     const updated = { ...prev[0], strpartyOrdDt: today }
    //     return [updated]
    //   }
    //   return prev
    // })
  }

  useEffect(() => {
    if (companyid && Site_Code) {
      fetchEnviroDataAndSetDeliveryDate()
    }
  }, [companyid, Site_Code])

  useEffect(() => {
    initializePartyOrderDate()
  }, [])

  const formatDateForInput = (dateString?: string | null): string => {
    if (!dateString) return ''

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''

    // Build YYYY-MM-DD using local date parts (no timezone conversion)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    if (!mergedDone && detail.length > 0 && ohList.length > 0 && !isPaste) {
      const mergedDetail = detail.map(item => {
        const matchedLineOH = ohList.filter(
          oh => oh.intV_Sno === item.Intv_SNo // match based on serial number
        )
        return {
          ...item,
          clsSaleOrderOHLine: matchedLineOH
        }
      })

      setDetail(mergedDetail)
      console.log('mergedDetail', mergedDetail)
      setMergedDone(true)
    }
  }, [detail, ohList, mergedDone, isPaste])

  const router = useRouter()
  function handleBack() {
    router.push('/saleorderentrylist/')
  }

  return (
    <>
      <HeadingTab TitleIcon={BsBank2} Title='Sales' RoutingIcon={SiHomebridge} routingPath='/dashboardpage/' />
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <Card>
          <CardHeader
            title='Sale Order Entry'
            action={
              <div style={{ display: 'flex' }}>
                <IconButton
                  onClick={handleBack}
                  size='small'
                  aria-label='settings'
                  className='card-more-options'
                  sx={{ color: 'text.secondary' }}
                >
                  <ExitToApp />
                </IconButton>
              </div>
            }
          />
          <Divider variant='middle' />
          <CardContent sx={{ padding: '10px' }}>
            {/* <Breadcrumb pageName={docId ? 'Edit Order' : 'Sale Order'} /> */}

            <OrderTypeErrorPopup
              isVisible={orderTypeerror}
              onConfirm={() => {
                handleOrderTypeError(setOrderTypeerror)
              }}
            />
            <ApprovedPopup
              isVisible={approvedpopupVisible}
              onConfirm={() => {
                handleApprovedConfirm(setApprovedpopupVisible)
              }}
            />

            <VerifiedPopup
              isVisible={verifiedpopupVisible}
              onConfirm={() => {
                handleVerifiedConfirm(setVerifiedpopupVisible)
              }}
            />

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 '>
              <div className='flex flex-col gap-4'>
                <div className='md:h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark '>
                  <div className='flex flex-col gap-2 p-6'>
                    {!docId && isCopy && (
                      <div className='md:-mt-7 -mt-4 flex justify-end gap-2 lg:hidden md:hidden sm:hidden'>
                        <label htmlFor='strContractSalesOrder' className='block text-sm font-medium text-purple-500 '>
                          Paste
                        </label>
                        <select
                          value={selectedOption}
                          onChange={handlePaste}
                          className='form-datepicker rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        >
                          <option value='Select'>Select</option>
                          <option value='All'>All</option>
                          <option value='Detail'>Detail</option>
                        </select>
                      </div>
                    )}

                    {docId && (
                      <div className='flex justify-end md:hidden -mb-2 -mt-5'>
                        <FaRegCopy onClick={handleCopy} size={22} color='green' className='cursor-pointer' />
                      </div>
                    )}

                    <VoucherTypeHelpComponent
                      filters={header}
                      handleChange={handleVtypeChange}
                      StrCondition="and Category In ('SORD','SOGST','SOIGS','SODGS') And IsNull(ActiveYN,'Y') = 'Y'"
                      filterKey='StrV_Type'
                      nameKey='StrV_TypeDesc'
                      isMulti={false}
                      label={
                        <>
                          Type <span style={{ color: 'red' }}>*</span>
                        </>
                      }
                    />
                    <SaleOrderDateinput
                      htmlForData='StrV_Date'
                      labelData={
                        <>
                          Order Date <span style={{ color: 'red' }}>*</span>
                        </>
                      }
                      isReadable={true}
                      valueData={formatDateForInput(header?.StrV_Date) || formatDateForInput(currentDate)}
                      idData='StrV_Date'
                      nameData='StrV_Date'
                    />

                    <SaleOrderHelp
                      htmlforData='StrTransactionTypeCode'
                      labelData='Transaction Type'
                      idData='StrTransactionTypeCode'
                      party={transaction.map((ele, index) => ({
                        Code: ele.Code,
                        Name: ele.Name,
                        keyData: index
                      }))}
                      valueData={header?.StrTransactionTypeCode || ''}
                      optionData={header?.StrTransactionTypeName || 'Select'}
                      onChange={e => handleTransactionTypeChange(e, transaction, setHeader)}
                      onClick={() =>
                        handleTransactionFocus(
                          isFetchedTransaction,
                          setIsFetchedTransaction,
                          header?.StrV_Type,
                          companyid as string,
                          Site_Code as string,
                          bu as string
                        )
                      }
                      CoSNoStar={true}
                    />
                    <TextBoxOne
                      label='Order No.'
                      value={orderNumber}
                      type='text'
                      disabled={false}
                      readOnly={true}
                      labelColor='red'
                    />

                    <div>
                      <SaleOrderHelp
                        htmlforData='StrOrderTypeCode'
                        labelData='Order Type'
                        idData='StrOrderTypeCode'
                        party={orderTypeforSale.map((item, index) => ({
                          Code: item.Code,
                          Name: item.Name,
                          keyData: index
                        }))}
                        valueData={header?.StrOrderTypeCode || ''}
                        optionData={header?.StrOrderTypeName || 'Select'}
                        onChange={e => handleOrderTypeChange(e, orderTypeforSale, setHeader)}
                        onClick={() =>
                          handleOrderTypeDataFocus(isFetchedParty, setIsFetchedParty, () =>
                            fetchOrderTypeData(setOrderTypeforSale, Site_Code, companyid, bu)
                          )
                        }
                        CoSNoStar={true}
                      />
                      {partyError && <div className='text-danger text-sm text-red-700'>{partyError}</div>}
                    </div>

                    <div>
                      <SaleOrderHelp
                        htmlforData='StrPartyCode'
                        labelData='Party'
                        idData='StrPartyCode'
                        party={party.map((item, index) => ({
                          Code: item.SubCode,
                          Name: item.Name,
                          keyData: index
                        }))}
                        valueData={header?.StrPartyCode || ''}
                        optionData={header?.StrPartyName || 'Select'}
                        onChange={event =>
                          handlePartyChange(
                            event,
                            party,
                            setHeader,
                            setPartyError,
                            setAgtForm,
                            Site_Code,
                            companyid,
                            header?.StrV_Type,
                            bu
                          )
                        }
                        onClick={() =>
                          handlePartyDataFocus(isFetchedParty, setIsFetchedParty, () =>
                            fetchPartyData(setParty, header?.StrV_Type, Site_Code, companyid, bu)
                          )
                        }
                        CoSNoStar={true}
                        stateToSet={setOpenPartyHelp}
                      />
                      {partyError && <div className='text-danger text-sm text-red-700'>{partyError}</div>}
                    </div>
                    <div className='mt-3'>
                      <TextBoxOne
                        label='Distributor'
                        value={header?.StrDistributorName}
                        type='text'
                        disabled={false}
                        readOnly={true}
                        labelColor=''
                      />
                    </div>

                    <div>
                      <SaleOrderHelp
                        htmlforData='StrConsignee'
                        labelData='Consignee'
                        idData='StrConsignee'
                        party={consignees.map((consignee, index) => ({
                          Code: consignee.SubCode,
                          Name: consignee.Name,
                          keyData: index
                        }))}
                        valueData={header?.StrConsignee || ''}
                        optionData={header?.StrConsigneeName || 'Select'}
                        onChange={event =>
                          handleConsigneeChange(event, consignees, setHeader, setConsigneeError, setStrConsignee)
                        }
                        onClick={() =>
                          handleConsigneeFocus(isFetchedCon, setIsFetchedCon, () =>
                            fetchConsignees(setConsignees, header?.StrPartyCode, Site_Code, companyid, bu)
                          )
                        }
                        CoSNoStar={false}
                        stateToSet={setOpenConsigneeHelp}
                      />
                      {consigneeError && <div className='text-danger text-sm text-red-700'>{consigneeError}</div>}
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                {/* <!-- Input Fields --> */}
                <div className='md:h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                  <div className='flex flex-col gap-2 p-6'>
                    {!docId && isCopy && (
                      <div className='hidden sm:flex md:-mt-7 -mt-4 justify-end gap-2'>
                        <label htmlFor='strContractSalesOrder' className='block text-sm font-medium text-purple-500 '>
                          Paste
                        </label>
                        <select
                          value={selectedOption}
                          onChange={handlePaste}
                          className='form-datepicker rounded border border-gray-300 bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary '
                        >
                          <option value='Select'>Select</option>
                          <option value='All'>All</option>
                          <option value='Detail'>Detail</option>
                        </select>
                      </div>
                    )}

                    {docId && (
                      <div className='hidden md:flex justify-end -mt-5 -mb-2'>
                        <FaRegCopy onClick={handleCopy} size={22} color='green' className='cursor-pointer' />
                      </div>
                    )}

                    <div>
                      <div>
                        <div>
                          <SaleOrderHelp
                            htmlforData='strFormCode'
                            labelData='Against Form'
                            idData='strFormCode'
                            party={agtForm?.map((item, index) => ({
                              Code: item.Form_Code,
                              Name: item.Form_Desc,
                              keyData: index
                            }))}
                            valueData={header?.StrAgainstFormCode || ''}
                            optionData={header?.StrAgainstFormName || 'Select'}
                            onChange={e => handleAgtFormChange(e, agtForm, setHeader, setAgtFormError, setDetail)}
                            onClick={() => {
                              handleAgtFormFocus(Site_Code, companyid, header?.StrV_Type, setAgtForm, bu)
                            }}
                            CoSNoStar={true}
                          />
                          {agtFormError && <div className='text-danger text-sm text-red-700'>{agtFormError}</div>}
                        </div>

                        <div>
                          <SaleOrderHelp
                            htmlforData='strContractSalesOrder'
                            labelData='Con. Ref_No'
                            idData='strContractSalesOrder'
                            party={contractSales[0]?.data.map((ele, index) => ({
                              Code: ele.DocId,
                              Name: ele.OrderNo,
                              keyData: index
                            }))}
                            valueData={header?.StrContractSalesOrderDocID || ''}
                            optionData={header?.StrContractSalesOrderNo || 'Select'}
                            onChange={event => {
                              handleContractSalesOrderChange(event, contractSales, setHeader, setContractDocId)
                            }}
                            onClick={() => {
                              handleContractSalesOrderFocus(
                                isFetchedCOS,
                                setisFetchedCOS,
                                setcontractSales,
                                docId,
                                header?.StrDistributor || '',
                                header?.StrPartyCode as string,
                                UserName,
                                bu
                              )
                            }}
                            CoSNoStar={false}
                          />
                        </div>

                        <div>
                          <VoucherTypeHelpComponent
                            filters={header}
                            handleChange={handleVtypeChange}
                            StrCondition="and Category In ('INV','INVW','EXPDG','EXPGS','SODGS','INVGS') And IsNull(ActiveYN,'Y') = 'Y'"
                            filterKey='strSaleInvoiceV_Type'
                            nameKey='StrSaleInvoiceV_TypeDesc'
                            isMulti={false}
                            label='Sale V_Type'
                          />
                        </div>

                        <div>
                          <SaleOrderInput
                            htmlForData='StrPartyOrdNo'
                            labelData='Party Order No.'
                            isStar={true}
                            valueData={header?.StrPartyOrdNo || ''}
                            idData='StrPartyOrdNo'
                            typeData='text'
                            isReadOnly={false}
                            nameData='StrPartyOrdNo'
                            placeHolderData='Enter Party Order No.'
                            onChangeFun={event => handleHeaderChange(event, setHeader, setPartyOrderNoError)}
                          />
                          {partyOrderNoError && (
                            <div className='text-danger text-sm text-red-700'>{partyOrderNoError}</div>
                          )}
                        </div>

                        <SaleOrderDateinput
                          htmlForData='StrPartyOrdDt'
                          labelData='Party Order Date'
                          isReadable={false}
                          onChange={event => handleHeaderChange(event, setHeader, setPartyOrderNoError)}
                          valueData={formatDateForInput(header?.StrPartyOrdDt) || ''}
                          idData='StrPartyOrdDt'
                          nameData='StrPartyOrdDt'
                          minDate={new Date().toISOString().split('T')[0]}
                        />

                        <SaleOrderDateinput
                          htmlForData='StrDelDate'
                          labelData={
                            <>
                              Delivery Date <span style={{ color: 'red' }}>*</span>
                            </>
                          }
                          isReadable={false}
                          onChange={event => handleHeaderChange(event, setHeader, setPartyOrderNoError)}
                          valueData={formatDateForInput(header?.StrDelDate) || ''}
                          idData='StrDelDate'
                          nameData='StrDelDate'
                          minDate={new Date().toISOString().split('T')[0]}
                        />
                        {delDateError && <div className='text-danger text-sm text-red-700'>{delDateError}</div>}
                      </div>
                    </div>

                    <ErrorModal isOpen={isModalOpen} onClose={() => handleCloseModal(setIsModalOpen, setError)}>
                      <div className='p-5'>
                        <div className='mb-5 text-lg font-semibold text-gray-900'>Attention Needed</div>
                        <p className='text-sm text-gray-600'>{error}</p>
                      </div>
                    </ErrorModal>

                    <div>
                      <SaleOrderHelp
                        htmlforData='StrToPlace'
                        labelData='To Place'
                        idData='StrToPlace'
                        party={toPlaceHelp.map((ele, index) => ({
                          Code: ele.CityCode,
                          Name: ele.CityName,
                          keyData: index
                        }))}
                        valueData={header?.StrToPlace || ''}
                        optionData={header?.StrToPlaceName || 'Select'}
                        onChange={e => handleToPlaceChange(e, toPlaceHelp, setHeader)}
                        onClick={() => fetchToPlace(companyid as string, Site_Code as string, bu as string)}
                        CoSNoStar={false}
                        stateToSet={setOpenToPlaceHelp}
                      />

                      {toPlaceError && <div className='text-danger text-sm text-red-700'>{toPlaceError}</div>}
                    </div>

                    {/* <SaleOrderHelp
                htmlforData='strContractSalesOrder'
                labelData='Contract Sales Order'
                idData='strContractSalesOrder'
                party={contractSales[0]?.data.map((ele, index) => ({
                  Code: ele.DocId,
                  Name: ele.OrderNo,
                  keyData: index
                }))}
                valueData={header[0]?.strContractSalesOrder || ''}
                optionData={header.length > 0 ? header[0]?.strContractSalesOrderValue || 'Select' : 'Select'}
                onChange={event => {
                  handleContractSalesOrderChange(event, contractSales, setHeader, setContractDocId)
                }}
                onFocus={() => {
                  handleContractSalesOrderFocus(
                    isFetchedCOS,
                    setisFetchedCOS,
                    setcontractSales,
                    docId,
                    header[0]?.strdistributor || '',
                    PartyCode,
                    UserName,
                    bu
                  )
                }}
                CoSNoStar={false}
              /> */}

                    <TextBoxOne
                      label='Proforma Invoice'
                      value={header?.StrPerformaInvoiceNo}
                      type='text'
                      disabled={false}
                      readOnly={false}
                      labelColor=''
                    />

                    <SaleOrderHelp
                      htmlforData='transactionType'
                      labelData='Excisable'
                      idData='transactionType'
                      party={excisableData.map((ele, index) => ({
                        Code: ele.Code,
                        Name: ele.Name,
                        keyData: index
                      }))}
                      valueData={header?.StrExcisableCode || ''}
                      optionData={header?.StrExcisableName || 'Select'}
                      onChange={e => handleExcisableChange(e, excisableData, setHeader)}
                      onClick={() => fetchExcisable(companyid as string, Site_Code as string, bu as string)}
                      CoSNoStar={true}
                    />

                    <div>
                      <SaleOrderHelp
                        htmlforData='StrDelAt'
                        labelData='Delivery To'
                        idData='StrDelAt'
                        party={deliveryTo.map((delivery, index) => ({
                          Code: delivery.SubCode,
                          Name: delivery.Name,
                          keyData: index
                        }))}
                        valueData={header?.StrDelAt || ''}
                        optionData={header?.StrDelAtName || 'Select'}
                        onChange={event => handleDeliveryToChange(event, deliveryTo, setHeader)}
                        onClick={() =>
                          handleConsigneeFocus(isFetchedCon, setIsFetchedCon, () =>
                            fetchConsignees(setDeliveryTo, header?.StrPartyCode, Site_Code, companyid, bu)
                          )
                        }
                        CoSNoStar={true}
                      />
                      {consigneeError && <div className='text-danger text-sm text-red-700'>{consigneeError}</div>}
                    </div>

                    {/* <div>
                <SaleOrderHelp
                  htmlforData='salesperson'
                  labelData='Sales Person'
                  idData='salesperson'
                  party={salesperson[0]?.data.map((ele, index) => ({
                    Code: ele.Code,
                    Name: ele.Name,
                    keyData: index
                  }))}
                  valueData={header[0]?.strSalesPersonCode || ''}
                  optionData={header[0]?.strSalesPersonName || ''}
                  onChange={e => handlesalespersonChange(e, salesperson, setHeader, setSalesPersonError)}
                  onFocus={() => {
                    handlesalespersonFocus(
                      header[0].strdistributor || '',
                      header[0].strT_Type || '',
                      Site_Code as string,
                      companyid as string,
                      UserName as string,
                      isFetchedSalesPerson,
                      setIsFetchedSalesPerson,
                      setSalesPerson,
                      bu as string
                    )
                  }}
                  CoSNoStar={true}
                />
                {salespersonError && <div className='text-danger text-sm text-red-700'>{salespersonError}</div>}
              </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Time and date --> */}

            {/* <div className='mt-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='border-b border-stroke px-6 py-2 dark:border-strokedark'>
          <h3 className='font-medium text-black '>Remarks</h3>
        </div>
        <div className='flex flex-col gap-5 p-6'>
          <div>
            <textarea
              name='strremark'
              rows={6}
              placeholder='Remark'
              value={header[0]?.strremark || ''}
              onChange={event => handleHeaderChange(event, setHeader, setPartyOrderNoError)}
              className='w-full h-19 rounded-lg border border-gray-300 bg-transparent md:px-5 px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary '
            ></textarea>
          </div>
        </div>
      </div> */}

            {/* {header?.strnotification ? (
        <>
          <div className='mt-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <div className='border-b border-stroke px-6 py-2 dark:border-strokedark'>
              <h3 className='font-medium text-black '>Hold / Cancel Remark</h3>
            </div>
            <div className='flex flex-col gap-5 p-6'>
              <div>
                <textarea
                  readOnly={true}
                  name='strholdRemark'
                  rows={6}
                  placeholder='Hold Remark'
                  defaultValue={header?.strholdRemark || ''}
                  className='w-full h-19 rounded-lg border-[1.5px] border-stroke bg-transparent md:px-5 px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary'
                ></textarea>
              </div>
            </div>
          </div>
        </>
      ) : null} */}

            <div className='w-15'>
              <button
                className='w-14 px-1 font-bold py-1 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
                onClick={handleAddClick}
              >
                Add
              </button>
            </div>

            <ErrorModal isOpen={isErrorModalOpen} onClose={handleCloseErrorModal(setIsErrorModalOpen)}>
              <div className='p-5'>
                <div className='mb-5 text-lg font-semibold text-white'>
                  Please select both the Order Type and Transaction Type before adding.
                </div>
              </div>
            </ErrorModal>

            {/* Table */}
            <div className='overflow-x-auto mt-2'>
              {/* <TableThree /> */}
              <div className='rounded-sm border border-stroke bg-white px-2 pb-2 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-2 xl:pb-1'>
                <div className='max-w-full overflow-x-auto'>
                  <table className='w-full table-auto'>
                    <thead>
                      <tr className='bg-teal-400 text-center text-white'>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>
                          S. No.
                        </th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>
                          CO_ItemSrNo
                        </th>
                        <th className='min-w-[150px] px-1 py-4 font-semibold xl:pl-4 text-sm border-b border-gray-700'>
                          Item Name
                        </th>
                        <th className='min-w-[150px] px-1 py-4 font-semibold xl:pl-4 text-sm border-b border-gray-700'>
                          Description
                        </th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>BF</th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>Width</th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>Unit</th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>GSM</th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>
                          Reel/Pack
                        </th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>
                          Weight
                        </th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>
                          Short Closed
                        </th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>Tol</th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>SKU</th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>Rate</th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>
                          Amount
                        </th>
                        <th className='min-w-[60px] px-1 py-4 font-semibold text-sm border-b border-gray-700'>
                          Agreed Rate
                        </th>
                        <th className='px-1 py-4 font-semibold text-center text-sm border-b border-gray-700'>Action</th>
                      </tr>
                    </thead>
                    {!isSelect &&
                      detail.map((ele, index) => {
                        return (
                          <tbody key={index}>
                            <tr>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark xl:pl-4 text-center'>
                                <h5 className='text-sm font-medium text-black '>
                                  {index + 1} {/* Changed from detail.strItemName to ele.strItemName */}
                                </h5>
                              </td>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className={`inline-flex rounded-full bg-opacity-10 py-1 text-sm font-medium`}>
                                  {ele.IntcontractSoV_Sno} {/* Changed from submission.strBFValue to ele.strBFValue */}
                                </p>
                              </td>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark xl:pl-4 text-center'>
                                <h5 className='text-sm font-medium text-black '>
                                  {ele.StrItemName} {/* Changed from detail.strItemName to ele.strItemName */}
                                </h5>
                              </td>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className={`inline-flex rounded-full bg-opacity-10 py-1 text-sm font-medium`}>
                                  {ele.StritemDesc} {/* Changed from submission.strBFValue to ele.strBFValue */}
                                </p>
                              </td>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className={`inline-flex rounded-full bg-opacity-10 py-1 text-sm font-medium`}>
                                  {ele.StrBFName} {/* Changed from submission.strBFValue to ele.strBFValue */}
                                </p>
                              </td>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className={`inline-flex rounded-full bg-opacity-10 py-1 text-sm font-medium`}>
                                  {ele.DblWidth} {/* Changed from submission.strBFValue to ele.strBFValue */}
                                </p>
                              </td>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className={`inline-flex rounded-full bg-opacity-10 py-1 text-sm font-medium`}>
                                  {ele.StrSizeUnit} {/* Changed from submission.strBFValue to ele.strBFValue */}
                                </p>
                              </td>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className='text-black  text-sm'>
                                  {ele.StrGsmName} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                                </p>
                              </td>

                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className='text-black  text-sm'>{ele.DblReel}</p>
                              </td>

                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className='text-black  text-sm'>
                                  {ele.DblWeight} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                                </p>
                              </td>

                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className='text-black  text-sm'>
                                  {} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                                </p>
                              </td>

                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <TiArrowSortedDown
                                  className='inline ml-1 text-gray-500 text-lg'
                                  onClick={() => toggleTolPopup(ele.DblWeight, index)}
                                />

                                {TolPopupOpenIndex === index && (
                                  <POOrdToComp
                                      isOpen={true}
                                      togglePopup={() => setTolPopupOpenIndex(null)}
                                      ordQty={selectedOrdQty}
                                      percentage={percentageByRow[index] ?? 0}
                                      setPercentage={value =>
                                        setPercentageByRow(prev => ({ ...prev, [index]: value }))
                                      }
                                      detail={detail}
                                      setDetail={setDetail}
                                  />
                                )}
                              </td>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className='text-black  text-sm'>
                                  {ele.StrSKU} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                                </p>
                              </td>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className='text-black  text-sm'>
                                  {ele.DblRate} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                                </p>
                              </td>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className='text-black  text-sm'>
                                  {ele.DblAmount} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                                </p>
                              </td>
                              <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark text-center'>
                                <p className='text-black  text-sm'>
                                  {ele.DblAgreedRate} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                                </p>
                              </td>

                              {
                                <td className='border-b border-[#eee] px-6 py-2 dark:border-strokedark text-center'>
                                  <div className='flex items-center space-x-3'>
                                    {/* <button
                                      onClick={() =>
                                        toggleViewModal(index, detail, setViewItem, setViewIndex, setIsViewModalOpen)
                                      }
                                      className='hover:text-primary'
                                    >
                                      <GrView />
                                    </button> */}

                                    <button
                                      onClick={() =>
                                        handleEdit(
                                          index,
                                          detail,

                                          setIsEditModalActive,
                                          setEditItem,
                                          setEditIndex
                                        )
                                      }
                                      className='hover:text-primary'
                                    >
                                      <CiEdit />
                                    </button>
                                    <button
                                      onClick={e => {
                                        e.stopPropagation()
                                        handleTableDelete(
                                          index,
                                          detail,
                                          ohHeader,
                                          setTotalGrossAmount,
                                          setTotalAdditionAmount,
                                          setTotalDiscount,
                                          setTotalAmount,
                                          setSubmissions,
                                          setDetail,
                                          setOHHeader
                                        )
                                      }}
                                      className='hover:text-primary'
                                    >
                                      <MdDeleteOutline />
                                    </button>
                                  </div>
                                </td>
                              }
                            </tr>
                          </tbody>
                        )
                      })}

                    {detail.length > 0 && !isSelect && (
                      <tbody>
                        <tr className='bg-gray-200 dark:bg-meta-4'>
                          <td className='px-1 py-2 font-semibold text-black  xl:pl-4 text-sm ' colSpan={8}>
                            Total
                          </td>
                          <td className='px-1 py-2 font-semibold text-black text-sm text-center'>
                            {/* Total Weight */}
                            {detail.reduce((total, item) => {
                              const qty =
                                typeof item.DblReel === 'string' ? parseFloat(item.DblReel) : item.DblReel || 0
                              return total + qty
                            }, 0)}
                          </td>

                          <td className='px-1 py-2 font-semibold text-black text-sm text-center'>
                            {/* Total Weight */}
                            {detail
                              .reduce((total, item) => {
                                const qty =
                                  typeof item.DblWeight === 'string' ? parseFloat(item.DblWeight) : item.DblWeight || 0
                                return total + qty
                              }, 0)
                              .toFixed(3)}
                          </td>
                          <td colSpan={4}></td>
                          <td className='px-1 py-2 font-semibold text-black text-sm text-center'>
                            {/* Total Amount */}
                            {detail
                              .reduce((total, item) => {
                                const amt =
                                  typeof item.DblAmount === 'string' ? parseFloat(item.DblAmount) : item.DblAmount || 0
                                return total + amt
                              }, 0)
                              .toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
                <ViewModal
                  isViewModalOpen={isViewModalOpen}
                  viewItem={viewItem}
                  setIsViewModalOpen={setIsViewModalOpen}
                />
              </div>
            </div>

            <div className='mt-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4'>
              <div className='flex flex-col md:flex-row gap-6'>
                {/* LEFT: Terms & Conditions */}
                <div className='flex-1 p-4 border border-stroke dark:border-gray-200 rounded-md bg-gray-50  space-y-2'>
                  <h2 className='text-lg font-semibold text-black '>Terms and Conditions :-</h2>
                  <div className='overflow-y-auto space-y-2' style={{ maxHeight: '230px' }}>
                    {TCT && TCT.length > 0 ? (
                      TCT.map((item, index) => (
                        <div key={index} className='flex items-center mb-2'>
                          <label
                            style={{ width: '5rem' }}
                            className='whitespace-nowrap text-xs font-medium text-gray-600  mr-2'
                          >
                            {item.strTCName || ''}
                          </label>
                          {item.strValue && item.strValue.length > 50 ? (
                            <textarea
                              style={{ width: '25rem' }}
                              className='h-10 px-2 text-sm text-black  rounded-md border border-gray-400 border-stroke bg-white resize-none'
                              value={item.strValue || ''}
                              onChange={e => handleChange(index, e.target.value)}
                            />
                          ) : (
                            <input
                              type='text'
                              style={{ width: '25rem' }}
                              className='h-8 px-2 text-sm text-black rounded-md border border-gray-400 border-stroke bg-white'
                              value={item.strValue || ''}
                              onChange={e => handleChange(index, e.target.value)}
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <p className='flex items-center gap-2 text-sm text-gray-500  mt-2'>
                        <svg className='w-4 h-4 text-yellow-500' fill='currentColor' viewBox='0 0 20 20'>
                          <path d='M8.257 3.099c.366-.756 1.42-.756 1.786 0l6.516 13.5A1 1 0 0 1 15.683 18H4.317a1 1 0 0 1-.876-1.401l6.516-13.5zM11 14a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm-1-2a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1z' />
                        </svg>
                        No Terms and Conditions available.
                      </p>
                    )}
                  </div>
                </div>

                {/* RIGHT: Amount Summary */}
                <HeaderOHComp<clsSaleOrderItemDetail>
                  ohHeaderList={ohHeader}
                  detail={detail}
                  onUpdateHeader={updated => setOHHeader(updated)}
                  isPaste={isPaste}
                />
              </div>
            </div>

            {(currentOrderStatus === 'Open' || currentOrderStatus === '') && (
              <div className='flex justify-end'>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`w-14 px-1 py-1 mt-2 text-white font-bold rounded focus:outline-none focus:ring 
        ${isSaving ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-200'}`}
                >
                  Save
                </button>
              </div>
            )}

            <SaleOrderEntryDetail
              // Modal state and toggle
              isAddModalActive={isAddModalActive}
              toggleAddModal={() => setIsAddModalActive(false)}
              isEditModalActive={isEditModalActive}
              toggleEditModal={() => setIsEditModalActive(false)}
              // Form submission handlers
              onFormSubmit={isEditModalActive ? submitEditForm : submitForm} // Conditional submission function
              editItem={isEditModalActive ? editItem : undefined} // Pass editItem only if in edit mode
              editIndex={editIndex}
              ordertype={orderType || header?.StrOrderTypeCode}
              item={item}
              setItem={setItem}
              bf={bf}
              setBf={setBf}
              gsm={gsm}
              setGsm={setGsm}
              relatedOrders={selectedRelatedOrders} // Pass the related orders to the modal
              contractDocId={contractDocId}
              transTypeCat={transTypeCat}
              cosono={cosono}
              setCosono={setCosono}
              StrConsignee={StrConsignee}
              isPriceListApplicable={isPriceListApplicable}
              setIsSelect={setIsSelect}
              detail={detail}
              setDetail={setDetail}
              header={header}
              setHeader={setHeader}
              ohList={ohList}
              setOHList={setOHList}
              fetchOHLineData={fetchOHLineData}
            />

            <MultiHelp<PartyDataforSaleOrder>
              defaultSearch={header?.StrPartyName || ''}
              open={openPartyHelp}
              onClose={() => setOpenPartyHelp(false)}
              onSelect={data =>
                handleRowSelect({
                  type: 'StrPartyCode',
                  item: data,
                  setHeader,
                  setTriggerFetch,
                  handleClose
                })
              }
              fetchItems={async () => {
                if (UserName && Site_Code && companyid && bu) {
                  const response: PartyDataforSaleOrder[] = await PartyAction(
                    header?.StrV_Type,
                    Site_Code,
                    companyid,
                    bu
                  )
                  return response
                } else {
                  return [] // Return empty array if any required value is missing
                }
              }}
              columnsConfig={PartyColumnsConfig}
              title='Party Help'
              dialogWidth='100%'
            />

            <MultiHelp<ConsigneeDataForSale>
              // type='strconsignee'
              defaultSearch={header?.StrConsigneeName || ''}
              open={openConsigneeHelp}
              onClose={() => setOpenConsigneeHelp(false)}
              onSelect={data =>
                handleRowSelect({
                  type: 'StrConsignee',
                  item: data,
                  setHeader,
                  setTriggerFetch,
                  handleClose
                })
              }
              fetchItems={async () => {
                if (UserName && Site_Code && companyid && bu) {
                  const response: ConsigneeDataForSale[] = await ConsigneesAction(
                    header?.StrPartyCode,
                    Site_Code,
                    companyid,
                    bu
                  )
                  return response
                } else {
                  return [] // Return empty array if any required value is missing
                }
              }}
              columnsConfig={consigneeColumnsConfig}
              title='Consignee Help'
              dialogWidth='100%'
            />

            <MultiHelp<ToPlaceHelpInterface>
              defaultSearch={header?.StrToPlaceName || ''}
              open={openToPlaceHelp}
              onClose={() => setOpenToPlaceHelp(false)}
              onSelect={data =>
                handleRowSelect({
                  type: 'StrToPlace',
                  item: data,
                  setHeader,
                  setTriggerFetch,
                  handleClose
                })
              }
              fetchItems={async () => {
                if (UserName && Site_Code && companyid && bu) {
                  const response: ToPlaceHelpInterface[] = await ToPlaceAction(companyid, Site_Code, bu)
                  return response
                } else {
                  return [] // Return empty array if any required value is missing
                }
              }}
              columnsConfig={ToPlaceColumnsConfig}
              title='To Place Help'
              dialogWidth='40%'
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default SaleOrderEntry
