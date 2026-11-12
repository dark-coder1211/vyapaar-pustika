import React, { useState } from "react"
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { IssueForHelp } from "@/app/action/filteraction"
import { useParams } from "@/context/paramcontext"

export interface IssuedFor {
    id: string
    IssFor: string
}

interface SelectOption {
    value: string
    label: string
    isDisabled?: boolean
}

interface Props<T> {
    filters: T
    filterKey: keyof T
    nameKey: keyof T
    handleChange: <K extends keyof T>(key: K, value: T[K]) => void
    label: React.ReactNode
    isMulti?: boolean
    StrMode?: string
    StrCurrentDocID?: string
}

const IssuedForHelpComponent = <T,>({
    filters,
    filterKey,
    nameKey,
    handleChange,
    label,
    isMulti = false,
    StrMode,
    StrCurrentDocID
}: Props<T>) => {

    const [options, setOptions] = useState<IssuedFor[]>([])
    const [loading, setLoading] = useState(false)

    const { Site_Code, companyid, bu } = useParams()

    // fetch API
    const fetchIssuedFor = async () => {
        setLoading(true)

        const data = await IssueForHelp(
            Site_Code!,
            companyid!,
            bu!,
            StrMode,            // Pass StrMode
            StrCurrentDocID     // Pass current doc ID
        )
        setOptions(data)
        setLoading(false)
    }



    // Selected values
    const selectedLabels =
        filters && typeof filters[nameKey] === "string"
            ? (filters[nameKey] as string).split(",").filter(Boolean)
            : []

    const idToLabelMap = new Map(options.map(o => [o.id, o.IssFor]))
    const labelSet = new Set(options.map(o => o.IssFor))

    const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
        value: Array.from(idToLabelMap.entries()).find(([ v]) => v === label)?.[0] || label,
        label,
        isDisabled: !labelSet.has(label)
    }))

    const allOptions: SelectOption[] = options.map(o => ({ value: o.id, label: o.IssFor }))

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
            <label className="block text-sm font-medium text-black mb-1">
                {label}
            </label>

            <Select
                isMulti={isMulti}
                value={selectedOptions}
                onMenuOpen={fetchIssuedFor}
                isLoading={loading}
                options={allOptions}
                isClearable
                onChange={handleSelectChange}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent"
            />
        </div>
    )
}

export default IssuedForHelpComponent
