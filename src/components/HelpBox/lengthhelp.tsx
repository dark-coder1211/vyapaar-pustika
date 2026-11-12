import React, { useState, useEffect } from 'react';
import { LengthHelp } from '@/app/action/filteraction'; // Replace with actual path
import Select from 'react-select';
import { useParams } from '@/context/paramcontext';

const LengthHelpComponent = ({ filters, handleChange, filterKey, nameKey, isMulti = true, label }: any) => {
    const [lengthOptions, setLengthOptions] = useState<any[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
      const { Site_Code, companyid, bu } = useParams()

    useEffect(() => {
        if (!isDataFetched) {
            const fetchData = async () => {
                try {
                    const data = await LengthHelp(Site_Code as string, companyid as string, bu as string); // Fetch length options
                    setLengthOptions(data);
                    setIsDataFetched(true);
                } catch (err) {
                    console.error("Error fetching Length data:", err);
                    alert("Failed to fetch length options. Please try again later.");
                }
            };

            fetchData();
        }
    }, [isDataFetched]);

    const selectedLengthIds = filters[filterKey] ? filters[filterKey].split(',') : [];

    const selectedOptions = lengthOptions.filter(length =>
        selectedLengthIds.includes(length.Code)
    ).map(length => ({
        value: length.Code,
        label: length.Code
    }));

    const handleSelectChange = (selectedOptions: any) => {
        if (isMulti) {
            const selectedValues = selectedOptions.map((option: any) => option.value);
            const selectedLabels = selectedOptions.map((option: any) => option.label);

            handleChange(filterKey, selectedValues.join(','));
            handleChange(nameKey, selectedLabels.join(','));
        } else {
            const selectedValue = selectedOptions ? selectedOptions.value : '';
            const selectedLabel = selectedOptions ? selectedOptions.label : '';

            handleChange(filterKey, selectedValue);
            handleChange(nameKey, selectedLabel);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-black ">{label}</label>
            <Select
                id="lengthSelect"
                isMulti={isMulti}
                value={selectedOptions}
                onChange={handleSelectChange}
                isClearable={true}
                options={lengthOptions.map(length => ({
                    value: length.Code,
                    label: length.Name
                }))}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default LengthHelpComponent;
