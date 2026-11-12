import React, { useEffect, useState } from 'react';
import { ZoneHelp } from '@/app/action/filteraction'; // Assuming ZoneHelp is similar to BFHelp
import Select from 'react-select';
import { useParams } from '@/context/paramcontext';

const ZoneHelpComponent = ({ filters, handleChange, filterKey, nameKey, isMulti = false, label }: any) => {
    const [zones, setZones] = useState<any[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
      const { Site_Code, companyid, bu } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ZoneHelp(Site_Code as string, companyid as string, bu as string); // Call to ZoneHelp instead of BFHelp
                setZones(data);
                setIsDataFetched(true); // Mark data as fetched
            } catch (err) {
                console.error("Error fetching Zone data:", err);
                alert("Failed to fetch zones. Please try again later.");
            }
        };
        fetchData();
    }, [isDataFetched]);

    // Parse filters[filterKey] if it's a string and split it into an array
    const selectedZones = filters[filterKey] ? filters[filterKey].split(',') : [];

    // Map the selected zones based on their ID to display their name in the Select options
    const selectedOptions = zones.filter(zone =>
        selectedZones.includes(zone.Code) // Filter based on Code matching the selected values
    ).map(zone => ({
        value: zone.Code,
        label: zone.Name
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
                id="zoneSelect"
                value={selectedOptions}
                onChange={handleSelectChange}
                isMulti={isMulti}
                isClearable={true}
                options={zones.map(zone => ({
                    value: zone.Code,
                    label: zone.Name
                }))}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default ZoneHelpComponent;
