import React, { useState } from "react"
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { IssueTypeHelp } from "@/app/action/filteraction"
import { useParams } from "@/context/paramcontext"

export interface IssuedFor {
    id: string
    IssType: string
}

interface SelectOption {
    value: string
    label: string
    isDisabled?: boolean
}

interface IssuedTypeHelpComponentProps<T> {
    filters: T
    handleChange: <K extends keyof T>(key: K, value: T[K]) => void
    filterKey: keyof T
    nameKey: keyof T
    label: React.ReactNode
    isMulti?: boolean
    StrIssuedFor?: string
}

const IssuedTypeHelpComponent = <T,>({
    filters,
    handleChange,
    filterKey,
    nameKey,
    label,
    isMulti = false,
    StrIssuedFor
}: IssuedTypeHelpComponentProps<T>) => {
    const [options, setOptions] = useState<IssuedFor[]>([])
    const [loading, setLoading] = useState(false)
    const { Site_Code, companyid, bu } = useParams()

    // Fetch API
    const fetchIssuedType = async () => {
        setLoading(true)
        try {
            const data = await IssueTypeHelp(Site_Code!, companyid!, bu!, StrIssuedFor || "")
            setOptions(data)
        } catch (err) {
            console.error("Error fetching issued types:", err)
            alert("Failed to fetch issued types. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    // Selected values
    const selectedLabels =
        filters && typeof filters[nameKey] === "string"
            ? (filters[nameKey] as string).split(",").filter(Boolean)
            : []

    const idToLabelMap = new Map(options.map(o => [o.id, o.IssType]))
    const labelSet = new Set(options.map(o => o.IssType))

    const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
        value: Array.from(idToLabelMap.entries()).find(([v]) => v === label)?.[0] || label,
        label,
        isDisabled: !labelSet.has(label)
    }))

    const allOptions: SelectOption[] = options.map(o => ({ value: o.id, label: o.IssType }))

    // Handle select change
    const handleSelectChange = (val: MultiValue<SelectOption> | SingleValue<SelectOption>) => {
        if (isMulti) {
            const multi = val as MultiValue<SelectOption>
            const values = multi.map(opt => opt.value).join(",")
            const labels = multi.map(opt => opt.label).join(",")
            handleChange(filterKey, values as T[typeof filterKey])
            handleChange(nameKey, labels as T[typeof nameKey])
        } else {
            const single = val as SingleValue<SelectOption>
            const value = single?.value ?? ""
            const labelVal = single?.label ?? ""
            handleChange(filterKey, value as T[typeof filterKey])
            handleChange(nameKey, labelVal as T[typeof nameKey])
        }
    }


    return (
        <div>
            <label className="block text-sm font-medium text-black mb-1">{label}</label>
            <div className="flex items-center space-x-2">
                <div className="flex-1">
                    <Select
                        isMulti={isMulti}
                        value={isMulti ? selectedOptions : selectedOptions[0] ?? null}
                        onChange={handleSelectChange}
                        onMenuOpen={fetchIssuedType}
                        isLoading={loading}
                        options={allOptions}
                        isClearable
                        isOptionDisabled={option => option.isDisabled ?? false}
                        className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary"
                    />
                </div>
            </div>

        </div>
    )
}

export default IssuedTypeHelpComponent
