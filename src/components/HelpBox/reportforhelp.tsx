import React, { useEffect, useState } from 'react';
import { ReportForHelp } from '@/app/action/filteraction'; // Assuming ReportForHelp is similar to the other Help functions
import Select from 'react-select';
import { useParams } from '@/context/paramcontext';

const ReportForHelpComponent = ({ filters, handleChange, filterKey, nameKey, label }: any) => {
    const [reportForOptions, setReportForOptions] = useState<any[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
      const { Site_Code, companyid, bu } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ReportForHelp(Site_Code as string, companyid as string, bu as string); // Call ReportForHelp to fetch report options
                setReportForOptions(data);
                setIsDataFetched(true); // Mark data as fetched
            } catch (err) {
                console.error("Error fetching Report For data:", err);
                alert("Failed to fetch report options. Please try again later.");
            }
        };
        fetchData();
    }, [isDataFetched]);

    // Parse filters[filterKey] to get the selected value
    const selectedReportFor = filters[filterKey] ? filters[filterKey] : '';

    // Map the selected report type based on its Code to display its Name in the Select options
    const selectedOption = reportForOptions.find(option =>
        option.Code === selectedReportFor
    ) ? {
        value: selectedReportFor,
        label: reportForOptions.find(option => option.Code === selectedReportFor)?.Name
    } : null;

    const handleSelectChange = (selectedOption: any) => {
        // Single-select behavior
        const selectedValue = selectedOption ? selectedOption.value : '';
        const selectedLabel = selectedOption ? selectedOption.label : '';

        // Update both filterKey and nameKey dynamically
        handleChange(filterKey, selectedValue);
        handleChange(nameKey, selectedLabel);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-black ">{label}</label>
            <Select
                id="reportForSelect"
                value={selectedOption}
                onChange={handleSelectChange}
                isClearable={true}
                isMulti={false} // Single-select
                options={reportForOptions.map(option => ({
                    value: option.Code,
                    label: option.Name
                }))}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default ReportForHelpComponent;
