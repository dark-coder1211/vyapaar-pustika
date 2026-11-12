import React, { useEffect, useState } from 'react';
import { GSMHelp } from '@/app/action/filteraction';  // Assuming you have a GSMHelp function
import Select from 'react-select';
import { useParams } from '@/context/paramcontext';

const GSMHelpComponent = ({ filters, handleChange, filterKey, nameKey, isMulti = false, label }: any) => {
    const [gsmData, setGsmData] = useState<any[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
      const { Site_Code, companyid, bu } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GSMHelp(Site_Code as string, companyid as string, bu as string); // Fetch the GSM data from API
                setGsmData(data);
                setIsDataFetched(true); // Mark data as fetched
            } catch (err) {
                console.error("Error fetching GSM data:", err);
                alert("Failed to fetch GSM data. Please try again later.");
            }
        };
        fetchData();
    }, [isDataFetched]);

    // Parse filters[filterKey] if it's a string and split it into an array
    const selectedGSM = filters[filterKey] ? filters[filterKey].split(',') : [];

    // Map the selected GSM based on Code to display Name in Select
    const selectedOptions = gsmData.filter(gsm =>
        selectedGSM.includes(gsm.Code)
    ).map(gsm => ({
        value: gsm.Code,
        label: gsm.Name
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
                id="gsmSelect"
                value={selectedOptions}
                onChange={handleSelectChange}
                isMulti={isMulti}
                isClearable={true}
                options={gsmData.map(gsm => ({
                    value: gsm.Code,
                    label: gsm.Name
                }))}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default GSMHelpComponent;
