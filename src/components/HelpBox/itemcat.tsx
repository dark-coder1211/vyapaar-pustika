import React, { useEffect, useState } from 'react';
import { ItemCatHelp } from '@/app/action/filteraction';  // Assuming ItemCatHelp API function exists
import Select from 'react-select';
import { useParams } from '@/context/paramcontext';

const ItemCategoryHelpComponent = ({ filters, handleChange, filterKey, nameKey, isMulti = true, label }: any) => {
    const [itemCategories, setItemCategories] = useState<any[]>([]);
    const { Site_Code, companyid, bu } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ItemCatHelp(Site_Code as string, companyid as string, bu as string);
                
                setItemCategories(data);
            } catch (err) {
                console.error("Error fetching Item Category data:", err);
                alert("Failed to fetch item categories. Please try again later.");
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures it runs only once when component mounts

    // Parse filters[filterKey] if it's a string and split it into an array
    const selectedItemCategories = filters[filterKey] ? filters[filterKey].split(',') : [];

    // Map selected item categories to the corresponding options
    const selectedOptions = itemCategories.filter(item =>
        selectedItemCategories.includes(item.Code)
    ).map(item => ({
        value: item.Code,
        label: item.Name
    }));

    const handleSelectChange = (selectedOptions: any) => {
        if (isMulti) {
            // Multi-select behavior
            const selectedValues = selectedOptions.map((option: any) => option.value);
            const selectedLabels = selectedOptions.map((option: any) => option.label);

            // Update both filterKey and nameKey dynamically
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
                id="itemCategory"
                value={selectedOptions}
                onChange={handleSelectChange}
                isMulti={isMulti}  // Dynamic multi/select behavior
                isClearable={true}
                options={itemCategories.map(item => ({
                    value: item.Code,
                    label: item.Name
                }))}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default ItemCategoryHelpComponent;
