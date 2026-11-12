"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import HeadingTab from "@/components/HeadingTab"
import { Card, CardContent, CardHeader, Divider, IconButton, Typography, Button, Dialog, DialogContent, DialogActions } from "@mui/material"
import { BsBank2 } from "react-icons/bs"
import { SiHomebridge } from "react-icons/si"
import { FaEdit, FaTrash } from "react-icons/fa" // Importing action icons
import { DeletePOAction, getPurchaseOrderList, handlePODocPrint } from '@/app/action/purchaseAction'
import Loading from '@/components/Loading'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPrint } from 'react-icons/fa6'
import Pagination from '@mui/material/Pagination'
import SearchBar from '@/components/SearchBar'
import { MdOutlineFindInPage } from 'react-icons/md'
import ExitToApp from '@/components/ExitToApp'

interface MTD {
    Docid: string
    V_Type: string
    OrderNo: string
    OrderDate: string
    Party: string
    DBName: string
    Form_Desc: string
    TransactionTypeName: string
    AmdNo: string
    EnqNo: string
    QuotNo: string
    CRName: string
    CreditDays: number
    VerifiedBy: string
}


const RenderStats = ({ searchTerm }: { searchTerm: string }) => {
    const [myData, setMyData] = useState<MTD[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();  // Initialize the useRouter hook
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");


    const ITEMS_PER_PAGE = 5;

    const filteredData = Array.isArray(myData) ? myData.filter(row => row.OrderNo.toLowerCase().includes(searchTerm.toLowerCase())) : [];


    const totalItems = myData.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = myData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await getPurchaseOrderList();
            if (result) {
                setMyData(result);
            }
            setLoading(false);
        };

        fetchData();
    }, []);


    if (loading) {
        return <Loading />;
    }


    function handleDelete(StrDocID: string) {

        const FDelete = async () => {
            try {
                const response = await DeletePOAction(StrDocID);  // Calling the delete action
                console.log("response", response)
                if (response.status === 200) {
                    toast.success('Purchase Order deleted successfully');  // Success message

                    // Introduce a delay before refreshing the page
                    setTimeout(() => {
                        window.location.reload() // This will reload the current page
                    }, 2000); // Delay of 2 seconds (2000ms)
                } else {
                    toast.error('Failed to delete Purchase Order');  // Error message
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error('Error deleting Purchase Order: ' + error.message);  // Handling errors
                } else {
                    toast.error('Unknown error occurred.');
                }
            }
        };

        FDelete();  // Invoking the delete function
    }

    const handleEditView = (data: MTD) => {
        if (!data.VerifiedBy || data.VerifiedBy.trim() === "") {
            router.push(`/entrypoint/purchaseorder/?Docid=${data.Docid}`);
        } else {
            setPopupMessage("This record is verified and cannot be edited.");
            setShowPopup(true);
        }
    };




    return (
        <>
            {/* Desktop View */}

            <div className="font-[sans-serif] overflow-x-auto max-h-96 hidden md:block lg:block mt-2">
                <table className="min-w-full bg-white">
                    <thead className="bg-[#7367F0] whitespace-nowrap sticky top-0 z-10">
                        <tr>
                            <th className="p-3 text-left text-sm font-bold text-white rounded-tl-lg">S.No.</th>
                            <th className="p-3 text-left text-sm font-bold text-white">Order No.</th>
                            <th className="p-3 text-left text-sm font-bold text-white">Order Date</th>
                            <th className="p-3 text-left text-sm font-bold text-white">Transaction Type</th>
                            <th className="p-3 text-left text-sm font-bold text-white">Supplier</th>
                            <th className="p-3 text-left text-sm font-bold text-white">Distributor</th>
                            {/* <th className="p-3 text-left text-sm font-bold text-white">Against Form</th> */}
                            <th className="p-3 text-left text-sm font-bold text-white">Amendment No.</th>
                            <th className="p-3 text-left text-sm font-bold text-white">Quotation No.</th>
                            <th className="p-3 text-left text-sm font-bold text-white">Indent No.</th>
                            <th className="p-3 text-left text-sm font-bold text-white">Enquiry No.</th>
                            <th className="p-3 text-left text-sm font-bold text-white">Currency</th>
                            <th className="p-3 text-left text-sm font-bold text-white">Credit Days</th>
                            <th className="p-3 text-left text-sm font-bold text-white rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    {filteredData.length === 0 ? (
                        <div className="flex items-center justify-center w-full h-full">
                            <Typography variant="body2" className="text-center">No Record</Typography>
                        </div>
                    ) : (
                        <tbody className="whitespace-nowrap overflow-y-auto max-h-[calc(100vh-200px)]">
                            {searchTerm
                                ? filteredData.map((data: MTD, index: number) => (
                                    <tr key={index} className="even:bg-blue-50">
                                        <td className="p-2 text-sm text-black">{(currentPage - 1) * ITEMS_PER_PAGE + (index + 1)}</td>
                                        <td className="p-2 text-sm text-black">{data.OrderNo}</td>
                                        <td className="p-2 text-sm text-black">{data.OrderDate}</td>
                                        <td className="p-2 text-sm text-black">{data.TransactionTypeName}</td>
                                        <td className="p-2 text-sm text-black">{data.Party}</td>
                                        <td className="p-2 text-sm text-black">{data.DBName}</td>
                                        {/* <td className="p-2 text-sm text-black">{data.Form_Desc}</td> */}
                                        <td className="p-2 text-sm text-black">{data.AmdNo}</td>
                                        <td className="p-2 text-sm text-black">{data.QuotNo}</td>
                                        <td className="p-2 text-sm text-black">{data.EnqNo}</td>
                                        <td className="p-2 text-sm text-black">{data.EnqNo}</td>
                                        <td className="p-2 text-sm text-black">{data.CRName}</td>
                                        <td className="p-2 text-sm text-black">{data.CreditDays}</td>
                                        <td className="p-2">
                                            <IconButton
                                                color="primary"
                                                aria-label="edit"
                                                className="hover:bg-blue-100"
                                                sx={{ fontSize: 18 }}
                                                onClick={() => { handleEditView(data) }}

                                            >
                                                <FaEdit />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                aria-label="delete"
                                                className="hover:bg-red-100"
                                                sx={{ fontSize: 18 }}
                                                onClick={() => {
                                                    setSelectedDocId(data.Docid);
                                                    setOpen(true);
                                                }}
                                            >
                                                <FaTrash />
                                            </IconButton>
                                            <IconButton
                                                color="warning"
                                                aria-label="view"
                                                className="hover:bg-yellow-100"
                                                sx={{ fontSize: 18 }}
                                                onClick={() => { handlePODocPrint(data.Docid) }}
                                            >
                                                <FaPrint />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))
                                : currentItems.map((data, index) => (
                                    <tr key={index} className="even:bg-blue-50">
                                        <td className="p-2 text-sm text-black">{(currentPage - 1) * ITEMS_PER_PAGE + (index + 1)}</td>
                                        <td className="p-2 text-sm text-black">{data.OrderNo}</td>
                                        <td className="p-2 text-sm text-black">{data.OrderDate}</td>
                                        <td className="p-2 text-sm text-black">{data.TransactionTypeName}</td>
                                        <td className="p-2 text-sm text-black">{data.Party}</td>
                                        <td className="p-2 text-sm text-black">{data.DBName}</td>
                                        {/* <td className="p-2 text-sm text-black">{data.Form_Desc}</td> */}
                                        <td className="p-2 text-sm text-black">{data.AmdNo}</td>
                                        <td className="p-2 text-sm text-black">{data.QuotNo}</td>
                                        <td className="p-2 text-sm text-black">{data.EnqNo}</td>
                                        <td className="p-2 text-sm text-black">{data.EnqNo}</td>
                                        <td className="p-2 text-sm text-black">{data.CRName}</td>
                                        <td className="p-2 text-sm text-black">{data.CreditDays}</td>
                                        <td className="p-2">
                                            <IconButton
                                                color="primary"
                                                aria-label="edit"
                                                className="hover:bg-blue-100"
                                                sx={{ fontSize: 18 }}
                                                onClick={() => { handleEditView(data) }}

                                            >
                                                <FaEdit />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                aria-label="delete"
                                                className="hover:bg-red-100"
                                                sx={{ fontSize: 18 }}
                                                onClick={() => {
                                                    setSelectedDocId(data.Docid);
                                                    setOpen(true);
                                                }}
                                            >
                                                <FaTrash />
                                            </IconButton>
                                            <IconButton
                                                color="warning"
                                                aria-label="view"
                                                className="hover:bg-yellow-100"
                                                sx={{ fontSize: 18 }}
                                                onClick={() => { handlePODocPrint(data.Docid) }}
                                            >
                                                <FaPrint />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>



                    )}
                </table>

                <div className="flex justify-center mt-2 sticky bottom-0 bg-white z-10 py-">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            </div>

            {/* Mobile View with White Background and Actions */}
            {filteredData.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full">
                    <Typography variant="body2" className="text-center">No Record</Typography>
                </div>
            ) : (
                <div className="overflow-y-auto max-h-full md:hidden mt-4 px-4 sm:px-6 bg-cyan-50">
                    {filteredData.map((data, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg mb-6 p-6 dark:bg-slate-800  transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r duration-500 ease-in-out mt-7"
                        >
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-2 border-b-2 border-cyan-900 pb-2">
                                    <span className="text-xl font-bold text-cyan-900 dark:text-gray-200">
                                        Order No:
                                    </span>
                                    <span className="text-lg font-semibold text-cyan-800 dark:text-gray-300">
                                        {data.OrderNo}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Order Date:
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{data.OrderDate}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Transaction Type:
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{data.TransactionTypeName}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Supplier:
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{data.Party}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Distributor:
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{data.DBName}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Amendment No.:
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{data.AmdNo}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Quotation No.:
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{data.QuotNo}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Indent No.:
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{data.QuotNo}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Enquiry No.:
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{data.EnqNo}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Currency:
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{data.CRName}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Credit Days:
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{data.CreditDays}</span>
                                </div>
                            </div>

                            <div className="flex justify-right mt-4">
                                <IconButton
                                    color="primary"
                                    aria-label="edit"
                                    className="hover:bg-blue-100"
                                    sx={{ fontSize: 18 }}
                                    onClick={() => { handleEditView(data) }}

                                >
                                    <FaEdit />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    aria-label="delete"
                                    className="hover:bg-red-100"
                                    sx={{ fontSize: 18 }}
                                    onClick={() => {
                                        setSelectedDocId(data.Docid);
                                        setOpen(true);
                                    }}
                                >
                                    <FaTrash />
                                </IconButton>
                                <IconButton
                                    color="warning"
                                    aria-label="view"
                                    className="hover:bg-yellow-100"
                                    sx={{ fontSize: 18 }}
                                    onClick={() => { handlePODocPrint(data.Docid) }}
                                >
                                    <FaPrint />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>

            )}


            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg w-80 text-center">
                        <p className="text-gray-800">{popupMessage}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={() => setShowPopup(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}


            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                        Are you sure you want to delete this Order?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{
                            backgroundColor: '#7367F0', // Yes button color
                            color: 'white', // Text color
                        }}
                        onClick={() => {
                            if (selectedDocId) {
                                handleDelete(selectedDocId); // Pass the Docid to handleDelete
                                setOpen(false); // Close the dialog after deletion
                            }
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                        style={{
                            backgroundColor: '#EF5350', // No button color
                            color: 'white', // Text color
                        }}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};



const PurchaseOrderList = () => {

    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')
    const [searchVisible, setSearchVisible] = useState(false)

    const toggleSearch = () => {
        setSearchVisible(!searchVisible)
    }

    function handleClick() {
        router.push('/entrypoint/purchaseorder/')
    }

    function handleChange() {
        router.push('/entrypoint/')
    }

    return (
        <>
            <HeadingTab TitleIcon={BsBank2} Title="Purchase" RoutingIcon={SiHomebridge} routingPath="/home/" />
            <div style={{ marginTop: "10px" }}>
                <Card>
                    <ToastContainer
                        position='top-center'
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='light'
                    />
                    <CardHeader
                        title="Purchase Order List"
                        action={
                            <div style={{ display: 'flex' }}>
                                <IconButton
                                    onClick={toggleSearch}
                                    aria-label='toggle-search'
                                    className='card-more-options pr-1 pl-1'
                                    sx={{ color: '#7367F0' }}
                                >
                                    <MdOutlineFindInPage color='#7367F0' />
                                </IconButton>
                                <button
                                    className='w-30 px-4 py-2 font-semibold text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300'
                                    onClick={handleClick}
                                >
                                    + Purchase Order
                                </button>
                                <IconButton
                                    onClick={handleChange}
                                    size='small'
                                    aria-label='settings'
                                    className='card-more-options'
                                    sx={{ color: '#7367F0' }}
                                >
                                    <ExitToApp />
                                </IconButton>
                            </div>
                        }
                    />
                    <div>
                        {/* Conditionally render the TextField based on searchVisible state */}
                        {searchVisible && <SearchBar onSearch={term => setSearchTerm(term)} />}
                    </div>
                    <Divider variant="middle" />
                    <CardContent sx={{ padding: "10px" }}>
                        {RenderStats({ searchTerm })}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default PurchaseOrderList
