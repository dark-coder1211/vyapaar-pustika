import React, { useEffect, useState } from 'react';
import { PurchaseOrderHelp } from '@/app/action/filteraction';
import Select from 'react-select';
import { useParams } from '@/context/paramcontext';

const PurchaseOrderNoHelp = ({ filters, handleChange, filterKey, nameKey, isMulti = false, label }: any) => {
    const [orderNo, setOrderNo] = useState<any[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const { Site_Code, companyid, bu } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await PurchaseOrderHelp(Site_Code as string, companyid as string, bu as string);
                setOrderNo(data);
                setIsDataFetched(true); // Mark data as fetched
            } catch (err) {
                console.error("Error fetching Purchase Order data:", err);
                alert("Failed to fetch purchase orders. Please try again later.");
            }
        };
        fetchData();
    }, [isDataFetched]);

    // Parse filters[filterKey] if it's a string and split it into an array
    const selectedOrders = filters[filterKey] ? filters[filterKey].split(',') : [];

    // Map the selected orders based on DocId to display RecId in Select
    const selectedOptions = orderNo.filter(order =>
        selectedOrders.includes(order.DocId)
    ).map(order => ({
        value: order.DocId,
        label: order.RecId
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
                id="orderNo"
                value={selectedOptions}
                onChange={handleSelectChange}
                isMulti={isMulti}
                isClearable={true}
                options={orderNo.map(order => ({
                    value: order.DocId,
                    label: order.RecId
                }))}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default PurchaseOrderNoHelp;
