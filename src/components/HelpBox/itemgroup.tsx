import React, { useState, useEffect } from 'react';
import { ItemGroupHelp } from '@/app/action/filteraction';  // Assuming ItemGroupHelp API function exists
import Select from 'react-select';
import { useParams } from '@/context/paramcontext';

const ItemGroupHelpComponent = ({ filters, handleChange, filterKey, nameKey, isMulti = true, label }: any) => {
    const [itemGroups, setItemGroups] = useState<any[]>([]);
    const { Site_Code, companyid, bu } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ItemGroupHelp(Site_Code as string, companyid as string, bu as string);
                setItemGroups(data);
            } catch (err) {
                console.error("Error fetching Item Group data:", err);
                alert("Failed to fetch item groups. Please try again later.");
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures it runs only once on mount

    // Extract selected item groups from the filter (handle null or undefined gracefully)
    const selectedItemGroups = filters[filterKey] ? filters[filterKey].split(',') : [];

    // Prepare the selected options based on selected item groups
    const selectedOptions = itemGroups.filter(item =>
        selectedItemGroups.includes(item.Code)
    ).map(item => ({
        value: item.Code,
        label: item.Name
    }));

    const handleSelectChange = (selectedOptions: any) => {

        if (isMulti) {
            // Multi-select behavior
            const selectedValues = selectedOptions.map((option: any) => option.value);
            const selectedLabels = selectedOptions.map((option: any) => option.label);

            // Dynamically update both filterKey and nameKey
            handleChange(filterKey, selectedValues.join(','));
            handleChange(nameKey, selectedLabels.join(','));
        } else {
            // Single-select behavior
            const selectedValue = selectedOptions ? selectedOptions.value : '';
            const selectedLabel = selectedOptions ? selectedOptions.label : '';

            // Update both filterKey and nameKey dynamically
            handleChange(filterKey, selectedValue);
            handleChange(nameKey, selectedLabel);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-black ">{label}</label>
            <Select
                id="itemGroup"
                value={selectedOptions}
                onChange={handleSelectChange}
                isMulti={isMulti}
                isClearable={true}
                options={itemGroups.map(item => ({
                    value: item.Code,
                    label: item.Name
                }))}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default ItemGroupHelpComponent;
