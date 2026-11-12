import React, { useState, useEffect } from 'react';
import { WidthHelp } from '@/app/action/filteraction'; // Assuming WidthHelp function exists
import Select from 'react-select';
import { useParams } from '@/context/paramcontext';

const WidthHelpComponent = ({ filters, handleChange, filterKey, nameKey, isMulti = true, label }: any) => {
    const [widthOptions, setWidthOptions] = useState<any[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
      const { Site_Code, companyid, bu } = useParams()

    useEffect(() => {
        if (!isDataFetched) {
            const fetchData = async () => {
                try {
                    const data = await WidthHelp(Site_Code as string, companyid as string, bu as string); // Call WidthHelp to fetch width options
                    setWidthOptions(data);
                    setIsDataFetched(true); // Mark data as fetched
                } catch (err) {
                    console.error("Error fetching Width data:", err);
                    alert("Failed to fetch width options. Please try again later.");
                }
            };

            fetchData();
        }
    }, [isDataFetched]);

    // Get the selected width IDs dynamically using filterKey
    const selectedWidthIds = filters[filterKey] ? filters[filterKey].split(',') : [];

    // Prepare the selected options based on the selected width codes
    const selectedOptions = widthOptions.filter(width =>
        selectedWidthIds.includes(width.Code)
    ).map(width => ({
        value: width.Code,
        label: width.Code
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
                id="widthSelect"
                isMulti={isMulti}
                value={selectedOptions}
                onChange={handleSelectChange}
                isClearable={true}
                options={widthOptions.map(width => ({
                    value: width.Code,
                    label: width.Name
                }))}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default WidthHelpComponent;
