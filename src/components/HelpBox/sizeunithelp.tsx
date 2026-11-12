import React, { useState, useEffect } from 'react';
import { SizeUnitHelp } from '@/app/action/filteraction'; // Assuming SizeUnitHelp function exists
import Select from 'react-select';
import { useParams } from '@/context/paramcontext';

const SizeUnitHelpComponent = ({ filters, handleChange, filterKey, nameKey, isMulti = true, label }: any) => {
    const [sizeUnits, setSizeUnits] = useState<any[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
      const { Site_Code, companyid, bu } = useParams()

    useEffect(() => {
        if (!isDataFetched) {
            const fetchData = async () => {
                try {
                    const data = await SizeUnitHelp(Site_Code as string, companyid as string, bu as string); // Call SizeUnitHelp to fetch size unit options
                    setSizeUnits(data);
                    setIsDataFetched(true); // Mark data as fetched
                } catch (err) {
                    console.error("Error fetching SizeUnit data:", err);
                    alert("Failed to fetch size unit options. Please try again later.");
                }
            };

            fetchData();
        }
    }, [isDataFetched]);

    // Get the selected size unit IDs dynamically using filterKey
    const selectedSizeUnitIds = filters[filterKey] ? filters[filterKey].split(',') : [];

    // Prepare the selected options based on the selected size unit codes
    const selectedOptions = sizeUnits.filter(unit =>
        selectedSizeUnitIds.includes(unit.Code)
    ).map(unit => ({
        value: unit.Code,
        label: unit.Name
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
                id="sizeUnitSelect"
                isMulti={isMulti}
                value={selectedOptions}
                isClearable={true}
                onChange={handleSelectChange}
                options={sizeUnits.map(unit => ({
                    value: unit.Code,
                    label: unit.Name
                }))}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default SizeUnitHelpComponent;
