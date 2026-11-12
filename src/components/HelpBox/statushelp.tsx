import React, { useEffect, useState } from 'react';
import { StatusHelp } from '@/app/action/filteraction'; // Assuming StatusHelp is similar to ZoneHelp and BFHelp
import Select from 'react-select';
import { useParams } from '@/context/paramcontext';

const StatusHelpComponent = ({ filters, handleChange, filterKey, nameKey, isMulti = false, label }: any) => {
    const [status, setStatus] = useState<any[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
      const { Site_Code, companyid, bu } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await StatusHelp(Site_Code as string, companyid as string, bu as string); // Call to StatusHelp instead of ZoneHelp or BFHelp
                setStatus(data);
                setIsDataFetched(true); // Mark data as fetched
            } catch (err) {
                console.error("Error fetching Status data:", err);
                alert("Failed to fetch statuses. Please try again later.");
            }
        };
        fetchData();
    }, [isDataFetched]);

    // Parse filters[filterKey] if it's a string and split it into an array
    const selectedStatuses = filters[filterKey] ? filters[filterKey].split(',') : [];

    // Map the selected statuses based on their Code to display their Name in the Select options
    const selectedOptions = status.filter(status =>
        selectedStatuses.includes(status.Code) // Filter based on Code matching the selected values
    ).map(status => ({
        value: status.Code,
        label: status.Name
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
                id="statusSelect"
                value={selectedOptions}
                onChange={handleSelectChange}
                isMulti={isMulti}
                isClearable={true}
                options={status.map(status => ({
                    value: status.Code,
                    label: status.Name
                }))}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default StatusHelpComponent;
