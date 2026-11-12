// import React from 'react';
// import { RiFileExcel2Fill } from 'react-icons/ri';
// import { utils, writeFile } from 'xlsx';
// import { IconButton } from '@mui/material';



// const ExportToExcel = ({ data }: any) => {
//     // Function to generate and download Excel file
//     const generateExcelData = (data: any) => {
//         console.log("Data to export:", data);
//         const worksheet = utils.json_to_sheet(data);
//         const customString = [{ value: "From date : 01/Apr/2023 To Date : 01/Apr/2024", colSpan: 3 }];

//         // Insert the custom string row at the top of worksheet1 (before data)
//         utils.sheet_add_aoa(worksheet, [customString], { origin: "A1" });  // Adds the custom string at A1
//         if (worksheet["A1"]) {
//             worksheet["A1"].s = {
//                 font: { bold: true },  // Make the text bold
//             };
//         }
//         const workbook = utils.book_new();
//         utils.book_append_sheet(workbook, worksheet, "Sheet1");

//         // Trigger download of the Excel file
//         writeFile(workbook, "products.xlsx", { compression: true });
//     };

//     const data1 = [
//         { id: 1, name: 'Product A', price: 100 },
//         { id: 2, name: 'Product B', price: 150 },
//         // Add more data as needed
//     ];

//     return (
//         <div>
//             {/* Excel export button */}
//             <IconButton
//                 onClick={() => generateExcelData(data)}  // Pass data when the button is clicked
//                 size="small"
//                 aria-label="export to excel"
//                 className="card-more-options"
//                 sx={{ color: '#047857', fontSize: '30px' }}
//             >
//                 <RiFileExcel2Fill />
//             </IconButton>
//         </div>
//     );
// };

// export default ExportToExcel;


import { IconButton } from '@mui/material';
import React from 'react';
import { RiFileExcel2Fill } from 'react-icons/ri';
import * as XLSX from 'xlsx';

// Define the types for props
interface ExportToExcelProps {
    data: { [key: string]: any }[];  // Array of objects where the keys are strings and values can be of any type
    headers?: string[];  // Optional headers, array of strings
    fileName?: string;   // Optional fileName
}

const ExportToExcel: React.FC<ExportToExcelProps> = ({ data, headers, fileName }) => {
    const exportToExcel = () => {
        if (data.length === 0) {
            alert("No data available to export.");
            return;
        }

        // Prepare headers and data dynamically
        const exportHeaders = headers || Object.keys(data[0]);  // If no headers, get from data
        const exportData = data.map((item: { [key: string]: any }) =>
            exportHeaders.map((header: string) => item[header] || '')
        );

        // Calculate totals for numeric columns, if needed (assuming quantities are numeric)
        const totalRow = exportHeaders.reduce((acc: string[], header: string) => {
            if (header.toLowerCase().includes('qty')) {
                acc.push(data.reduce((sum: number, item: { [key: string]: any }) => sum + (item[header] || 0), 0).toFixed(2));
            } else {
                acc.push('');
            }
            return acc;
        }, [] as string[]);

        // Add totals row at the end if there are any totals
        if (totalRow.some(value => value !== '')) {
            exportData.push(totalRow);
        }

        // Create an array of arrays with headers as the first row
        const rows = [exportHeaders, ...exportData];

        // Create the worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(rows);

        // Apply styling to the header cells to make them bold
        exportHeaders.forEach((header, colIndex) => {
            const cellAddress = { r: 0, c: colIndex }; // First row, each column
            const cell = worksheet[XLSX.utils.encode_cell(cellAddress)];
            if (cell) {
                cell.s = {
                    font: { bold: true },
                    alignment: { horizontal: 'center', vertical: 'center' }
                };
            }
        });

        // Apply number formatting to quantity columns
        exportHeaders.forEach((header: string, colIndex: number) => {
            if (header.toLowerCase().includes('qty')) {
                for (let row = 1; row < exportData.length + 1; row++) {
                    const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: colIndex })];
                    if (cell) {
                        cell.s = { numFmt: '#,##0.00' }; // Format as number with two decimals
                    }
                }
            }
        });

        // Adjust column widths dynamically based on content
        const columnWidths = exportHeaders.map((header: string) => {
            const maxLength = Math.max(
                header.length,
                ...data.map((item: { [key: string]: any }) => `${item[header]}`).map((str: string) => str.length)
            );
            return { wch: maxLength + 2 }; // Add padding
        });
        worksheet["!cols"] = columnWidths;

        // Apply alignment to the data cells for better readability
        for (let row = 1; row < exportData.length + 1; row++) {
            for (let col = 0; col < exportHeaders.length; col++) {
                const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
                if (cell) {
                    cell.s = { alignment: { horizontal: 'center', vertical: 'center' } };
                }
            }
        }

        // Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, fileName || "Report");

        // Write the file to disk
        XLSX.writeFile(workbook, `${fileName || "Dynamic_Report"}.xlsx`);
    };





    return (
        <IconButton
            onClick={exportToExcel}
            size="small"
            aria-label="settings"
            className="card-more-options"
            sx={{ color: '#047857', fontSize: '30px' }}
        >
            <RiFileExcel2Fill />
        </IconButton>
    );
};

export default ExportToExcel;
