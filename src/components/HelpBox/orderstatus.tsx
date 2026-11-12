import React, { useEffect, useState } from 'react';
import { OrderStatusHelp } from '@/app/action/filteraction'; // Assuming OrderStatusHelp is similar to the other Help functions
import Select from 'react-select';

const OrderStatusHelpComponent = ({ filters, handleChange, filterKey, nameKey, label }: any) => {
    const [orderStatuses, setOrderStatuses] = useState<any[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await OrderStatusHelp(); // Call OrderStatusHelp to fetch order statuses
                setOrderStatuses(data);
                setIsDataFetched(true); // Mark data as fetched
            } catch (err) {
                console.error("Error fetching Order Status data:", err);
                alert("Failed to fetch order statuses. Please try again later.");
            }
        };
        fetchData();
    }, [isDataFetched]);

    // Parse filters[filterKey] to get the selected value
    const selectedOrderStatus = filters[filterKey] ? filters[filterKey] : '';

    // Map the selected order status based on its Code to display its Name in the Select options
    const selectedOption = orderStatuses.find(orderStatus => orderStatus.Code === selectedOrderStatus) ? {
        value: selectedOrderStatus,
        label: orderStatuses.find(orderStatus => orderStatus.Code === selectedOrderStatus)?.Name
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
                id="orderStatusSelect"
                value={selectedOption}
                onChange={handleSelectChange}
                isClearable={true}
                isMulti={false} // Single-select
                options={orderStatuses.map(orderStatus => ({
                    value: orderStatus.Code,
                    label: orderStatus.Name
                }))}
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default OrderStatusHelpComponent;
