import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import orderVerifyAction from '@/app/action/orderVerifyAction'
import type { OrderStatusData } from '@/components/interfaces/page'

interface OrderData {
  success: boolean
  responseText: string
}
interface GenericOrder {
  [key: string]: any // Allow any key with any value type
}

export const handleCancel = (
  setPopupVisible: Dispatch<SetStateAction<boolean>>,
  setClientIdToCheck: Dispatch<SetStateAction<number | null>>
) => {
  setPopupVisible(false)
  setClientIdToCheck(null)
}

export const handleCheckboxChange = (
  clientId: number,
  checked: boolean,
  setClientIdToCheck: Dispatch<SetStateAction<number | null>>,
  setOrderDocId: Dispatch<SetStateAction<number>>,
  setPopupVisible: Dispatch<SetStateAction<boolean>>,
  setPopupAction: Dispatch<SetStateAction<'verify' | 'unverify'>>,
  setChecked: Dispatch<SetStateAction<boolean | undefined>>
) => {
  setClientIdToCheck(clientId)
  setOrderDocId(clientId)
  setPopupVisible(true)
  setChecked(checked)
  if (checked) {
    setPopupAction('unverify') // If checked, the action is unverify
  } else {
    setPopupAction('verify') // If unchecked, the action is verify
  }
}


export const handleConfirm = async (
  docId: number,
  clientIdToCheck: number | null,
  setCheckedClients: Dispatch<SetStateAction<Set<number>>>,
  setPopupVisible: Dispatch<SetStateAction<boolean>>,
  setClientIdToCheck: Dispatch<SetStateAction<number | null>>,
  setOrderdata: Dispatch<SetStateAction<OrderStatusData[]>>,
  username: string,
  Site_Code: string,
  companyid: string,
  bu: string,
  setIsVerifying: Dispatch<SetStateAction<boolean>>
) => {
  if (clientIdToCheck !== null) {
    setIsVerifying(true);
    try {
      const response = await orderVerifyAction(docId, username, Site_Code, companyid, bu)

      if (response === null) {
        throw new Error('Failed to fetch')
      }

      const orderResponse: OrderData = await response

      if (orderResponse.success) {
        // Show toast with response text
        toast.success(orderResponse.responseText, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })

        // Get new status from response (assuming response includes it)
        const updatedStatus =
          orderResponse.responseText === 'Record has been successfully Verified !' ? 'Verified' : 'Open' // fallback to Verified

        // Update local state with new status
        setOrderdata(prevData =>
          prevData.map(item =>
            item.docid === docId
              ? {
                ...item,
                status: updatedStatus
              }
              : item
          )
        )
      } else {
        toast.error('Something went wrong !!!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }
    } catch (error: any) {
      console.error('Error verifying/unverifying order:', error)
    }
  }

  // Reset popup and selection state
  setPopupVisible(false)
  setClientIdToCheck(null)
}

export const handleFromDateChange =
  (setStrFromDate: Dispatch<SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrFromDate(e.target.value)
  }

export const handlePartyChange =
  (setSelectedParty: Dispatch<SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setSelectedParty(e.target.value)
    }

export const handlePendingorderChange =
  (setSelectedPendingOrder: Dispatch<SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setSelectedPendingOrder(e.target.value)
    }

export const handleSearchChange =
  (setSearchTerm: Dispatch<SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

export const handleToDateChange =
  (setStrToDate: Dispatch<SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrToDate(e.target.value)
  }

export const handleVerifiedConfirm = async (setVerifiedpopupVisible: Dispatch<SetStateAction<boolean>>) => {
  setVerifiedpopupVisible(false)
}

export const usePagination = <T extends GenericOrder>(
  data: T[],
  perPage: number,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>
) => {
  const numPages = Math.ceil(data.length / perPage)
  const pagesList = Array.from({ length: numPages }, (_, index) => index)

  const paginatedData = data.slice(perPage * currentPage, perPage * (currentPage + 1))

  return { numPages, pagesList, paginatedData, setCurrentPage }
}

export const handleApprovedConfirm = async (setApprovedpopupVisible: Dispatch<SetStateAction<boolean>>) => {
  setApprovedpopupVisible(false)
}

export const handleOrderTypeError = async (setOrderTypeerror: Dispatch<SetStateAction<boolean>>) => {
  setOrderTypeerror(false)
}
