import { OrderData, POFilter } from "../interfaces/page";
import { Dispatch, SetStateAction } from 'react';
import { MultiValue } from 'react-select';

export const handleOrderNoChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>, // Adjusted type for react-select
    orderNo: OrderData[], // Existing type
    setFilters: Dispatch<SetStateAction<POFilter[]>> // POFilter[] expected here
) => {
    const selectedCodes = selectedOptions.map(option => option.value); // Extract the DocId values from selected options

    // Find matching OrderData for each selected DocId
    const selectedOrderData = orderNo.filter(ele => selectedCodes.includes(ele.DocId));

    if (selectedOrderData.length > 0) {
        setFilters(prevFilters => [
            {
                ...prevFilters[0], // Retain other filter properties as needed
                // Adjust how you store multiple selected OrderNos (e.g., as a string or array)
                StrOrderNo: selectedOrderData.map(data => data.DocId).join(', '), // Join as a string or store as an array
                StrOrderNoRecId: selectedOrderData.map(data => data.RecId).join(', '), // Similarly for RecId
            }
        ]);
    }
};

