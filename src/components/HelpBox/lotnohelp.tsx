import React, { useState } from "react"
import Select from 'react-select'
import type { MultiValue, SingleValue } from 'react-select'
import { LotNoHelp } from "@/app/action/filteraction"
import MultiHelp from "../MultiHelp/MultiHelp"
import { Avatar } from "@mui/material"
import { LotNoColumnsConfig } from "../Structure/page"
import { useParams } from "@/context/paramcontext"
import type { LotNoType } from "../interfaces/page"



interface SelectOption {
    value: string
    label: string
    isDisabled?: boolean
}

interface Props<T> {
    filters: T
    handleChange: <K extends keyof T>(key: K, value: T[K]) => void
    filterKey: keyof T
    nameKey: keyof T
    label: React.ReactNode
    isMulti?: boolean
    showButton?: boolean
    StrMode?: string
    StrEntryDate?: string
    StrItemCode?: string
    StrGodownCode?: string
    BlnAllowNegativeYN?: string
}

const LotNoHelpComponent = <T,>({
    filters,
    handleChange,
    filterKey,
    nameKey,
    label,
    isMulti = false,
    showButton = true,
    StrMode,
    StrEntryDate,
    StrItemCode,
    StrGodownCode,
    BlnAllowNegativeYN
}: Props<T>) => {

    const [options, setOptions] = useState<LotNoType[]>([])
    const [loading, setLoading] = useState(false)
    const [Mopen, MsetOpen] = useState(false)

    const { Site_Code, companyid } = useParams()

    // Fetch API
    const fetchLotNos = async () => {
        setLoading(true)
        try {
            const data = await LotNoHelp(
                Site_Code!,
                companyid!,
                StrMode!,
                StrEntryDate!,
                StrItemCode!,
                StrGodownCode!,
                BlnAllowNegativeYN ?? "N"
            )
            setOptions(data || [])
        } catch (err) {
            console.error("Error fetching lot numbers:", err)
        } finally {
            setLoading(false)
        }
    }

    // Selected labels from filters
    const selectedLabels =
        filters && typeof filters[nameKey] === "string"
            ? (filters[nameKey] as string).split(",").filter(Boolean)
            : []

    const labelToCodeMap = new Map(options.map(o => [o.LotNo, o.SearchCode]))
    const validLabelSet = new Set(options.map(o => o.LotNo))

    const selectedOptions: SelectOption[] = selectedLabels.map(label => ({
        value: labelToCodeMap.get(label) ?? label,
        label,
        isDisabled: !validLabelSet.has(label)
    }))

    const allOptions: SelectOption[] = options.map(o => ({
        value: o.SearchCode,
        label: `${o.LotNo}`
    }))

    // Handle select logic
    const handleSelectChange = (
        selected: MultiValue<SelectOption> | SingleValue<SelectOption>
    ) => {
        if (isMulti) {
            const multi = selected as MultiValue<SelectOption>
            const values = multi.map(o => o.value).join(",")
            const labels = multi.map(o => o.label).join(",")
            handleChange(filterKey, values as T[typeof filterKey])
            handleChange(nameKey, labels as T[typeof nameKey])
        } else {
            const single = selected as SingleValue<SelectOption>
            const value = single?.value ?? ""
            const labelVal = single?.label ?? ""
            handleChange(filterKey, value as T[typeof filterKey])
            handleChange(nameKey, labelVal as T[typeof nameKey])
        }
    }

    const handleOpen = () => MsetOpen(true)
    const handleClose = () => MsetOpen(false)

    // Multi help SELECT event
    const handleSelectItem = (item: LotNoType) => {
        if (!item) return

        handleChange(filterKey, item.SearchCode as T[typeof filterKey])
        handleChange(nameKey, item.LotNo as T[typeof nameKey])
        handleClose()
    }

    return (
        <div>
            {/* Label */}
            <label className="block text-sm font-medium text-black mb-1">
                {label}
            </label>

            <div className="flex items-center space-x-2">
                {/* DROPDOWN */}
                <div className="flex-1">
                    <Select
                        value={isMulti ? selectedOptions : selectedOptions[0] ?? null}
                        onChange={handleSelectChange}
                        onMenuOpen={fetchLotNos}
                        isMulti={isMulti}
                        isClearable
                        isLoading={loading}
                        options={allOptions}
                        className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none"
                    />
                </div>

                {/* MULTI HELP BUTTON */}
                {showButton !== false && (
                    <Avatar
                        variant="rounded"
                        sx={{
                            width: 32,
                            height: 32,
                            fontSize: "14px",
                            color: "white",
                            backgroundColor: "#2dd4bf",
                            fontWeight: 700,
                            cursor: "pointer"
                        }}
                        onClick={handleOpen}
                    >
                        M
                    </Avatar>
                )}
            </div>

            {/* MULTI HELP DIALOG */}
            {showButton !== false && (
                <MultiHelp<LotNoType>
                    open={Mopen}
                    onClose={handleClose}
                    onSelect={handleSelectItem}
                    fetchItems={() =>
                        LotNoHelp(
                            Site_Code!,
                            companyid!,
                            StrMode!,
                            StrEntryDate!,
                            StrItemCode!,
                            StrGodownCode!,
                            BlnAllowNegativeYN ?? "N"
                        )
                    }
                    defaultSearch=""
                    title="Lot Number Help"
                    dialogWidth="500px"
                    columnsConfig={LotNoColumnsConfig}
                    searchField="LotNo"
                />
            )}
        </div>
    )
}

export default LotNoHelpComponent
