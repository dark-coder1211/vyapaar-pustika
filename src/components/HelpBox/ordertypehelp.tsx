import React, { useEffect, useState } from 'react'
import { OrderTypeHelp } from '@/app/action/filteraction' // Assuming OrderTypeHelp is similar to the other Help functions
import Select from 'react-select'
import { useParams } from '@/context/paramcontext'

const OrderTypeHelpComponent = ({ filters, handleChange, filterKey, nameKey, label }: any) => {
  const [orderTypes, setOrderTypes] = useState<any[]>([])
  const { Site_Code, companyid, bu } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await OrderTypeHelp(Site_Code as string, companyid as string, bu as string) // Call OrderTypeHelp to fetch order types
        setOrderTypes(data)
      } catch (err) {
        console.error('Error fetching Order Type data:', err)
        alert('Failed to fetch order types. Please try again later.')
      }
    }
    fetchData()
  }, [])

  // Parse filters[filterKey] to get the selected value
  const selectedOrderType = filters[filterKey] ? filters[filterKey] : ''

  // Map the selected order type based on its Code to display its Name in the Select options
  const selectedOption = orderTypes.find(orderType => orderType.Code === selectedOrderType)
    ? {
        value: selectedOrderType,
        label: orderTypes.find(orderType => orderType.Code === selectedOrderType)?.Name
      }
    : null

  const handleSelectChange = (selectedOption: any) => {
    // Single-select behavior
    const selectedValue = selectedOption ? selectedOption.value : ''
    const selectedLabel = selectedOption ? selectedOption.label : ''

    // Update both filterKey and nameKey dynamically
    handleChange(filterKey, selectedValue)
    handleChange(nameKey, selectedLabel)
  }

  return (
    <div>
      <label className='block text-sm font-medium text-black '>{label}</label>
      <Select
        id='orderTypeSelect'
        value={selectedOption}
        onChange={handleSelectChange}
        isMulti={false} // Single-select
        isClearable={true}
        options={orderTypes.map(orderType => ({
          value: orderType.Code,
          label: orderType.Name
        }))}
        className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
      />
    </div>
  )
}

export default OrderTypeHelpComponent
