import React, { useState, useEffect } from 'react'
import { SiteMastHelp } from '@/app/action/filteraction' // Assuming SiteMastHelp API function exists
import Select from 'react-select'
import { useParams } from '@/context/paramcontext'

const SiteHelpComponent = ({ filters, handleChange, filterKey, nameKey, isMulti = true, label }: any) => {
  const [sites, setSites] = useState<any[]>([])
  const [isDataFetched, setIsDataFetched] = useState(false)
  const { Site_Code, companyid, bu } = useParams()

  useEffect(() => {
    if (!isDataFetched) {
      const fetchData = async () => {
        try {
          const data = await SiteMastHelp(Site_Code as string, companyid as string, bu as string)
          setSites(data)
          setIsDataFetched(true)
        } catch (err) {
          console.error('Error fetching Site data:', err)
          alert('Failed to fetch sites. Please try again later.')
        }
      }

      fetchData()
    }
  }, [isDataFetched])

  // Dynamically get the selected site codes from filters
  const selectedSiteCodes = filters[filterKey] ? filters[filterKey].split(',') : []

  // Map the selected options based on the selected site codes
  const selectedOptions = sites
    .filter(site => selectedSiteCodes.includes(site.Code))
    .map(site => ({
      value: site.Code,
      label: site.Name
    }))

  const handleSelectChange = (selectedOptions: any) => {
    if (isMulti) {
      // Multi-select behavior
      const selectedValues = selectedOptions.map((option: any) => option.value)
      const selectedLabels = selectedOptions.map((option: any) => option.label)

      // Update both filterKey and nameKey dynamically
      handleChange(filterKey, selectedValues.join(','))
      handleChange(nameKey, selectedLabels.join(','))
    } else {
      // Single-select behavior
      const selectedValue = selectedOptions ? selectedOptions.value : ''
      const selectedLabel = selectedOptions ? selectedOptions.label : ''

      // Update both filterKey and nameKey dynamically
      handleChange(filterKey, selectedValue)
      handleChange(nameKey, selectedLabel)
    }
  }

  return (
    <div>
      <label htmlFor='siteName' className='block text-sm font-medium text-black '>
        {label}
      </label>
      <Select
        id='siteName'
        isMulti={isMulti}
        value={selectedOptions}
        onChange={handleSelectChange}
        isClearable={true}
        options={sites.map(site => ({
          value: site.Code,
          label: site.Name
        }))}
        className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
      />
    </div>
  )
}

export default SiteHelpComponent
