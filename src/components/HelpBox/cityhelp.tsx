'use client'

import React, { useState } from 'react'
import Select from 'react-select'
import type { SingleValue } from 'react-select'
import { useParams } from '@/context/paramcontext'
import { CityHelp } from '@/app/action/filteraction'

// ---------- Interfaces ----------
interface CityType {
    CityCode: string
    CityName: string
    State: string
    Stdcode: string
}

interface SelectOption {
    value: string
    label: string
    isDisabled?: boolean
}

interface CityHelpComponentProps<T> {
    filters: T
    handleChange: <K extends keyof T>(key: K, value: T[K]) => void
    filterKey: keyof T
    nameKey: keyof T
    label: React.ReactNode
}

// ---------- Component ----------
const CityHelpComponent = <T,>({
    filters,
    handleChange,
    filterKey,
    nameKey,
    label
}: CityHelpComponentProps<T>) => {
    const [cities, setCities] = useState<CityType[]>([])
    const [loading, setLoading] = useState(false)
    const { Site_Code, companyid, UserName, bu } = useParams()

    // Fetch City Data
    const fetchCityHelp = async () => {
        setLoading(true)
        try {
            const res = await CityHelp(Site_Code as string, companyid as string, UserName as string, bu as string)
            if (res?.data) {
                setCities(res.data)
            } else {
                console.warn('⚠️ No city data returned')
            }
        } catch (err) {
            console.error('❌ Error fetching city list:', err)
            alert('Failed to fetch cities. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const handleMenuOpen = () => {
        fetchCityHelp()
    }

    // Convert data into options
    const fetchedOptions: SelectOption[] = cities.map(city => ({
        value: city.CityCode,
        label: `${city.CityName} (${city.State})`
    }))

    // Handle selection
    const selectedValue = filters ? (filters[filterKey] as string) : ''
    const selectedLabel = filters ? (filters[nameKey] as string) : ''
    const selectedOption: SelectOption | null =
        selectedValue && selectedLabel ? { value: selectedValue, label: selectedLabel } : null

    const handleSelectChange = (selected: SingleValue<SelectOption>) => {
        handleChange(filterKey, (selected?.value ?? '') as T[typeof filterKey])
        handleChange(nameKey, (selected?.label ?? '') as T[typeof nameKey])
    }

    return (
        <div>
            <label className='block text-sm font-medium text-black mb-1'>{label}</label>
            <Select
                value={selectedOption}
                onChange={handleSelectChange}
                onMenuOpen={handleMenuOpen}
                isClearable
                options={fetchedOptions}
                isLoading={loading}
                placeholder='Select City...'
                menuPortalTarget={document.body}
                styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                }}
                className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary'
            />

        </div>
    )
}

export default CityHelpComponent
