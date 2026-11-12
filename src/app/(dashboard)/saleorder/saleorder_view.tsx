'use client'
import SaleOrderEntryDetail from './saleorderentrydetail_view'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import TextBoxOne from '@/components/TextBoxOne'
import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useSearchParams } from 'next/navigation'
import type {
  FormData,
  ApiResponse,
  ApiResponseDetail,
  Contract,
  DMSSordHeader,
  DMSSordItemDetailUpdatePostData,
  cosno,
  Type,
  IsPriceListResponse,
  AddressBook,
  Delivery,
  Consignee,
  AddressBookData,
  ConsigneeData,
  PartyforSale,
  orderNoInterface,
  Site,
  Add_PlaceOrder,
  PartyDataforSale,
  TCT,
  TCTData,
  EnviroData,
  TransactionTypeforSale,
  clsDMSSordOHHeader,
  clsDMSSordOH,
  LineOH,
  HeaderOH
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
  fetchsalesperson,
  formatDate,
  handleAgtFormChange,
  handleAgtFormFocus,
  handleCloseErrorModal,
  handleCloseModal,
  handleConsigneeChange,
  handleConsigneeFocus,
  handleDeliveryChange,
  handleEdit,
  handleEditFormSubmit,
  handleFormSubmit,
  handleHeaderChange,
  handleOrderTypeChange,
  handlePartyChange,
  handlePartyDataFocus,
  handleReset,
  handleRowSelect,
  handleTableDelete,
  handlefreighttypeChange,
  handlesalespersonChange,
  handlesalespersonFocus,
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
  FreightTypeAction,
  Addressbookaction,
  SiteDataAction,
  PartyAction,
  GetTermsCondAction,
  TermsCondAction,
  placeOrderAction,
  ContractSalesOrderAction,
  cosonoAction,
  IsPriceListApplicableAction
} from './SaleOrder_Entry_action'
import { AddressBookConfig, consigneeColumnsConfig, PartyColumnsConfig } from '@/components/Structure/page'
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
    isFetchedDel,
    setIsFetchedDel,
    isFetchedParty,
    setIsFetchedParty,
    isFetchedFreightType,
    setIsFetchedFreightType,
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
    header,
    setHeader,
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
    setStrToken,
    distributorName,
    setDistributorName,
    PartyCode,
    setPartyCode
  } = useOrderState()

  const [triggerFetch, setTriggerFetch] = useState<{ type: string; code: string } | null>(null)

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
  const [mergedDone, setMergedDone] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

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
  }

  const handleTransactionFocus = (
    isFetchedTransaction: boolean,
    setIsFetchedTransaction: Dispatch<SetStateAction<boolean>>,
    username: string,
    companyid: string,
    Site_Code: string,
    bu: string
  ) => {
    if (!isFetchedTransaction) {
      fetchTransactionType(username, companyid, Site_Code, bu).then(() => setIsFetchedTransaction(true))
    }
  }

  const fetchTransactionType = async (username: string, companyid: string, Site_Code: string, bu: string) => {
    try {
      const response = await TransactionTypeAction(username, companyid, Site_Code, bu)
      const data: TransactionTypeforSale = response

      if (data.success) {
        setTransaction([data])
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

  const handlefreighttypeFocus = (
    Site_Code: string | number,
    companyid: string | number,
    username: string | number,
    isFetchedFreightType: boolean,
    setIsFetchedFreightType: Dispatch<SetStateAction<boolean>>,
    bu: string | number
  ) => {
    if (!isFetchedFreightType) {
      fetchfreighttype(Site_Code, companyid, username, bu).then(() => setIsFetchedFreightType(true))
    }
  }

  const fetchfreighttype = async (
    Site_Code: string | number,
    companyid: string | number,
    username: string | number,
    bu: string | number
  ) => {
    try {
      const response = await FreightTypeAction(String(Site_Code), String(companyid), String(username), String(bu))

      const data: Type = response

      if (data?.success) {
        setFreightType([data])
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
        setFreightType([])
      }
    } catch (error) {
      console.error('Failed to fetch freight type:', error)
    }
  }

  useEffect(() => {
    clientId = searchParams.get('clientId')
    if (clientId) {
      setdocId(clientId)
    }
  }, [])

  var clientId

  useEffect(() => {
    const fetchData = async () => {
      try {
        clientId = searchParams.get('clientId') // Get the clientId from URL

        if (clientId) {
          setdocId(clientId)
          const data: ApiResponse | null = await getOrderHeaderById({ clientId }, UserName, Site_Code, companyid, bu)

          if (data?.success == true) {
            // Check if data is not null and has items
            setIsPaste(false)
            setHeader(data.data) // Set the fetched single object
            if (data?.data[0].strContractSalesOrder) {
              setContractDocId(data.data[0].strContractSalesOrder)
            } else {
              setContractDocId('') // or any default value you prefer
            }
            if (data.data[0].strRecId) {
              setOrderNumber(data.data[0].strRecId)
            }
            if (data?.data[0].strpartyCode) {
              setSelectedParty(data.data[0].strpartyCode)
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

  useEffect(() => {
    async function getOrderNumber() {
      const res: orderNoInterface = await OrderNumberAction(UserName, companyid, Site_Code, bu)
      const clientId = searchParams.get('clientId')
      if (!clientId) {
        if (res?.success) {
          setOrderNumber(res?.data) // Set state if data is not null
        } else {
          // If there is an error, log the error message
          const errorMessage = res.error || 'Unknown error'
          console.error('Error:', errorMessage)
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
          setConsignees([])
        }
      }
    }
    if (UserName && companyid && Site_Code) {
      getOrderNumber()
    }
  }, [setOrderNumber, isSelect, UserName, companyid, Site_Code])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientIdd = searchParams.get('clientId') // Get the clientId from URL

        if (clientIdd) {
          const data: ApiResponseDetail | null = await getOrderDetailById(
            { clientIdd },
            UserName,
            Site_Code,
            companyid,
            bu
          )
          if (data?.success == true) {
            // Check if data is not null and has items
            setDetail(data.data) // Set the fetched single object
          } else {
          }
        }
      } catch (error) {
        console.error('Error fetching detail data:', error)
      }
    }
    if (UserName && Site_Code && companyid && bu) {
      fetchData()
    }
  }, [searchParams, setDetail, UserName, Site_Code, companyid])

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const clientId = searchParams.get('clientId')
        let resp

        if (clientId) {
          resp = await getOHheaderByDocIdAction(
            companyid as string,
            Site_Code as string,
            UserName as string,
            { clientId },
            bu as string,
            'SODMS'
          )
          setOHHeader(resp.data)
        } else {
          resp = await getOHheaderAction(
            companyid as string,
            Site_Code as string,
            UserName as string,
            bu as string,
            'SODMS'
          )
          setOHHeader(resp.data)
        }
      } catch (err) {
        console.error('Error fetching OH header:', err)
        setOHHeader([])
      }
    }
    if (companyid && Site_Code && UserName && header[0].strV_Type) {
      fetchHeader()
    }
  }, [companyid, Site_Code, UserName, bu, searchParams.get('clientId'), header[0].strV_Type])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientId = searchParams.get('clientId') // Get the clientId from URL

        if (clientId) {
          setdocId(clientId)
          const data: LineOH = await getOHlineByDocIdAction(
            companyid as string,
            Site_Code as string,
            UserName as string,
            { clientId },
            bu as string,
            'SODMS'
          )

          if (data?.data?.length) {
            setOHList(data.data)
            return
          }
        }
      } catch (error) {
        console.error('Failed to fetch OH Line details:', error)
        setOHList([])
      }
    }

    if (companyid && Site_Code && !isAddModalActive) {
      fetchData()
    }
  }, [companyid, Site_Code, UserName, bu, header, searchParams.get('clientId'), isAddModalActive])

  useEffect(() => {
    const totalGross = detail.reduce((acc, item) => acc + (item.dbloh_Amt_Gross ?? 0), 0)
    setTotalGrossAmount(totalGross)

    const totalcgst = detail.reduce((acc, item) => acc + (item.dblCGSTAmt ?? 0), 0)
    setTotalCGST(totalcgst)

    const totalsgst = detail.reduce((acc, item) => acc + (item.dblSGSTAmt ?? 0), 0)
    setTotalSGST(totalsgst)

    const totaligst = detail.reduce((acc, item) => acc + (item.dblIGSTAmt ?? 0), 0)
    setTotalIGST(totaligst)

    const totalAdditionAmt = detail.reduce((acc, item) => acc + (item.dbloh_Amt_Addition ?? 0), 0)
    setTotalAdditionAmount(totalAdditionAmt)

    const totalDiscountAmt = detail.reduce((acc, item) => acc + (item.dbloh_Amt_Discount ?? 0), 0)
    setTotalDiscount(totalDiscountAmt)
  }, [detail, setTotalAdditionAmount, setTotalDiscount, setTotalGrossAmount, setTotalCGST, setTotalSGST, setTotalIGST])

  useEffect(() => {
    const PartyDisplayName = Cookies.get('PartyDisplayName')
    const storedPartyName = decryptCookie(PartyDisplayName)

    const PartyCode = Cookies.get('PartyCode')
    const storedPartyCode = decryptCookie(PartyCode)

    const DistributorName = Cookies.get('DistributorName')
    const storedDistributorName = decryptCookie(DistributorName)

    const distributorCode = Cookies.get('distributorCode')
    const storedDistributorCode = decryptCookie(distributorCode)

    const PartyAddressBookName = Cookies.get('PartyAddressBookName')
    const storedPartyAddressBookName = decryptCookie(PartyAddressBookName)

    const PartyAddressBookCode = Cookies.get('PartyAddressBookCode')
    const storedPartyAddressBookCode = decryptCookie(PartyAddressBookCode)

    const PartyAddress1Name = Cookies.get('PartyAddress1Name')
    const storedPartyAddress1Name = decryptCookie(PartyAddress1Name)

    const PartyAddress1Code = Cookies.get('PartyAddress1Code')
    const storedPartyAddress1Code = decryptCookie(PartyAddress1Code)

    const PartyAddress2Name = Cookies.get('PartyAddress2Name')
    const storedPartyAddress2Name = decryptCookie(PartyAddress2Name)

    const PartyAddress2Code = Cookies.get('PartyAddress2Code')
    const storedPartyAddress2Code = decryptCookie(PartyAddress2Code)

    if (storedPartyName && typeof storedPartyName === 'string') {
      setPartyName(storedPartyName)
    } else {
      setPartyName('')
    }
    if (storedPartyCode && typeof storedPartyCode === 'string') {
      setpartyCode(storedPartyCode)
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strpartyCode: storedPartyCode
        }
      ])
    } else {
      setpartyCode('')
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strpartyCode: ''
        }
      ])
    }

    if (storedDistributorName && typeof storedDistributorName === 'string') {
      setDistributorName(storedDistributorName)
    } else {
      setDistributorName('')
    }

    if (storedDistributorCode && typeof storedDistributorCode === 'string') {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strdistributor: storedDistributorCode
        }
      ])
    } else {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strdistributor: ''
        }
      ])
    }

    if (storedPartyAddressBookName && typeof storedPartyAddressBookName === 'string') {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddressBookName: storedPartyAddressBookName
        }
      ])
    } else {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddressBookName: ''
        }
      ])
    }

    if (storedPartyAddressBookCode && typeof storedPartyAddressBookCode === 'string') {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddressBookCode: storedPartyAddressBookCode
        }
      ])
    } else {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddressBookCode: ''
        }
      ])
    }

    if (storedPartyAddress1Name && typeof storedPartyAddress1Name === 'string') {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddress1Name: storedPartyAddress1Name
        }
      ])
    } else {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddress1Name: ''
        }
      ])
    }

    if (storedPartyAddress1Code && typeof storedPartyAddress1Code === 'string') {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddress1Code: storedPartyAddress1Code
        }
      ])
    } else {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddress1Code: ''
        }
      ])
    }

    if (storedPartyAddress2Name && typeof storedPartyAddress2Name === 'string') {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddress2Name: storedPartyAddress2Name
        }
      ])
    } else {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddress2Name: ''
        }
      ])
    }

    if (storedPartyAddress2Code && typeof storedPartyAddress2Code === 'string') {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddress2Code: storedPartyAddress2Code
        }
      ])
    } else {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strPartyAddress2Code: ''
        }
      ])
    }
  }, [
    partyName,
    setPartyName,
    setpartyCode,
    setDistributorName,
    setHeader,
    companyid,
    UserName,
    LinkCode,
    StrToken,
    clientCode
  ])

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await SiteDataAction(companyid, UserName, bu)
        const data: Site = response

        if (data.success) {
          setHeader(prevHeader => [
            {
              ...prevHeader[0],
              strSite_Code: data.data[0].Code,
              strSite_Name: data.data[0].Name
            }
          ])
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

  const submitForm = (formData: FormData) => {
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

  const submitEditForm = (formData: FormData) => {
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

    setHeader(prevHeader => [
      {
        ...prevHeader[0],
        dbloh_Amt_Gross: totalGrossAmt
      }
    ])

    setHeader(prevHeader => [
      {
        ...prevHeader[0],
        dblCGSTAmt: totalCGSTAmt
      }
    ])
    setHeader(prevHeader => [
      {
        ...prevHeader[0],
        dblSGSTAmt: totalSGSTAmt
      }
    ])
    setHeader(prevHeader => [
      {
        ...prevHeader[0],
        dblIGSTAmt: totalIGSTAmt
      }
    ])
    setHeader(prevHeader => [
      {
        ...prevHeader[0],
        dbloh_Amt_Addition: totalAdditionAmt
      }
    ])
    setHeader(prevHeader => [
      {
        ...prevHeader[0],
        dbloh_Amt_Discount: totalDiscountAmt
      }
    ])
    setHeader(prevHeader => [
      {
        ...prevHeader[0],
        dbloh_Amt_Total: calculatedTotalAmt
      }
    ])
    setHeader(prevHeader => [
      {
        ...prevHeader[0],
        dbloh_Amt_RoundOff: totalRoundOf
      }
    ])
    setHeader(prevHeader => [
      {
        ...prevHeader[0],
        dbloh_Amt_Net: netAmount
      }
    ])

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
    header: DMSSordHeader[],
    setHeader: Dispatch<SetStateAction<DMSSordHeader[]>>,
    detail: DMSSordItemDetailUpdatePostData[],
    setDetail: Dispatch<SetStateAction<DMSSordItemDetailUpdatePostData[]>>,
    docId: string,
    setIsModalOpen: Dispatch<React.SetStateAction<boolean>>,
    username: string | number | true | object | null,
    setIsSelect: Dispatch<SetStateAction<boolean>>,
    bu: string | null
  ) => {
    event.preventDefault()
    setIsSaving(true)
    console.log('Submitted TCT values:', TCT)
    const updatedPostFormData = {
      clsHeader: [
        {
          intdocId: docId,
          strSite_Code: header[0].strSite_Code,
          strV_Type: header[0].strV_Type || 'SODMS',
          intV_No: header[0].intV_No,
          strRecId: header[0].strRecId,
          strrecIdPrefix: header[0].strrecIdPrefix,
          strV_Date: header[0].strV_Date || new Date().toISOString().split('T')[0], // current date
          intv_Prefix: header[0].intv_Prefix || 0,
          strorderType: header[0].strorderType,
          strpartyCode: header[0].strpartyCode || '',
          strdelAt: header[0].strdelAt,
          strdelDate: header[0].strdelDate,
          dbloh_Amt_Gross: header[0].dbloh_Amt_Gross,
          dbloh_Amt_Total: header[0].dbloh_Amt_Total,
          dbloh_Amt_RoundOff: header[0].dbloh_Amt_RoundOff,
          dbloh_Amt_Net: header[0].dbloh_Amt_Net,
          dbloh_Amt_Addition: header[0].dbloh_Amt_Addition,
          dblCMN_Addition: header[0].dblCMN_Addition || 0,
          dblCMN_Deduction: header[0].dblCMN_Deduction || 0,
          dbloh_Amt_Discount: header[0].dbloh_Amt_Discount,
          strremark: header[0].strremark || '',
          strconsignee: header[0].strconsignee,
          strtoPlace: header[0].strtoPlace,
          strdistributor: header[0].strdistributor || '',
          strtransfered: header[0].strtransfered || '1',
          strnotification: header[0].strnotification || '',
          strnotificationDate: header[0].strnotificationDate || '',
          intisClosed: header[0].intisClosed || 0,
          stru_EntDt_LatestLine: header[0].stru_EntDt_LatestLine || '',
          strPreparedBy: header[0].strPreparedBy || '',
          stru_Name: header[0].stru_Name || username?.toString(),
          strapprovedBy: header[0].strapprovedBy || '',
          strapprovedDate: header[0].strapprovedDate || '',
          strcancelledBy: header[0].strcancelledBy || '',
          strcancelledDate: header[0].strcancelledDate || '',
          intwtaCode: header[0].intwtaCode || 0,
          intwtaVSno: header[0].intwtaVSno || 0,
          strpartyOrdNo: header[0].strpartyOrdNo,
          strpartyOrdDt: header[0].strpartyOrdDt,
          struserVerifiedDate: header[0].struserVerifiedDate,
          strT_Type: header[0].strT_Type || '',
          strContractSalesOrder: header[0].strContractSalesOrder || '',
          strRemarks: header[0].strRemarks || '.',
          strplaceOfSupply: header[0].strplaceOfSupply || '',
          strtoplaceCity: header[0].strtoPlace,
          strSite_Name: header[0].strSite_Name,
          strpartyName: header[0].strpartyName,
          strdelAtName: header[0].strdelAtName,
          strconsigneeName: header[0].strconsigneeName,
          struserVerifiedBy: header[0].struserVerifiedBy,
          strToPlaceValue: header[0].strToPlaceValue,
          strT_TypeName: header[0].strT_TypeName || '',
          strholdRemark: header[0].strholdRemark || '',
          strRole: 'Employee',
          strConsiaddressbook: header[0].strConsiaddressbook,
          strConsiaddressbookName: header[0].strConsiaddressbookName,
          strdeladdress1: header[0].strdeladdress1,
          strdeladdress2: header[0].strdeladdress2,
          strPartyaddress1: header[0].strPartyaddress1,
          strPartyaddress2: header[0].strPartyaddress2,
          strPartyaddressbook: header[0].strPartyaddressbook,
          strPartyaddressbookName: header[0].strPartyaddressbookName,
          strConsiaddress1: header[0].strConsiaddress1,
          strConsiaddress2: header[0].strConsiaddress2,
          strdeladdressbook: header[0].strdeladdressbook,
          strdeladdressbookName: header[0].strdeladdressbookName,
          strFreightType: header[0].strFreightType,
          strFreightTypeName: header[0].strFreightTypeName,
          strSalesPersonCode: header[0].strSalesPersonCode,
          strSalesPersonName: header[0].strSalesPersonName,
          strFormCode: header[0].strFormCode,
          strFormCodeValue: header[0].strFormCodeValue,
          dblIGSTAmt: header[0].dblIGSTAmt,
          dblCGSTAmt: header[0].dblCGSTAmt,
          dblSGSTAmt: header[0].dblSGSTAmt
        }
      ],
      clsItemDetail: detail,
      clsTermCondition: TCT,
      clsDMSMainOH: ohHeader
    }

    setIsModalOpen(false)
    let res: Add_PlaceOrder | null = null

    try {
      res = await placeOrderAction(updatedPostFormData, UserName, Site_Code as string, companyid as string, bu)

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
            setHeader([
              {
                ...header[0],
                intdocId: '',
                strSite_Code: '',
                strSite_Name: '',
                strV_Type: '',
                intV_No: 0,
                strRecId: '',
                strrecIdPrefix: '',
                strV_Date: '',
                intv_Prefix: 0,
                strorderType: undefined,
                strpartyCode: '',
                strpartyName: '',
                strdelAt: '',
                strdelAtName: '',
                strdelDate: '',
                dbloh_Amt_Gross: 0,
                dbloh_Amt_Total: 0,
                dbloh_Amt_RoundOff: 0,
                dbloh_Amt_Net: 0,
                dbloh_Amt_Addition: 0,
                dblCMN_Addition: 0,
                dblCMN_Deduction: 0,
                dbloh_Amt_Discount: 0,
                strremark: '',
                strconsignee: '',
                strconsigneeName: '',
                strtoPlace: '',
                strdistributor: '',
                strdistributorName: '',
                strtransfered: '',
                strnotification: '',
                strnotificationDate: '',
                intisClosed: 0,
                stru_EntDt_LatestLine: '',
                strPreparedBy: '',
                stru_Name: '',
                strapprovedBy: '',
                strapprovedDate: '',
                strcancelledBy: '',
                strcancelledDate: '',
                intwtaCode: 0,
                intwtaVSno: 0,
                strpartyOrdNo: '',
                strpartyOrdDt: '',
                struserVerifiedBy: '',
                struserVerifiedDate: '',
                strToPlaceValue: '',
                strT_Type: '',
                strT_TypeName: '',
                strholdRemark: '',
                strContractSalesOrder: '',
                strContractSalesOrderValue: '',
                strRemarks: '',
                strplaceOfSupply: '',
                strtoplaceCity: '',
                strRole: '',
                strConsiaddressbook: '',
                strConsiaddressbookName: '',
                strConsiaddress1: '',
                strConsiaddress2: '',
                strdeladdressbook: '',
                strdeladdressbookName: '',
                strdeladdress1: '',
                strdeladdress2: '',
                strPartyaddressbook: '',
                strPartyaddressbookName: '',
                strPartyaddress1: '',
                strPartyaddress2: '',

                strFreightType: '',
                strFreightTypeName: '',

                strSalesPersonCode: '',
                strSalesPersonName: '',

                TansType_Category: '',
                strFormCode: '',
                strFormCodeValue: '',
                dblCGSTAmt: 0,
                dblIGSTAmt: 0,
                dblSGSTAmt: 0
              }
            ])

            setDetail([
              {
                ...detail[0],
                dblamount: null,
                dbllength: null,
                dbloh_Amt_Addition: null,
                dbloh_Amt_AgreedRate: null,
                dbloh_Amt_Discount: null,
                dbloh_Amt_Gross: null,
                dbloh_Amt_Net: null,
                dbloh_At_Addition: null,
                dbloh_At_Discount: null,
                dblqty: 0,
                dblrate: null,
                dblreel: 0,
                dbltl_ExcessQty: 0,
                dblwidth: null,
                intcontractSo_Sno: 0,
                intcontractSoV_Sno: 0,
                intdocId: '',
                intpldV_SNo: 0,
                intv_SNo: 0,
                strbf: '',
                strBFValue: '',
                strclosed: '',
                strcontractSoDocId: '',
                strgrain: '',
                strgrainValue: '',
                strgsm: '',
                strGsmValue: '',
                stritemCode: '',
                stritemDesc: '',
                strItemName: '',
                strpldDocId: '',
                strpldRateApplicableOn: '',
                strsizeUnit: '',
                strsizeUnitName: '',
                strtl_ExcessPer: '',
                strPackingType: '',
                strPackingTypeName: '',
                dblCGST_Per: 0,
                dblCGSTAmt: 0,
                dblSGST_Per: 0,
                dblSGSTAmt: 0,
                dblIGST_Per: 0,
                dblIGSTAmt: 0
              }
            ])
            initializePartyOrderDate() // Sets today's party order date
            fetchEnviroDataAndSetDeliveryDate() // Fetches delivery date from API
            const generalData: TCTData = await TermsCondAction(companyid, Site_Code, bu)
            setTCT(generalData?.data || [])

            const resp = await getOHheaderAction(
              companyid as string,
              Site_Code as string,
              UserName as string,
              bu as string,
              header[0]?.strV_Type || ''
            )
            setOHHeader(resp?.data || [])
            setIsSelect(true)
            setIsPlaced(true)
            header[0]?.strorderType
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
        autoClose: false,
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
    if (header[0]?.strapprovedBy) {
      setApprovedpopupVisible(true)
    } else if (header[0]?.struserVerifiedBy) {
      setVerifiedpopupVisible(true)
    } else {
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

      const isPartyValid = validateField(header[0]?.strpartyCode, setPartyError, 'Please fill Party')
      const isDeliveryValid = validateField(header[0]?.strdelAtName, setDeliveryError, 'Please fill Delivery To')
      const isPartyOrderNoValid = validateField(
        header[0]?.strpartyOrdNo,
        setPartyOrderNoError,
        'Please fill party order number'
      )
      const isSiteValid = validateField(header[0]?.strSite_Name, setSiteError, 'Site Name is empty')
      const isSalesPersonValid = validateField(
        header[0]?.strSalesPersonCode,
        setSalesPersonError,
        'Please fill Sales Person'
      )
      const isFreightTypeValid = validateField(
        header[0]?.strFreightType,
        setFreightTypeError,
        'Please fill Freight Type'
      )
      const isAgtFormValid = validateField(header[0]?.strFormCode, setAgtFormError, 'Please fill Against Form')

      if (header && header.length > 0) {
        const orderDateString = header[0]?.strV_Date
          ? new Date(header[0]?.strV_Date)
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

        const deliveryDateString = header[0]?.strdelDate
        const partyorderDateString = header[0]?.strpartyOrdDt

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
        isSiteValid &&
        isSalesPersonValid &&
        isFreightTypeValid &&
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
          UserName, // Ensure `StrUserCode` is defined and available
          setIsSelect,
          bu
        )
      }
    }
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
    if ((!header[0]?.strorderType || header[0]?.strorderType === 'Select') && docId === '') {
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
        'SODMS'
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

  const handleContractSalesOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    contractSales: Contract[],
    setHeader: React.Dispatch<React.SetStateAction<DMSSordHeader[]>>,
    setContractDocId: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => {
    const code = event.target.value
    const coData = contractSales[0]?.data.find(ele => ele.DocId == code)
    if (coData) {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strContractSalesOrder: coData.DocId,
          strContractSalesOrderValue: coData.OrderNo
        }
      ])
      setContractDocId(coData.DocId)
      setDetail([])
    } else {
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          strContractSalesOrder: '',
          strContractSalesOrderValue: ''
        }
      ])
      setContractDocId('')
      setDetail([])
    }
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
          setHeader(data.data)
          const [headerData] = data.data
          // Filter out unwanted fields from headerData
          const { strpartyOrdNo, strpartyOrdDt, strdelDate, strV_Date, ...filteredData } = headerData

          // Set the filtered data into state (excluding unwanted fields)
          setHeader([filteredData])
          setContractDocId(headerData.strContractSalesOrder || '')
          setSelectedParty(headerData.strpartyCode || '')
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
            bu as string,
            header[0]?.strV_Type || ''
          )

          const mergedDetail = detailList.map(detailItem => {
            const matchingOH = ohData?.data?.filter(oh => oh.intV_Sno === detailItem.intv_SNo) || []

            return {
              ...detailItem,
              clsItemDmsOH: matchingOH // Merge OH data here
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
          bu as string,
          header[0]?.strV_Type || ''
        )
        if (data) {
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

      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          intdocId: '',
          strSite_Code: '',
          strSite_Name: '',
          strV_Type: '',
          intV_No: 0,
          strRecId: '',
          strrecIdPrefix: '',
          strV_Date: '', // ISO format date
          intv_Prefix: 0,
          strorderType: '',
          strpartyCode: '',
          strpartyName: '',
          strdelAt: '',
          strdelAtName: '',
          // strdelDate: '', // ISO format date
          dbloh_Amt_Gross: 0,
          dbloh_Amt_Total: 0,
          dbloh_Amt_RoundOff: 0,
          dbloh_Amt_Net: 0,
          dbloh_Amt_Addition: 0,
          dblCMN_Addition: 0,
          dblCMN_Deduction: 0,
          dbloh_Amt_Discount: 0,
          strremark: '',
          strconsignee: '',
          strconsigneeName: '',
          strtoPlace: '',
          strdistributor: '',
          strdistributorName: '',
          strtransfered: '', // could be a boolean (true/false)
          strnotification: '',
          strnotificationDate: '', // ISO format date
          intisClosed: 0, // could be a boolean (0/1)
          stru_EntDt_LatestLine: '', // ISO format date
          strPreparedBy: '',
          stru_Name: '',
          strapprovedBy: '',
          strapprovedDate: '', // ISO format date
          strcancelledBy: '',
          strcancelledDate: '', // ISO format date
          intwtaCode: 0,
          intwtaVSno: 0,
          strpartyOrdNo: '',
          // strpartyOrdDt: '', // ISO format date
          struserVerifiedBy: '',
          struserVerifiedDate: '', // ISO format date
          strToPlaceValue: '',
          strT_Type: '',
          strT_TypeName: '',
          strholdRemark: '',
          strContractSalesOrder: '',
          strContractSalesOrderValue: '',
          strRemarks: '',
          strplaceOfSupply: '',
          // strOrderNumber: number;
          strtoplaceCity: '',
          // strholdDate: '',
          strRole: '',
          strConsiaddress1: '',
          strConsiaddress2: '',
          strConsiaddressbook: '',
          strConsiaddressbookName: '',
          strdeladdress1: '',
          strdeladdress2: '',
          strdeladdressbook: '',
          strdeladdressbookName: '',
          strPartyaddress1: '',
          strPartyaddress2: '',
          strPartyaddressbook: '',
          strPartyaddressbookName: '',

          strFreightType: '',
          strFreightTypeName: '',
          strSalesPersonCode: '',
          strSalesPersonName: '',
          TansType_Category: '',
          strplaceOfSupplyName: '',
          strFormCode: '',
          strFormCodeValue: '',
          dblCGSTAmt: 0,
          dblIGSTAmt: 0,
          dblSGSTAmt: 0
        }
      ])

      setDetail(prevHeader => [
        {
          ...prevHeader[0],
          dblamount: null, // This is fine as it's number or null
          dbllength: null, // This is also fine as number or null
          dbloh_Amt_Addition: null,
          dbloh_Amt_AgreedRate: null,
          dbloh_Amt_Discount: null,
          dbloh_Amt_Gross: null,
          dbloh_Amt_Net: null,
          dbloh_At_Addition: null,
          dbloh_At_Discount: null,
          dblqty: 0,
          dblrate: null,
          dblreel: 0,
          dbltl_ExcessQty: 0, // 0 is valid here because it's number
          dblwidth: null, // number or null
          intcontractSo_Sno: 0, // number, 0 is valid here
          intcontractSoV_Sno: 0,
          intdocId: '', // Change to empty string "" to match the type 'string'
          intpldV_SNo: 0,
          intv_SNo: 0,
          strbf: '', // Initialize as empty string for string types
          strBFValue: '', // Empty string for string fields
          strclosed: '', // Empty string
          strcontractSoDocId: '', // Empty string
          strgrain: '', // Empty string
          strgrainValue: '', // Empty string
          strgsm: '', // Empty string
          strGsmValue: '', // Empty string
          stritemCode: '', // Empty string for string fields
          stritemDesc: '', // Empty string
          strItemName: '', // Empty string
          strpldDocId: '', // Empty string
          strpldRateApplicableOn: '', // Empty string
          strsizeUnit: '', // Empty string
          strsizeUnitName: '', // Empty string
          strtl_ExcessPer: '', // Empty string
          strPackingType: '', // Empty string
          strPackingTypeName: '', // Empty string
          dblCGST_Per: 0,
          dblCGSTAmt: 0,
          dblSGST_Per: 0,
          dblSGSTAmt: 0,
          dblIGST_Per: 0,
          dblIGSTAmt: 0,
          clsItemDmsOH: []
        }
      ])

      const generalData: TCTData = await TermsCondAction(companyid, Site_Code, bu)
      if (generalData) {
        setTCT(generalData.data)
      } else {
        setTCT([])
      }

      const resp = await getOHheaderAction(
        companyid as string,
        Site_Code as string,
        UserName as string,
        bu as string,
        header[0]?.strV_Type || ''
      )
      setOHHeader(resp?.data || [])

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
      setHeader(prevHeader => [
        {
          ...prevHeader[0],
          intdocId: '',
          strSite_Code: '',
          strSite_Name: '',
          strV_Type: '',
          intV_No: 0,
          strRecId: '',
          strrecIdPrefix: '',
          strV_Date: '', // ISO format date
          intv_Prefix: 0,
          strorderType: '',
          strpartyCode: '',
          strpartyName: '',
          strdelAt: '',
          strdelAtName: '',
          // strdelDate: '', // ISO format date
          dbloh_Amt_Gross: 0,
          dbloh_Amt_Total: 0,
          dbloh_Amt_RoundOff: 0,
          dbloh_Amt_Net: 0,
          dbloh_Amt_Addition: 0,
          dblCMN_Addition: 0,
          dblCMN_Deduction: 0,
          dbloh_Amt_Discount: 0,
          strremark: '',
          strconsignee: '',
          strconsigneeName: '',
          strtoPlace: '',
          strdistributor: '',
          strdistributorName: '',
          strtransfered: '', // could be a boolean (true/false)
          strnotification: '',
          strnotificationDate: '', // ISO format date
          intisClosed: 0, // could be a boolean (0/1)
          stru_EntDt_LatestLine: '', // ISO format date
          strPreparedBy: '',
          stru_Name: '',
          strapprovedBy: '',
          strapprovedDate: '', // ISO format date
          strcancelledBy: '',
          strcancelledDate: '', // ISO format date
          intwtaCode: 0,
          intwtaVSno: 0,
          strpartyOrdNo: '',
          // strpartyOrdDt: '', // ISO format date
          struserVerifiedBy: '',
          struserVerifiedDate: '', // ISO format date
          strToPlaceValue: '',
          strT_Type: '',
          strT_TypeName: '',
          strholdRemark: '',
          strContractSalesOrder: '',
          strContractSalesOrderValue: '',
          strRemarks: '',
          strplaceOfSupply: '',
          strtoplaceCity: '',
          strRole: '',
          strConsiaddress1: '',
          strConsiaddress2: '',
          strConsiaddressbook: '',
          strConsiaddressbookName: '',
          strdeladdress1: '',
          strdeladdress2: '',
          strdeladdressbook: '',
          strdeladdressbookName: '',
          strPartyaddress1: '',
          strPartyaddress2: '',
          strPartyaddressbook: '',
          strPartyaddressbookName: '',
          strFreightType: '',
          strFreightTypeName: '',
          strSalesPersonCode: '',
          strSalesPersonName: '',
          TansType_Category: '',
          strplaceOfSupplyName: '',
          strFormCode: '',
          strFormCodeValue: '',
          dblCGSTAmt: 0,
          dblIGSTAmt: 0,
          dblSGSTAmt: 0
        }
      ])
      const generalData: TCTData = await TermsCondAction(companyid, Site_Code, bu)
      if (generalData) {
        setTCT(generalData.data)
      } else {
        setTCT([])
      }
      const resp = await getOHheaderAction(
        companyid as string,
        Site_Code as string,
        UserName as string,
        bu as string,
        header[0]?.strV_Type || ''
      )
      setOHHeader(resp?.data || [])
      console.log('pastedetail')
      promises.push(fetchDetailData())
    }

    // Wait for all promises to resolve in parallel
    await Promise.all(promises)

    if (header.length > 0) {
      await fetchEnviroDataAndSetDeliveryDate()
      initializePartyOrderDate()
    }
  }

  const fetchPartyData = async (
    setParty: Dispatch<SetStateAction<PartyforSale | undefined>>,
    username: string | number | true | object | null,
    Site_Code: string | number | true | object | null,
    companyid: string | number | true | object | null,
    bu: string | number | true | object | null
  ) => {
    try {
      const response = await PartyAction(username, Site_Code, companyid, bu)
      const data: PartyforSale = response

      if (data.success) {
        setParty(data)
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
      console.error('Failed to fetch consignees:', error)
    }
  }

  const handleDeliveryFocus = (
    isFetchedDel: boolean,
    setIsFetchedDel: Dispatch<SetStateAction<boolean>>,
    setDelivery: Dispatch<SetStateAction<Delivery[]>>,
    username: string,
    bu: string
  ) => {
    if (!isFetchedDel) {
      fetchDeliveryTo(setDelivery, username, companyid as string, Site_Code as string, bu).then(() =>
        setIsFetchedDel(true)
      )
    }
  }

  const fetchDeliveryTo = async (
    setDelivery: Dispatch<SetStateAction<Delivery[]>>,
    username: string,
    companyid: string,
    Site_Code: string,
    bu: string
  ) => {
    try {
      const response = await DeliveryAction(username, companyid, Site_Code, bu)
      const data: Delivery = response

      if (data.success) {
        setDelivery([data])
      } else {
        // If there is an error, log the error message
        const errorMessage = data.error

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
        setDelivery([])
      }
    } catch (error) {
      console.error('Failed to fetch delivery locations:', error)
    }
  }

  const handleTransactionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    transaction: TransactionTypeforSale[],
    setHeader: Dispatch<SetStateAction<DMSSordHeader[]>>,
    setTransTypeCat: React.Dispatch<React.SetStateAction<string | undefined>>,
    distributorCode: string
  ) => {
    const code = e.target.value

    if (code === '') {
      setHeader(prevHeader => [
        {
          ...prevHeader[0], // Keep previous properties if needed
          strT_Type: '',
          strT_TypeName: '',
          strSalesPersonCode: '',
          strSalesPersonName: ''
        }
      ])
    } else {
      const transactionData = transaction[0].data.find(ele => ele.code == code)

      if (transactionData) {
        setTransTypeCat(transactionData.TansType_Category)
        setHeader(prevHeader => [
          {
            ...prevHeader[0], // Keep previous properties if needed
            strT_Type: transactionData.code,
            strT_TypeName: transactionData.Name,
            TansType_Category: transactionData.TansType_Category,
            strSalesPersonCode: '',
            strSalesPersonName: ''
          }
        ])
        fetchItemName(companyid, setItem, UserName, transactionData.TansType_Category, Site_Code, bu, contractDocId)
        fetchsalesperson(
          setSalesPerson,
          distributorCode,
          transactionData.code,
          Site_Code as string,
          companyid as string,
          UserName as string,
          bu as string
        )
      }
    }
  }

  useEffect(() => {
    fetchConsignees(setConsignees, UserName, Site_Code, companyid, bu)
  }, [header[0]?.strdistributor])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientId = searchParams.get('clientId') // Get the clientId from URL

        if (clientId) {
          setdocId(clientId)
          const data: TCTData = await GetTermsCondAction({ clientId }, UserName, Site_Code, companyid, bu)
          if (data) {
            setTCT(data.data)
            console.log('Fetched client-specific data:', data)
            return // Skip general fetch if client-specific data is found
          }
        }

        // If no clientId or client-specific data not found, fetch general data
        const generalData: TCTData = await TermsCondAction(companyid, Site_Code, bu)
        if (generalData) {
          setTCT(generalData.data)
          console.log('Fetched general data:', generalData)
        } else {
          setTCT([])
        }
      } catch (error) {
        console.error('Failed to fetch TCT details:', error)
        setTCT([])
      }
    }

    if (companyid && Site_Code) {
      fetchData()
    }
  }, [companyid, Site_Code])

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

      setHeader(prev => {
        const updated = { ...prev[0], strdelDate }
        return [updated]
      })
    } catch (error) {
      console.error('Error fetching environment data:', error)
    }
  }

  const initializePartyOrderDate = () => {
    const today = new Date().toISOString().split('T')[0]

    setHeader(prev => {
      if (!prev[0]?.strpartyOrdDt) {
        const updated = { ...prev[0], strpartyOrdDt: today }
        return [updated]
      }
      return prev
    })
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
          oh => oh.intV_Sno === item.intv_SNo // match based on serial number
        )
        return {
          ...item,
          clsItemDmsOH: matchedLineOH
        }
      })

      setDetail(mergedDetail)
      console.log('mergedDetail', mergedDetail)
      setMergedDone(true)
    }
  }, [detail, ohList, mergedDone, isPaste])

  return (
    <>
      <Breadcrumb pageName={docId ? 'Edit Order' : 'Sale Order'} />

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
                <div className='md:-mt-7 -mt-4 flex justify-end gap-2 lg:hidden'>
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

              <SaleOrderDateinput
                htmlForData='strV_Date'
                labelData='Order Date'
                isReadable={true}
                valueData={formatDateForInput(header[0]?.strV_Date) || formatDateForInput(currentDate)}
                idData='strV_Date'
                nameData='strV_Date'
              />

              <SaleOrderHelp
                htmlforData='transactionType'
                labelData='Transaction Type'
                idData='transactionType'
                party={transaction[0]?.data?.map((ele, index) => ({
                  Code: ele.code,
                  Name: ele.Name,
                  keyData: index
                }))}
                valueData={header[0]?.strT_Type || ''}
                optionData={header.length > 0 ? header[0]?.strT_TypeName || 'Select' : 'Select'}
                onChange={e =>
                  handleTransactionTypeChange(
                    e,
                    transaction,
                    setHeader,
                    setTransTypeCat,
                    header[0]?.strdistributor || ''
                  )
                }
                onFocus={() =>
                  handleTransactionFocus(
                    isFetchedTransaction,
                    setIsFetchedTransaction,
                    UserName as string,
                    companyid as string,
                    Site_Code as string,
                    bu as string
                  )
                }
                CoSNoStar={true}
              />

              <div className='mt-3'>
                <label htmlFor='orderType' className=' block text-sm font-medium text-black'>
                  Order Type <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  id='orderType'
                  onChange={e => handleOrderTypeChange(e, setHeader, setOrderType, setDetail)}
                  className={`form-datepicker w-full rounded border border-gray-300 bg-transparent h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-gray-500 dark:focus:border-primary  ${orderTypeerror ? 'dark:border-danger border-danger' : 'border-stroke'}`}
                >
                  {header[0]?.strorderType === undefined ? (
                    <>
                      <option value='Select'>Choose a Product</option>
                      <option value='R'>Reel</option>
                      <option value='S'>Sheet</option>
                    </>
                  ) : (
                    <>
                      {header[0]?.strorderType === 'S' && (
                        <>
                          <option className='py-2' value={header[0].strorderType}>
                            Sheet
                          </option>
                          <option value='R'>Reel</option>
                        </>
                      )}
                      {header[0]?.strorderType === 'R' && (
                        <>
                          <option className='py-2' value={header[0].strorderType}>
                            Reel
                          </option>
                          <option value='S'>Sheet</option>
                        </>
                      )}
                    </>
                  )}
                </select>
              </div>

              <div>
                <SaleOrderHelp
                  htmlforData='strpartyCode'
                  labelData='Party'
                  idData='strpartyCode'
                  party={party?.data?.map((item, index) => ({
                    Code: item.Code,
                    Name: item.Name,
                    keyData: index
                  }))}
                  valueData={header[0]?.strpartyCode || ''}
                  optionData={header.length > 0 ? header[0]?.strpartyName || 'Select' : 'Select'}
                  onChange={event =>
                    handlePartyChange(
                      event,
                      party,
                      setHeader,
                      setPartyError,
                      setPartyaddressbook,
                      setSalesPerson,
                      setAgtForm,
                      header[0].strT_Type || '',
                      UserName,
                      Site_Code,
                      companyid,
                      bu
                    )
                  }
                  onFocus={() =>
                    handlePartyDataFocus(isFetchedParty, setIsFetchedParty, () =>
                      fetchPartyData(setParty, UserName, Site_Code, companyid, bu)
                    )
                  }
                  stateToSet={setOpenPartyHelp}
                  CoSNoStar={true}
                />
                {partyError && <div className='text-danger text-sm text-red-700'>{partyError}</div>}
              </div>
              <div className='mt-3'>
                <TextBoxOne
                  label='Distributor'
                  value={header[0]?.strdistributorName}
                  type='text'
                  disabled={false}
                  readOnly={true}
                  labelColor=''
                />
              </div>

              <div className='mt-3'>
                <TextBoxOne
                  value={header[0]?.strPartyaddress1}
                  label='Party Address 1'
                  type='text'
                  disabled={false}
                  readOnly={true}
                />
              </div>

              <div className='mt-3'>
                <TextBoxOne
                  value={header[0]?.strPartyaddress2}
                  label='Party Address 2'
                  type='text'
                  disabled={false}
                  readOnly={true}
                />
              </div>

              <div>
                <SaleOrderHelp
                  htmlforData='consignee'
                  labelData='Consignee'
                  idData='consignee'
                  party={consignees[0]?.data?.map((consignee, index) => ({
                    Code: consignee.Code,
                    Name: consignee.Name,
                    keyData: index
                  }))}
                  valueData={header[0]?.strconsignee || ''}
                  optionData={header.length > 0 ? header[0]?.strconsigneeName || 'Select' : 'Select'}
                  onChange={event =>
                    handleConsigneeChange(
                      event,
                      consignees,
                      setHeader,
                      setConsigneeError,
                      setAddressbook,
                      setStrConsignee,
                      UserName,
                      Site_Code,
                      companyid,
                      bu
                    )
                  }
                  onFocus={() =>
                    handleConsigneeFocus(isFetchedCon, setIsFetchedCon, () =>
                      fetchConsignees(setConsignees, UserName, Site_Code, companyid, bu)
                    )
                  }
                  stateToSet={setOpenConsigneeHelp}
                  CoSNoStar={false}
                />
                {consigneeError && <div className='text-danger text-sm text-red-700'>{consigneeError}</div>}
              </div>

              <SaleOrderInput
                htmlForData='address1'
                labelData='Address1'
                isStar={false}
                valueData={header[0]?.strConsiaddress1 || ''}
                idData='address1'
                typeData='text'
                isReadOnly={true}
              />

              <SaleOrderInput
                htmlForData='address2'
                labelData='Address2'
                isStar={false}
                valueData={header[0]?.strConsiaddress2 || ''}
                idData='address2'
                typeData='text'
                isReadOnly={true}
              />

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
                  valueData={header[0]?.strFormCode || ''}
                  optionData={header.length > 0 ? header[0]?.strFormCodeValue || 'Select' : 'Select'}
                  onChange={e => handleAgtFormChange(e, agtForm, setHeader, setAgtFormError, setDetail)}
                  onFocus={() => {
                    handleAgtFormFocus(
                      Site_Code,
                      companyid,
                      UserName,
                      isFetchedAgtForm,
                      setIsFetchedAgtForm,
                      setAgtForm,
                      bu
                    )
                  }}
                  CoSNoStar={true}
                />
                {agtFormError && <div className='text-danger text-sm text-red-700'>{agtFormError}</div>}
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
                      htmlforData='strdelAt'
                      labelData='Delivery'
                      idData='strdelAt'
                      party={delivery[0]?.data?.map((item, index) => ({
                        Code: item.Code,
                        Name: item.Name,
                        keyData: index
                      }))}
                      valueData={header[0]?.strdelAt || ''}
                      optionData={header.length > 0 ? header[0]?.strdelAtName || 'Select' : 'Select'}
                      onChange={event =>
                        handleDeliveryChange(
                          event,
                          delivery,
                          setHeader,
                          setToPlaceError,
                          setDeliveryError,
                          setDelAddressbook,
                          UserName,
                          Site_Code,
                          companyid,
                          bu
                        )
                      }
                      onFocus={() =>
                        handleDeliveryFocus(
                          isFetchedDel,
                          setIsFetchedDel,
                          setDelivery,
                          UserName as string,
                          bu as string
                        )
                      }
                      stateToSet={setOpenDeliveryHelp}
                      CoSNoStar={true}
                    />
                    {deliveryError && <div className='text-danger text-sm text-red-700'>{deliveryError}</div>}
                  </div>

                  <SaleOrderInput
                    htmlForData='deladdress1'
                    labelData='Delivery Address1'
                    isStar={false}
                    valueData={header[0]?.strdeladdress1 || ''}
                    idData='deladdress1'
                    typeData='text'
                    isReadOnly={true}
                  />

                  <SaleOrderInput
                    htmlForData='address2'
                    labelData='Delivery Address2'
                    isStar={false}
                    valueData={header[0]?.strdeladdress2 || ''}
                    idData='address2'
                    typeData='text'
                    isReadOnly={true}
                  />
                  <div>
                    <SaleOrderInput
                      htmlForData='strpartyOrdNo'
                      labelData='Party Order No.'
                      isStar={true}
                      valueData={header[0]?.strpartyOrdNo || ''}
                      idData='strpartyOrdNo'
                      typeData='text'
                      isReadOnly={false}
                      nameData='strpartyOrdNo'
                      placeHolderData='Enter Party Order No.'
                      onChangeFun={event => handleHeaderChange(event, setHeader, setPartyOrderNoError)}
                    />
                    {partyOrderNoError && <div className='text-danger text-sm text-red-700'>{partyOrderNoError}</div>}
                  </div>

                  <SaleOrderDateinput
                    htmlForData='strpartyOrdDt'
                    labelData='Party Order Date'
                    isReadable={false}
                    onChange={event => handleHeaderChange(event, setHeader, setPartyOrderNoError)}
                    valueData={header[0]?.strpartyOrdDt || ''}
                    idData='strpartyOrdDt'
                    nameData='strpartyOrdDt'
                    minDate={new Date().toISOString().split('T')[0]}
                  />

                  <SaleOrderDateinput
                    htmlForData='strdelDate'
                    labelData='Delivery Date'
                    isReadable={false}
                    onChange={event => handleHeaderChange(event, setHeader, setPartyOrderNoError)}
                    valueData={header[0]?.strdelDate || ''}
                    idData='strdelDate'
                    nameData='strdelDate'
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

              <div className='mt-3'>
                <TextBoxOne
                  label='To Place'
                  type='text'
                  value={header[0]?.strToPlaceValue || ''}
                  disabled={false}
                  readOnly={true}
                  labelColor='red'
                />

                {toPlaceError && <div className='text-danger text-sm text-red-700'>{toPlaceError}</div>}
              </div>

              <div className='mt-3'>
                <TextBoxOne
                  label='Site'
                  value={header[0]?.strSite_Name}
                  type='text'
                  disabled={false}
                  readOnly={true}
                  labelColor='red'
                />

                {siteError && <div className='text-danger text-sm text-red-700'>{siteError}</div>}
              </div>

              <SaleOrderHelp
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
              />
              <div>
                <SaleOrderHelp
                  htmlforData='freighttype'
                  labelData='Freight Type'
                  idData='freighttype'
                  party={freighttype[0]?.data?.map((ele, index) => ({
                    Code: ele.Code,
                    Name: ele.Name,
                    keyData: index
                  }))}
                  valueData={header[0]?.strFreightType || ''}
                  optionData={header[0]?.strFreightTypeName || ''}
                  onChange={e => handlefreighttypeChange(e, freighttype, setHeader, setFreightTypeError)}
                  onFocus={() => {
                    handlefreighttypeFocus(
                      String(Site_Code),
                      String(companyid),
                      String(UserName),
                      isFetchedFreightType,
                      setIsFetchedFreightType,
                      String(bu)
                    )
                  }}
                  CoSNoStar={true}
                />
                {freightTypeError && <div className='text-danger text-sm text-red-700'>{freightTypeError}</div>}
              </div>

              <div>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Time and date --> */}

      <div className='mt-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
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
      </div>

      {header[0]?.strnotification ? (
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
                  defaultValue={header[0]?.strholdRemark || ''}
                  className='w-full h-19 rounded-lg border-[1.5px] border-stroke bg-transparent md:px-5 px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary'
                ></textarea>
              </div>
            </div>
          </div>
        </>
      ) : null}

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
        <div className='overflow-x-auto mt-2'>
          {/* <TableThree /> */}
          <div className='rounded-sm border border-stroke bg-white px-2 pb-2 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-2 xl:pb-1'>
            <div className='max-w-full overflow-x-auto'>
              <table className='w-full table-auto'>
                <thead>
                  <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                    <th className='min-w-[220px] px-1 py-4 font-medium text-black  xl:pl-4 text-sm'>ITEM NAME</th>
                    <th className='min-w-[60px] px-1 py-4 font-medium text-black  text-sm'>BF</th>
                    <th className='min-w-[60px] px-1 py-4 font-medium text-black  text-sm'>GSM</th>
                    <th className='min-w-[60px] px-1 py-4 font-medium text-black  text-sm'>Length</th>
                    <th className='min-w-[60px] px-1 py-4 font-medium text-black  text-sm'>Width</th>
                    <th className='min-w-[60px] px-1 py-4 font-medium text-black  text-sm'>Size Unit</th>
                    <th className='min-w-[60px] px-1 py-4 font-medium text-black  text-sm'>Reel/Pack</th>
                    <th className='min-w-[60px] px-1 py-4 font-medium text-black  text-sm'>Weight</th>
                    <th className='min-w-[60px] px-1 py-4 font-medium text-black  text-sm'>Billing Rate</th>
                    <th className='min-w-[60px] px-1 py-4 font-medium text-black  text-sm'>Agreed Rate</th>
                    <th className='min-w-[60px] px-1 py-4 font-medium text-black  text-sm'>Gross Amount</th>
                    <th className='px-1 py-4 font-medium text-black  text-center text-sm'>Action</th>
                  </tr>
                </thead>
                {!isSelect &&
                  detail.map((ele, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark xl:pl-4'>
                            <h5 className='text-sm font-medium text-black '>
                              {ele.strItemName} {/* Changed from detail.strItemName to ele.strItemName */}
                            </h5>
                          </td>
                          <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark'>
                            <p className={`inline-flex rounded-full bg-opacity-10 py-1 text-sm font-medium`}>
                              {ele.strBFValue} {/* Changed from submission.strBFValue to ele.strBFValue */}
                            </p>
                          </td>
                          <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark'>
                            <p className='text-black  text-sm'>
                              {ele.strGsmValue} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                            </p>
                          </td>

                          <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark'>
                            <p className='text-black  text-sm'>{ele.dbllength === null ? 0 : ele.dbllength || 0}</p>
                          </td>

                          <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark'>
                            <p className='text-black  text-sm'>
                              {ele.dblwidth} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                            </p>
                          </td>

                          <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark'>
                            <p className='text-black  text-sm'>
                              {ele.strsizeUnitName} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                            </p>
                          </td>

                          <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark'>
                            <p className='text-black  text-sm'>
                              {ele.dblreel} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                            </p>
                          </td>
                          <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark'>
                            <p className='text-black  text-sm'>
                              {ele.dblqty} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                            </p>
                          </td>
                          <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark'>
                            <p className='text-black  text-sm'>
                              {ele.dblrate} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                            </p>
                          </td>
                          <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark'>
                            <p className='text-black  text-sm'>
                              {ele.dbloh_Amt_AgreedRate} {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                            </p>
                          </td>

                          <td className='border-b border-[#eee] px-1 py-2 dark:border-strokedark'>
                            <p className='text-black  text-sm'>
                              {ele.dbloh_Amt_Gross?.toFixed(2)}{' '}
                              {/* Changed from submission.strGsmValue to ele.strGsmValue */}
                            </p>
                          </td>

                          {
                            <td className='border-b border-[#eee] px-6 py-2 dark:border-strokedark'>
                              <div className='flex items-center space-x-3'>
                                <button
                                  onClick={() =>
                                    toggleViewModal(index, detail, setViewItem, setViewIndex, setIsViewModalOpen)
                                  }
                                  className='hover:text-primary'
                                >
                                  <GrView />
                                </button>

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
                    <tr className='bg-gray-100 dark:bg-meta-4'>
                      <td className='px-1 py-2 font-semibold text-black  xl:pl-4 text-sm' colSpan={6}>
                        Total
                      </td>
                      <td className='px-1 py-2 font-semibold text-black  text-sm'>
                        {/* Total Weight */}
                        {detail.reduce((total, item) => {
                          const qty = typeof item.dblreel === 'string' ? parseFloat(item.dblreel) : item.dblreel || 0
                          return total + qty
                        }, 0)}
                      </td>

                      <td className='px-1 py-2 font-semibold text-black  text-sm'>
                        {/* Total Weight */}
                        {detail
                          .reduce((total, item) => {
                            const qty = typeof item.dblqty === 'string' ? parseFloat(item.dblqty) : item.dblqty || 0
                            return total + qty
                          }, 0)
                          .toFixed(3)}
                      </td>
                      <td colSpan={2}></td>
                      <td className='px-1 py-2 font-semibold text-black  text-sm'>
                        {/* Total Amount */}
                        {detail
                          .reduce((total, item) => {
                            const amt =
                              typeof item.dbloh_Amt_Gross === 'string'
                                ? parseFloat(item.dbloh_Amt_Gross)
                                : item.dbloh_Amt_Gross || 0
                            return total + amt
                          }, 0)
                          .toFixed(2)}
                      </td>

                      <td></td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <ViewModal isViewModalOpen={isViewModalOpen} viewItem={viewItem} setIsViewModalOpen={setIsViewModalOpen} />
          </div>
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
          <HeaderOHComp<DMSSordItemDetailUpdatePostData>
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
        ordertype={orderType || header[0]?.strorderType}
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

      <MultiHelp<PartyDataforSale>
        defaultSearch={header[0]?.strpartyName || ''}
        open={openPartyHelp}
        onClose={() => setOpenPartyHelp(false)}
        onSelect={data =>
          handleRowSelect({
            type: 'strpartyCode',
            item: data,
            setHeader,
            setTriggerFetch,
            handleClose,
            setAddressbook,
            setDelAddressbook,
            UserName,
            LinkCode,
            StrToken,
            clientCode,
            Site_Code,
            companyid,
            StrConsignee,
            bu
          })
        }
        fetchItems={async () => {
          if (UserName && Site_Code && companyid && bu) {
            const response: PartyforSale = await PartyAction(UserName, Site_Code, companyid, bu)
            return response.data
          } else {
            return [] // Return empty array if any required value is missing
          }
        }}
        columnsConfig={PartyColumnsConfig}
        title='Party Help'
        dialogWidth='40%'
      />

      <MultiHelp<ConsigneeData>
        // type='strconsignee'
        defaultSearch={header[0]?.strconsigneeName || ''}
        open={openConsigneeHelp}
        onClose={() => setOpenConsigneeHelp(false)}
        onSelect={data =>
          handleRowSelect({
            type: 'strconsignee',
            item: data,
            setHeader,
            setTriggerFetch,
            handleClose,
            setAddressbook,
            setDelAddressbook,
            UserName,
            LinkCode,
            StrToken,
            clientCode,
            Site_Code,
            companyid,
            StrConsignee,
            bu
          })
        }
        fetchItems={async () => {
          if (UserName && Site_Code && companyid && bu) {
            const response: Consignee = await ConsigneesAction(UserName, Site_Code, companyid, bu)
            return response.data
          } else {
            return [] // Return empty array if any required value is missing
          }
        }}
        columnsConfig={consigneeColumnsConfig}
        title='Consignee Help'
        dialogWidth='40%'
      />

      <MultiHelp<ConsigneeData>
        // type='strdelAt'
        defaultSearch={header[0]?.strdelAtName || ''}
        open={openDeliveryHelp}
        onClose={() => setOpenDeliveryHelp(false)}
        onSelect={data =>
          handleRowSelect({
            type: 'strdelAt',
            item: data,
            setHeader,
            setTriggerFetch,
            handleClose,
            setAddressbook,
            setDelAddressbook,
            UserName,
            LinkCode,
            StrToken,
            clientCode,
            Site_Code,
            companyid,
            StrConsignee,
            bu
          })
        }
        fetchItems={async () => {
          if (UserName && Site_Code && companyid && bu) {
            const response: Delivery = await DeliveryAction(UserName, companyid, Site_Code, bu)

            return response.data
          } else {
            return []
          }
        }}
        columnsConfig={consigneeColumnsConfig}
        title='Delivery To Help'
        dialogWidth='40%'
      />

      <MultiHelp<AddressBookData>
        // type='strConsiaddressbook'
        defaultSearch={header[0]?.strConsiaddressbookName || ''}
        open={openAddressBookHelp}
        onClose={() => setOpenAddressBookHelp(false)}
        onSelect={data =>
          handleRowSelect({
            type: 'strConsiaddressbook',
            item: data,
            setHeader,
            setTriggerFetch,
            handleClose,
            setAddressbook,
            setDelAddressbook,
            UserName,
            LinkCode,
            StrToken,
            clientCode,
            Site_Code,
            companyid,
            StrConsignee,
            bu
          })
        }
        fetchItems={async () => {
          const strconsignee = header[0]?.strconsignee || ''
          if (strconsignee && UserName && Site_Code && companyid) {
            const response: AddressBook = await Addressbookaction(strconsignee, UserName, Site_Code, companyid, bu)
            console.log('AddressBook', response.data)
            return response.data
          } else {
            return []
          }
        }}
        columnsConfig={AddressBookConfig}
        title='Address Book Help'
        dialogWidth='40%'
      />

      <MultiHelp<AddressBookData>
        // type='strdeladdressbook'
        defaultSearch={header[0]?.strdeladdressbookName || ''}
        open={openDelAddressBookHelp}
        onClose={() => setOpenDelAddressBookHelp(false)}
        onSelect={data =>
          handleRowSelect({
            type: 'strdeladdressbook',
            item: data,
            setHeader,
            setTriggerFetch,
            handleClose,
            setAddressbook,
            setDelAddressbook,
            UserName,
            LinkCode,
            StrToken,
            clientCode,
            Site_Code,
            companyid,
            StrConsignee,
            bu
          })
        }
        fetchItems={async () => {
          const strdelAt = header[0]?.strdelAt || ''
          if (strdelAt && UserName && Site_Code && companyid) {
            const response: AddressBook = await Addressbookaction(strdelAt, UserName, Site_Code, companyid, bu)
            return response.data
          } else {
            return []
          }
        }}
        columnsConfig={AddressBookConfig}
        title='Delivery Address Book Help'
        dialogWidth='40%'
      />

      <MultiHelp<AddressBookData>
        // type='strPartyaddressbook'
        defaultSearch={header[0]?.strPartyaddressbookName || ''}
        open={openPartyAddressBookHelp}
        onClose={() => setOpenPartyAddressBookHelp(false)}
        onSelect={data =>
          handleRowSelect({
            type: 'strPartyaddressbook',
            item: data,
            setHeader,
            setTriggerFetch,
            handleClose,
            setAddressbook,
            setDelAddressbook,
            UserName,
            LinkCode,
            StrToken,
            clientCode,
            Site_Code,
            companyid,
            StrConsignee,
            bu
          })
        }
        fetchItems={async () => {
          const strdelAt = header[0]?.strpartyCode || ''
          if (strdelAt && UserName && Site_Code && companyid) {
            const response: AddressBook = await Addressbookaction(strdelAt, UserName, Site_Code, companyid, bu)
            return response.data
          } else {
            return []
          }
        }}
        columnsConfig={AddressBookConfig}
        title='Party  Address Book Help'
        dialogWidth='40%'
      />
    </>
  )
}

export default SaleOrderEntry
