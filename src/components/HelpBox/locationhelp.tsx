import React, { useState } from 'react'
import Select from 'react-select'
import type {  SingleValue } from 'react-select'
import { useParams } from '@/context/paramcontext'
import { LocationHelp } from '@/app/action/filteraction'


interface LocationType {
    Code: string
    Name: string
}

interface SelectOption {
    value: string
    label: string
    isDisabled?: boolean
}

interface LocationHelpComponentProps<T> {
    filters: T
    handleChange: <K extends keyof T>(key: K, value: T[K]) => void
    filterKey: keyof T
    nameKey: keyof T
    label: React.ReactNode
}

const LocationHelpComponent = <T,>({
    filters,
    handleChange,
    filterKey,
    nameKey,
    label
}: LocationHelpComponentProps<T>) => {
    const [locations, setLocations] = useState<LocationType[]>([])
    const [loading, setLoading] = useState(false)
    const { Site_Code, companyid, bu } = useParams()

    const fetchLocationHelp = async () => {
        setLoading(true)
        try {
            const res = await LocationHelp(Site_Code as string, companyid as string, bu as string)
            setLocations(res?.data)
        } catch (err) {
            console.error('Error fetching locations:', err)
            alert('Failed to fetch locations. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleMenuOpen = () => {
        fetchLocationHelp()
    }

    // Extract labels from filters
    const selectedLabels =
        filters && typeof filters[nameKey] === 'string'
            ? (filters[nameKey] as string).split(',').filter(Boolean)
            : []

    // Build dropdown options
    const fetchedOptions: SelectOption[] = locations.map(loc => ({
        value: loc.Code,
        label: loc.Name
    }))

    // Maps
    const labelToCodeMap = new Map(locations.map(loc => [loc.Name, loc.Code]))
    const validLabelSet = new Set(locations.map(loc => loc.Name))

    // Display selected dropdown value
    const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
        value: labelToCodeMap.get(label) ?? label,
        label: label,
        isDisabled: !validLabelSet.has(label)
    }))

    const handleSelectChange = (selected: SingleValue<SelectOption>) => {
        handleChange(filterKey, (selected?.value ?? '') as T[typeof filterKey])
        handleChange(nameKey, (selected?.label ?? '') as T[typeof nameKey])
    }

    return (
        <div>
            <label className='block text-sm font-medium text-black'>{label}</label>

            <Select
                id='locationHelp'
                value={selectedOptions}
                onChange={handleSelectChange}
                onMenuOpen={handleMenuOpen}
                isClearable={true}
                options={fetchedOptions}
                isOptionDisabled={(option) => option.isDisabled ?? false}
                isLoading={loading}
                className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none
                   transition focus:border-primary active:border-primary dark:border-strokedark 
                   dark:bg-form-input dark:focus:border-primary'
            />
        </div>
    )
}

export default LocationHelpComponent
