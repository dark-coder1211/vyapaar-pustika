"use client"

import HeadingTab from "@/components/HeadingTab"
import { AddPO, getDefaultPO, HeaderOH, HeaderOHData, LineOH, LineOHData, POApiResponse, POApiResponseDetail, PoDetailInterface, POInterface, RecidInterface, StrucIndent, TCT, TCTData } from "@/components/interfaces/page"
import { Card, CardContent, CardHeader, Divider, IconButton, Typography, Button, Dialog, DialogContent, DialogActions } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { BsBank2 } from "react-icons/bs"
import { SiHomebridge } from "react-icons/si"
import ExitToApp from "@/components/ExitToApp"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { GetPOHeaderByDocid, GetPODetailByDocid, AddPOAction, GetPordDetInGridByPendingIndent, GetTermsCondAction, TermsCondAction, GetOHHeader, GetOHLine } from "@/app/action/purchaseAction"
import TextBoxOne from "@/components/TextBox/TextBoxOne"
import AddPOModal from "@/components/AddPOModal"
import { TiArrowSortedDown } from 'react-icons/ti';
import { FaTrash } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"
import PODetailsComp from "@/components/POIndDetailsComp"
import POPrmDetailsComp from "@/components/POPrmDetailsComp"
import POOrdToComp from "@/components/POOrdToComp"
import { RecidNOHelp } from "@/app/action/recidAction"
import VoucherTypeHelpComponent from "@/components/HelpBox/vouchertypehelp"
import TransactionTypeHelpComponent from "@/components/HelpBox/transactiontype"
import PartyHelpComponent from "@/components/HelpBox/partyhelp"
import FGetAgainstFormComponent from "@/components/HelpBox/agtfomhelp"
import CurrencyHelpComponent from "@/components/HelpBox/currencyhelp"
import QuotationNoHelpComponent from "@/components/HelpBox/quotationhelp"
import PendingIndentNoHelpComponent from "@/components/HelpBox/pendingindenthelp"
import QCDetailsComp from "@/components/POQcDetailsComp"
import TermsAndConditions from "@/components/Terms&Condition/Terms&Condition"
import HeaderOHComp from "@/components/HeaderOHComp/HeaderOHComp"
import { HeaderOHColumnsConfig, LineOHColumnsConfig, ShowHeaderOHColumnsConfig } from "@/components/Structure/page"
import LineOHComp from "@/components/LineOHComp/LineOHComp"
import ShowHeaderOHComp from "@/components/ShowHeaderOHComp/ShowHeaderOHComp"
import { Site_Code } from "@/app/action/getLocalStorageData"


const RenderStats = () => {
    const [isAddModalActive, setIsAddModalActive] = useState(false);
    const [isEditModalActive, setIsEditModalActive] = useState(false);
    const [docId, setdocId] = useState<string>('');
    const searchParams = useSearchParams();
    const [PO, setPO] = useState<POInterface[]>([]);
    const [PODet, setPODet] = useState<PoDetailInterface[]>([]);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [editItem, setEditItem] = useState<PoDetailInterface | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const [rowIndexToDelete, setRowIndexToDelete] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [POTCT, setPOTCT] = useState<TCT[]>([]); // Store fetched data
    const [IndPopupOpen, setIndPopupOpen] = useState(false);
    const [PrmPopupOpen, setPrmPopupOpen] = useState(false);
    const [TolPopupOpen, setTolPopupOpen] = useState(false);
    const [selectedOrdQty, setSelectedOrdQty] = useState<number | undefined>(undefined);
    const [isSelect, setIsSelect] = useState<boolean>(false);
    const [IndPopupOpenIndex, setIndPopupOpenIndex] = useState<number | null>(null);
    const [TolPopupOpenIndex, setTolPopupOpenIndex] = useState<number | null>(null);
    const [QCPopupOpenIndex, setQCPopupOpenIndex] = useState<number | null>(null);
    const [totalGrossAmount, setTotalGrossAmount] = useState(0);
    const [totalAdditionAmount, setTotalAdditionAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [submittedData, setSubmittedData] = useState<PoDetailInterface | null>(null);
    const [submissions, setSubmissions] = useState<PoDetailInterface[]>([]);
    const [openLineOH, setOpenLineOH] = useState(false);
    const [openHeaderOH, setOpenHeaderOH] = useState(false);
    const [selectedHeaderItem, setSelectedHeaderItem] = useState<any>(null);
    const [pono, setPoNo] = useState('');
    const [poDetailsMap, setPoDetailsMap] = useState<{ [index: number]: StrucIndent[] }>({});
    const [isModalvalidate, setIsModalvalidate] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState('');


    const updatePOQtyAtIndex = (index: number, totalOrdQty: number) => {
        setPODet((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                dblQtySKU: totalOrdQty, // or dblOrdQty
            };
            return updated;
        });
    };


    const handleLineOHOpen = () => {
        setOpenLineOH(true);
    };

    const handleLineOHClose = () => {
        setOpenLineOH(false);
    };


    const handleHeaderOHOpen = () => {
        setOpenHeaderOH(true);
    };

    const handleHeaderOHClose = () => {
        setOpenHeaderOH(false);
        setSelectedHeaderItem(null);
    };

    const handleShowItem = (item: any) => {
        setSelectedHeaderItem(item);
        setOpenHeaderOH(true);
    };

    // Function to toggle the popup
    const toggleIndPopup = () => {
        setIndPopupOpen(!IndPopupOpen);
    };

    const toggleTolPopup = (ordQty?: number, index?: number) => {
        if (ordQty !== undefined) {
            setSelectedOrdQty(ordQty);
        }

        if (index === undefined) return; // exit early to avoid invalid setState

        if (TolPopupOpenIndex === index) {
            setTolPopupOpenIndex(null);
        } else {
            setTolPopupOpenIndex(index);
        }
    };




    const togglePrmPopup = () => {
        setPrmPopupOpen(!PrmPopupOpen);
    };



    // Handler for checkbox click
    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
        setIsModalOpen(!isModalOpen);
    };


    const formatDate = (
        date: string | Date,
        format: 'input' | 'display' = 'input'
    ): string => {
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';

        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');

        if (format === 'display') {
            return `${day}/${month}/${year}`; // For UI display
        }

        return `${year}-${month}-${day}`; // For <input type="date">
    };

    const toggleAddModal = (

        isAddModalActive: boolean,
        setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>,


    ) => {
        setIsAddModalActive(true);

    };

    const toggleEditModal = (
        isEditModalActive: boolean,
        setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setIsEditModalActive(true);
    };

    const handleHeaderChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        setHeader: React.Dispatch<React.SetStateAction<any[]>>
    ) => {
        const { name, value } = event.target;

        setHeader((prevHeader) => [
            {
                ...prevHeader[0], // Keep previous properties if needed
                [name]: value, // Dynamically update the property based on the name attribute
            },
        ]);
    };

    const fetchPoNo = async () => {
        const res: RecidInterface = await RecidNOHelp(formatDate(new Date()), 'POGST', 'POrd');
        const clientId = searchParams.get('clientId');

        if (!clientId) {
            if (res?.success) {
                setPoNo(res?.data);
            } else {
                const errorMessage = res.error || 'Unknown error';
                toast.error(errorMessage, {
                    position: 'top-center',
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        }
    };


    useEffect(() => {
        fetchPoNo();
    }, []);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const Docid = searchParams.get('Docid'); // Get the clientId from URL
                if (Docid) {
                    setdocId(Docid);
                    const data: POApiResponse = await GetPOHeaderByDocid({ Docid });
                    if (data) { // Check if data is not null and has items
                        setPO(data.data); // Set the fetched single object
                    } else {
                        const Today = formatDate(new Date()); // Execute this when data is empty or null
                        setCurrentDate(Today)
                    }
                } else {
                    const Today = formatDate(new Date()); // Execute this when data is empty or null
                    setCurrentDate(Today)
                }

            } catch (error) {
                console.error('Error fetching Indent data:', error);
            }
        };

        fetchData();
    }, [searchParams, setCurrentDate, setPO, setdocId]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const Docid = searchParams.get('Docid'); // Get the clientId from URL
                if (Docid) {
                    setdocId(Docid);
                    const data: POApiResponseDetail = await GetPODetailByDocid({ Docid });
                    if (data) { // Check if data is not null and has items
                        setPODet(data.data); // Set the fetched single object
                    } else {
                        const Today = formatDate(new Date()); // Execute this when data is empty or null
                        setCurrentDate(Today)
                    }
                } else {
                    const Today = formatDate(new Date()); // Execute this when data is empty or null
                    setCurrentDate(Today)
                }

            } catch (error) {
                console.error('Error fetching Indent data:', error);
            }
        };

        fetchData();
    }, [searchParams, setCurrentDate, setPODet, setdocId]);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const Docid = searchParams.get('Docid'); // Get the clientId from URL
                if (Docid) {
                    setdocId(Docid);
                    const data: TCTData = await GetTermsCondAction({ Docid });

                    if (data) {
                        setPOTCT(data.data);
                        return;
                    }
                }

                // If clientId doesn't exist or no client-specific data
                const vType = PO[0]?.strV_Type;
                if (vType) {
                    const generalData: TCTData = await TermsCondAction(vType);
                    if (generalData) {
                        setPOTCT(generalData.data);
                    } else {
                        setPOTCT([]);
                    }
                } else {
                    // If strV_Type is empty or undefined, clear POTCT
                    setPOTCT([]);
                    console.log("Voucher type cleared, POTCT set to empty");
                }

            } catch (error) {
                console.error("Failed to fetch TCT details:", error);
                setPOTCT([]);
            }
        };

        fetchData();
    }, [PO[0]?.strV_Type]);




    const fetchOHHeaderData = async (): Promise<HeaderOHData[]> => {
        try {
            if (PO[0]?.strV_Type) {
                const response: HeaderOH = await GetOHHeader(PO[0].strV_Type);

                if (response.success && response.data) {
                    return response.data; // ✅ Return the data to HeaderOHComp
                }
            }
            return []; // In case of no data or failed condition
        } catch (error) {
            console.error("Failed to fetch Header OH details:", error);
            return [];
        }
    };

    const fetchOHLineData = async (): Promise<LineOHData[]> => {
        try {
            if (PO[0]?.strV_Type) {
                const response: LineOH = await GetOHLine(PO[0].strV_Type);

                if (response.success && response.data) {
                    return response.data; // ✅ Return the data to HeaderOHComp
                }
            }
            return []; // In case of no data or failed condition
        } catch (error) {
            console.error("Failed to fetch Header OH details:", error);
            return [];
        }
    };


    const handleEdit = (
        index: number,
        PODet: PoDetailInterface[], // Adjust the type according to your data structure

        setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>,
        setEditItem: React.Dispatch<React.SetStateAction<PoDetailInterface | null>>,
        setEditIndex: React.Dispatch<React.SetStateAction<number | null>>,
    ) => {
        const dataToEdit = PODet[index];
        setIsEditModalActive(true); // Open the modal for editing

        setEditIndex(index); // Save the index of the item being edited
        setEditItem(dataToEdit);

    };

    const handleTableDelete = (
        index: number,
        PODet: PoDetailInterface[],
        setPODet: React.Dispatch<React.SetStateAction<PoDetailInterface[]>>
    ) => {
        // First, get the data from the row that is about to be deleted
        const rowToDelete = PODet[index];

        if (rowToDelete) {
            setPODet(prevDetail => prevDetail.filter((_, i) => i !== index));

            toast.success('Data deleted successfully!', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        }
    };

    // Function that sets the index of the row to delete and opens the dialog
    const openDialog = (index: number): void => {
        setRowIndexToDelete(index); // Set the index of the row to delete
        setOpen(true); // Open the dialog
    };

    // Function to handle deletion after confirmation
    const handleConfirmDelete = () => {
        if (rowIndexToDelete !== null) {
            handleTableDelete(
                rowIndexToDelete,
                PODet,
                setPODet
            ); // Delete the row and pass the necessary parameters
            setOpen(false); // Close the dialog
        }

    }

    const submitForm = (formData: PoDetailInterface) => {

        handleFormSubmit(
            formData,
            setPODet,
            setSubmissions,
            setSubmittedData,
            toggleAddModal, // Pass the function directly
            setTotalGrossAmount,
            setTotalAdditionAmount,
            isAddModalActive,
            setIsAddModalActive,

        );

    };


    const handleFormSubmit = (
        formData: PoDetailInterface,
        setPODet: React.Dispatch<React.SetStateAction<PoDetailInterface[]>>,
        setSubmissions: React.Dispatch<React.SetStateAction<PoDetailInterface[]>>,
        setSubmittedData: React.Dispatch<React.SetStateAction<PoDetailInterface | null>>,
        toggleAddModal: (isAddModalActive: boolean, setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>) => void,
        setTotalGrossAmount: React.Dispatch<React.SetStateAction<number>>,
        setTotalAdditionAmount: React.Dispatch<React.SetStateAction<number>>,
        isAddModalActive: boolean,
        setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>,


    ) => {



        setSubmissions(prevSubmissions => [...prevSubmissions, formData]);
        setPODet(prevSubmissions => [...prevSubmissions, formData]);
        setSubmittedData(formData); // Update the state with submitted form data
        toggleAddModal(isAddModalActive, setIsAddModalActive); // Correct argument order
        setTotalGrossAmount(prevAmountG => prevAmountG + (formData.dblAmount ?? 0));
        setTotalAdditionAmount(prevAmountA => prevAmountA + (formData.dblAdditionAmt ?? 0));
    };

    const submitEditForm = (formData: PoDetailInterface) => {

        handleEditFormSubmit(
            formData,
            editIndex,
            PODet,
            setPODet,
            toggleEditModal,
            setPO,
            setEditIndex,
            isEditModalActive,
            setIsEditModalActive,
        );


    };

    const handleEditFormSubmit = (

        formData: PoDetailInterface,
        editIndex: number | null,
        PODet: PoDetailInterface[],
        setPODet: React.Dispatch<React.SetStateAction<PoDetailInterface[]>>,
        toggleEditModal: (isActive: boolean, setIsActive: React.Dispatch<React.SetStateAction<boolean>>) => void,
        setPO: React.Dispatch<React.SetStateAction<POInterface[]>>, // Adjust the type as necessary
        setEditIndex: React.Dispatch<React.SetStateAction<number | null>>,
        isEditModalActive: boolean,
        setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>,


    ) => {
        if (editIndex !== null) {

            const updatedSubmissions = PODet.map((item, index) =>
                index === editIndex ? formData : item
            );
            setPODet(updatedSubmissions);

            toggleEditModal(isEditModalActive, setIsEditModalActive); // Close the modal
        } else {
            console.error("Edit index is not set.");
        }
    };

    const handleTCTChange = (index: number, value: string) => {
        setPOTCT(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                strValue: value,
            };
            return updated;
        });
    };


    const handleChange = async <K extends keyof POInterface>(key: K, value: POInterface[K]) => {
        // Update PO state
        setPO((prev) => {
            const updated = [...prev];
            if (updated.length === 0) {
                updated.push({ [key]: value } as POInterface);
            } else {
                updated[0] = { ...updated[0], [key]: value };
            }
            return updated;
        });

        // If the changed key is 'strIndDocId', handle the async side-effect
        if (key === "strIndDocId" && typeof value === "string") {
            const trimmedValue = value.trim();
            if (trimmedValue !== "") {
                try {
                    const response: POApiResponseDetail = await GetPordDetInGridByPendingIndent({
                        strIndNo: trimmedValue
                    });

                    const updatedDetails = (response?.data || []).map((item) => ({
                        ...item,
                        dblOrdQty: item.dblPIQty,
                        dblQtySKU: item.dblPIQty

                    }));

                    setPODet(updatedDetails);
                    setPoDetailsMap([]);

                } catch (error) {
                    console.error("Failed to fetch indent details:", error);
                    setPODet([]);
                    setPoDetailsMap([]);
                }
            } else {
                // Clear if empty string
                setPODet([]);
            }
        }
    };


    type poKeys = keyof POInterface;

    const requiredFields: { key: poKeys; label: string }[] = [
        { key: 'strV_Type', label: 'Voucher Type' },
        { key: 'strRefNo', label: 'Ref. No.' },
        { key: 'strRefDate', label: 'Ref. Date' },
        { key: 'strTransactionType', label: 'Transaction Type' },
        { key: 'strPartyCode', label: 'Supplier' },
    ];

    const validatePO = (PO: POInterface): boolean => {
        for (const field of requiredFields) {
            const value = PO[field.key];
            if (!value || value.toString().trim() === '') {
                setModalMessage(`${field.label} is a required field.`);
                setIsModalvalidate(true);
                return false;
            }
        }

        return true;
    };


    const handleSubmit = async (
        event: React.FormEvent,
        setIsSelect: Dispatch<SetStateAction<boolean>>
    ) => {

        event.preventDefault();
        const header = PO[0];
        if (!header) {
            setModalMessage("Order data is missing.");
            setIsModalvalidate(true);
            return;
        }

        if (!validatePO(header)) return;

        const PODateStr = PO[0]?.strV_Date ?? new Date().toISOString().split('T')[0];
        const refDateStr = PO[0]?.strRefDate

        if (!refDateStr || !PODateStr) {
            setModalMessage("Both Ref. Date and Indent Date are required.");
            setIsModalOpen(true);
            return;
        }


        if (new Date(refDateStr) > new Date(PODateStr)) {
            setModalMessage("Ref Date Is Not Greater Than Entry Date.");
            setIsModalvalidate(true);
            return;
        }


        if (!PODet || PODet.length === 0) {
            setModalMessage('Please Fill item.');
            setIsModalvalidate(true);
            return;
        }

        for (const item of PODet) {
            if (!item.strItemCode || item.strItemCode.trim() === '') {
                setModalMessage('Item Name is a required field.');
                setIsModalvalidate(true);
                return;
            }

            if (item.dblOrdQty === undefined || item.dblOrdQty === null || item.dblOrdQty.toString().trim() === '' || Number(item.dblOrdQty) === 0) {
                setModalMessage('Order Qty is a required field .');
                setIsModalvalidate(true);
                return;
            }

            if (!item.strReqDate || item.strReqDate.toString().trim() === '') {
                setModalMessage('Req Date is a required field.');
                setIsModalvalidate(true);
                return;
            }
        }

        const mappedPODet = PODet.map((item, index) => {
            const indentItems = poDetailsMap[index] || [];

            // Inject strItemCode from PODet into each indent's StrItemCode
            const updatedIndents = indentItems.map(indent => ({
                ...indent,
                StrItemCode: item.strItemCode || '', // <-- this line does the main work
                StrItemName: item.strItemDesc || '',
            }));

            return {
                ...item,
                clsIndent: updatedIndents,
            };
        });


        const updatedPostFormData = {
            clsHeader: [{
                strDocId: PO[0]?.strDocId || '',
                strV_Type: PO[0]?.strV_Type || '',
                strV_TypeDesc: PO[0]?.strV_TypeDesc || '',
                intV_No: PO[0]?.intV_No || 0,
                strRecId: PO[0]?.strRecId || '',
                strV_Date: PO[0]?.strV_Date || new Date().toISOString().split('T')[0],
                strV_Prefix: PO[0]?.strV_Prefix || '',
                strPartyCode: PO[0]?.strPartyCode || '',
                strPartyName: PO[0]?.strPartyName || '',
                strDistributor: PO[0]?.strDistributor || '',
                strLocation: PO[0]?.strLocation || '',
                strCurrencyCode: PO[0]?.strCurrencyCode || '',
                strQuotDocId: PO[0]?.strQuotDocId || '',
                strQuotNo: PO[0]?.strQuotNo || '',
                strIndDocId: PO[0]?.strIndDocId || '',
                strIndNo: PO[0]?.strIndNo || '',
                strAmdOrdDocId: PO[0]?.strAmdOrdDocId || '',
                strRefDate: PO[0]?.strRefDate || '',
                strRefNo: PO[0]?.strRefNo || '',
                strRemark: PO[0]?.strRemark || '',
                strTerms: PO[0]?.strTerms || '',
                strRemark_2: PO[0]?.strRemark_2 || '',
                dblGAmount: PO[0]?.dblGAmount || 0,
                dblExciseAmt: PO[0]?.dblExciseAmt || 0,
                dblCessAmt: PO[0]?.dblCessAmt || 0,
                dblEduCessAmt: PO[0]?.dblEduCessAmt || 0,
                dblSHCessAmt: PO[0]?.dblSHCessAmt || 0,
                dblTaxAmt: PO[0]?.dblTaxAmt || 0,
                dblTotalAmt: PO[0]?.dblTotalAmt || 0,
                dblROffAmt: PO[0]?.dblROffAmt || 0,
                dblNAmount: PO[0]?.dblNAmount || 0,
                strSite_Code: Site_Code,
                strApprovedBy: PO[0]?.strApprovedBy || '',
                strPreparedBy: PO[0]?.strPreparedBy || '',
                strModifiedBy: PO[0]?.strModifiedBy || '',
                strU_EntDt: new Date().toISOString(),
                strU_AE: PO[0]?.strU_AE || '',
                strTransfered: PO[0]?.strTransfered || '',
                strDocGUID: PO[0]?.strDocGUID || '',
                dblCMN_Addition: PO[0]?.dblCMN_Addition || 0,
                dblCMN_Deduction: PO[0]?.dblCMN_Deduction || 0,
                strVerifiedBy: PO[0]?.strVerifiedBy || '',
                strApprovedDate: PO[0]?.strApprovedDate || '',
                dblAdditionAmt: PO[0]?.dblAdditionAmt || 0,
                dblPackFwdAmt: PO[0]?.dblPackFwdAmt || 0,
                dblDiscAmt: PO[0]?.dblDiscAmt || 0,
                dblFreight: PO[0]?.dblFreight || 0,
                dblInsurance: PO[0]?.dblInsurance || 0,
                dblServiceValue: PO[0]?.dblServiceValue || 0,
                dblTaxableValue: PO[0]?.dblTaxableValue || 0,
                dblCGSTAmt: PO[0]?.dblCGSTAmt || 0,
                dblSGSTAmt: PO[0]?.dblSGSTAmt || 0,
                dblUGSTAmt: PO[0]?.dblUGSTAmt || 0,
                dblIGSTAmt: PO[0]?.dblIGSTAmt || 0,
                strAgtForm: PO[0]?.strAgtForm || '',
                strVerifiedDate: PO[0]?.strVerifiedDate || '',
                strDocumentVPrefix: PO[0]?.strDocumentVPrefix || '',
                strDocumentFormat: PO[0]?.strDocumentFormat || '',
                strDocumentVoucherNo: PO[0]?.strDocumentVoucherNo || '',
                dblCurrRateInr: PO[0]?.dblCurrRateInr || 0,
                strToleranceBy: PO[0]?.strToleranceBy || '',
                strToleranceDate: PO[0]?.strToleranceDate || '',
                strApprovalID: PO[0]?.strApprovalID || '',
                strTransactionType: PO[0]?.strTransactionType || '',
                strTransactionTypeName: PO[0]?.strTransactionTypeName || '',
                strApprovalStatus: PO[0]?.strApprovalStatus || '',
                strFMID: PO[0]?.strFMID || '',
                strCurrencyDependOn: PO[0]?.strCurrencyDependOn || '',
                strRevNo: PO[0]?.strRevNo || '',
                strAmdOrdRecId: PO[0]?.strAmdOrdRecId || '',
                intCreditDays: PO[0]?.intCreditDays || 0,
                strUpdateSupplierUserName: PO[0]?.strUpdateSupplierUserName || '',
                strUpdateSupplierDate: PO[0]?.strUpdateSupplierDate || '',
                strFromWeb: 'Y',
            }],

            clsItemDetail: mappedPODet,
            clsMainOH: [],
            clsTermCondition: POTCT,
            clsPordNotification: []
        };



        let res: AddPO | null = null;
        try {
            res = await AddPOAction(updatedPostFormData);

            const showToastAndReload = async () => {
                if (res?.success) {
                    if (docId === "") {
                        toast.success('Add Order Successfully!', {
                            position: 'top-center',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light',
                        });
                        setPO([]);
                        setPODet([]);
                        setPOTCT([]);
                        setIsSelect(true);
                        await fetchPoNo();
                    } else {
                        toast.success('Order Edited Successfully!', {
                            position: 'top-center',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light',
                        });
                    }
                } else {
                    toast.error(res?.error || "Something went wrong", { position: 'top-center', autoClose: 3000 });
                }
            };

            showToastAndReload();
        } catch (error) {
            toast.error("API call failed", {
                position: 'top-center',
                autoClose: false
            });
        }
    };

    useEffect(() => {
        const totalGross = PODet.reduce((acc, item) => acc + (item.dblAmount ?? 0), 0);
        setTotalGrossAmount(totalGross);

        const totalAdditionAmt = PODet.reduce((acc, item) => acc + (item.dblAdditionAmt ?? 0), 0);
        setTotalAdditionAmount(totalAdditionAmt);

    }, [PODet, setTotalAdditionAmount, setTotalGrossAmount]);



    useEffect(() => {
        const totalAdditionAmt = parseFloat(totalAdditionAmount.toFixed(2))
        const totalGrossAmt = parseFloat(totalGrossAmount.toFixed(2))

        setPO((prevHeader) => (
            [
                {

                    ...prevHeader[0],
                    dblGAmount: totalGrossAmt,
                }
            ]

        ));
        setPO((prevHeader) => (
            [
                {

                    ...prevHeader[0],
                    dblAdditionAmt: totalAdditionAmt,
                }
            ]

        ));
        setPO((prevHeader) => (
            [
                {

                    ...prevHeader[0],
                    dblNAmount: totalAmount,
                }
            ]

        ));


        setTotalAmount(totalGrossAmt + totalAdditionAmt);

    }, [totalGrossAmount, totalAdditionAmount, totalAmount, setPO, setTotalAmount])





    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4">
                    <VoucherTypeHelpComponent
                        filters={PO[0]}
                        handleChange={handleChange}
                        StrCondition="and Category In ('PORD','PORDR','PODST','POGST','POIGS')"
                        filterKey="strV_Type"
                        nameKey="strV_TypeDesc"
                        isMulti={false}
                        label={<>Type <span style={{ color: 'red' }}>*</span></>}
                    />

                    <TextBoxOne
                        label="Order No"
                        type="text"
                        disabled={false}
                        readOnly={true}
                        labelColor="red"
                        defaultValue={PO[0]?.strRecId || pono}
                    />

                    <div className="mb-1">
                        <label
                            htmlFor="OrderDate"
                            className="block text-sm font-medium text-black  mb-1"
                        >
                            Order Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="OrderDate"
                            name="OrderDate"
                            type="date"
                            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900  focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            defaultValue={formatDate(PO?.[0]?.strV_Date || currentDate)}
                        />
                    </div>


                    <div className="mb-1">
                        <label htmlFor="strpartyOrdNo" className="block text-sm font-medium text-black ">
                            Ref. No. <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            id="strRefNo"
                            name="strRefNo"
                            type="text"
                            value={PO?.[0]?.strRefNo || ''}
                            onChange={(e) => handleChange("strRefNo", e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent md:px-1 px-1 py-3 h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            autoComplete="off"
                        />
                    </div>

                    <div className="mb-1">
                        <label className="block text-sm font-medium text-black ">
                            Ref. Date <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            id="RefDate"
                            name="RefDate"
                            type="date"
                            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900  focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formatDate(PO?.[0]?.strRefDate || '')}
                            onChange={(e) => handleChange("strRefDate", e.target.value)}
                        />
                    </div>
                </div>

                {/* Column 2 */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4">
                    <TransactionTypeHelpComponent
                        filters={PO[0]}
                        handleChange={handleChange}
                        filterKey="strTransactionType"
                        nameKey="strTransactionTypeName"
                        StrCondition=" AND  VT.V_Type In ('POGST') "
                        isMulti={false}
                        label={<>Transaction Type <span style={{ color: 'red' }}>*</span></>}
                        showButton={false}
                    />

                    <PartyHelpComponent
                        filters={PO[0]}
                        handleChange={handleChange}
                        StrNature="Supplier"
                        filterKey="strPartyCode"
                        nameKey="strPartyName"
                        isMulti={false}
                        label={<>Supplier <span style={{ color: 'red' }}>*</span></>}
                        showButton={false}
                    />

                    <div className="mb-1">
                        <label className="block text-sm font-medium text-black ">
                            Distributor
                        </label>
                        <input
                            type="text"
                            name="strDistributor"
                            id="strDistributor"
                            disabled
                            value={PO[0]?.strDistributor}
                            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 "
                        />
                    </div>

                    <FGetAgainstFormComponent
                        filters={PO[0]}
                        handleChange={handleChange}
                        filterKey="strAgtForm"
                        nameKey="strAgtFormName"
                        label={<>Against Form <span style={{ color: 'red' }}>*</span></>}
                        isMulti={false}
                        StrV_Type={PO[0]?.strV_Type}
                        StrPartyLocation={PO[0]?.strLocation}
                    />

                    <div className="mb-1">
                        <label className="block text-sm font-medium text-black ">
                            Amendment No.
                        </label>
                        <select
                            id="strdelAt"
                            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 "
                        >
                            {/* Options here */}
                        </select>
                    </div>
                </div>

                {/* Column 3 */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 flex flex-col gap-4">
                    <QuotationNoHelpComponent
                        filters={PO[0]}
                        handleChange={handleChange}
                        filterKey="strQuotDocId"
                        nameKey="strQuotNo"
                        isMulti={true}
                        label={<>Quotation No.</>}
                        StrSupplierCode={PO[0]?.strPartyCode}
                    />

                    <PendingIndentNoHelpComponent
                        filters={PO[0]}
                        handleChange={handleChange}
                        filterKey="strIndDocId"
                        nameKey="strIndNo"
                        isMulti={false}
                        label={<>Indent No.</>}
                        StrSupplierCode={PO[0]?.strPartyCode}
                        StrV_Date={formatDate(PO[0]?.strV_Date || currentDate)}
                    />

                    <div className="mb-1">
                        <label className="block text-sm font-medium text-black ">
                            Enquiry No.
                        </label>
                        <div className="flex items-center gap-2">
                            <select
                                id="strdelAt"
                                className="flex-grow rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 "
                            >
                                {/* Options here */}
                            </select>
                        </div>
                    </div>

                    <CurrencyHelpComponent
                        filters={PO[0]}
                        handleChange={handleChange}
                        filterKey="strCurrencyCode"
                        nameKey="strCurrencyCodeName"
                        isMulti={false}
                        label={<>Currency</>}
                    />

                    <TextBoxOne
                        label="Credit Days"
                        type="text"
                        disabled={false}
                        readOnly={true}
                        defaultValue={PO[0]?.intCreditDays || 0}
                    />
                </div>
            </div>

            <div className="w-15" onClick={() => toggleAddModal(isAddModalActive, setIsAddModalActive)}>

                <button
                    className='w-14 px-1 font-bold py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
                >
                    Add
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-2">
                <div className="overflow-x-auto mt-2">
                    {/* <TableThree /> */}
                    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div className="max-w-full overflow-x-auto">
                            {/* Check if the screen is mobile */}
                            <div className="lg:hidden">
                                {/* Mobile View */}
                                <div className="overflow-y-auto max-h-full md:hidden mt-4 px-4 sm:px-6 bg-cyan-50">
                                    <div className="space-y-2">
                                        {PODet.map((ele, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-xl shadow-lg mb-6 p-6 dark:bg-slate-800  transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r duration-500 ease-in-out"
                                            >
                                                <div className="flex flex-col">
                                                    <div className="flex items-center space-x-2 border-b-2 border-cyan-900 pb-2">
                                                        <span className="text-sm font-bold text-cyan-900 dark:text-gray-200">
                                                            Item Name:
                                                        </span>
                                                        <span className="text-sm font-semibold text-cyan-800 dark:text-gray-300">
                                                            {ele.strItemDesc}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col space-y-2 mt-2"> {/* Increased space between the details */}
                                                        <div className="text-xs font-semibold text-gray-700 ">
                                                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                                S.No.:
                                                            </span>
                                                            <span className="text-xs text-gray-700 dark:text-gray-300">{ele.RowID}</span>
                                                        </div>
                                                    </div>
                                                    {/* <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            G/S:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">G</span>
                                                    </div> */}
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">                                                                <input
                                                            className="cursor-pointer"
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={handleCheckboxClick}
                                                        /></span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            Code:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">
                                                            {ele.strManualCode}

                                                        </span>
                                                    </div>

                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            L.Rate:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">
                                                            {ele.LRate}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            Make:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">{ele.strMakeName}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            IND:
                                                        </span>
                                                        <TiArrowSortedDown
                                                            className="inline text-gray-500 text-lg cursor-pointer"
                                                            onClick={() => setIndPopupOpenIndex(index)}
                                                        />

                                                        {IndPopupOpenIndex === index && (
                                                            <PODetailsComp
                                                                isOpen={true}
                                                                togglePopup={() => setIndPopupOpenIndex(null)}
                                                                strIndNo={PO[index]?.strIndDocId ?? ""}
                                                                StrItemCode={ele.strItemCode ?? ""}
                                                                StrV_date={PO[index]?.strV_Date || currentDate}
                                                                savedData={poDetailsMap[index] ?? null}
                                                                setSavedData={(data) => {
                                                                    setPoDetailsMap((prev) => ({
                                                                        ...prev,
                                                                        [index]: data,
                                                                    }));

                                                                    // 👇 Total order qty nikal ke PO[index] update karo
                                                                    const totalOrdQty = data.reduce((sum, row) => sum + (row.DblOrdQty ?? 0), 0);
                                                                    updatePOQtyAtIndex(index, totalOrdQty);
                                                                }}
                                                            />

                                                        )}
                                                    </div>

                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            SKU Qty:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">{ele.dblQtySKU}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            SKU:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">{ele.strUnit}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            Ord Qty:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">{ele.dblOrdQty}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            Tol.:
                                                        </span>
                                                        <TiArrowSortedDown
                                                            className="inline ml-1 text-gray-500 text-lg"
                                                            onClick={() => toggleTolPopup(ele.dblPIQty || ele.dblOrdQty, index)}
                                                        />

                                                        {TolPopupOpenIndex === index && (
                                                            <POOrdToComp
                                                                isOpen={true}
                                                                togglePopup={() => setTolPopupOpenIndex(null)}
                                                                ordQty={selectedOrdQty}
                                                            />
                                                        )}

                                                    </div>

                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            Unit:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">{ele.strUnit}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            Rate:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">{ele.dblRate}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            Amount:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">{ele.dblAmount}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            PRM:
                                                        </span>
                                                        <TiArrowSortedDown className="inline ml-1 text-gray-500 text-lg" onClick={togglePrmPopup} />
                                                        <POPrmDetailsComp isOpen={PrmPopupOpen} togglePopup={togglePrmPopup} />
                                                    </div>

                                                    {/* <div className="flex items-center space-x-2"> */}
                                                    <div className="flex items-center">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            Remarks:{ele.strRemark}
                                                        </span>
                                                        {/* <span className="text-xs text-gray-700 dark:text-gray-300">{ele.Remark}</span> */}
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            OH:
                                                        </span>
                                                        <TiArrowSortedDown className="inline ml-1 text-gray-500 text-lg" onClick={handleLineOHOpen} />
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            Req.Date:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">{formatDate(ele.strReqDate || '', 'display')}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            Item Desc:
                                                        </span>
                                                        <span className="text-xs text-gray-700 dark:text-gray-300">
                                                            {ele.strItmDsc}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                            QC:
                                                        </span>
                                                        <TiArrowSortedDown
                                                            className="inline text-gray-500 text-lg cursor-pointer"
                                                            onClick={() => setQCPopupOpenIndex(index)}
                                                        />

                                                        {QCPopupOpenIndex === index && (
                                                            <QCDetailsComp
                                                                isOpen={true}
                                                                togglePopup={() => setQCPopupOpenIndex(null)}
                                                                strIndNo={PO[0]?.strIndDocId ?? ""}
                                                                StrItemCode={ele.strItemCode ?? ""}
                                                                StrV_date={PO[0]?.strV_Date || currentDate}
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end space-x-1 mt-4">
                                                    <IconButton
                                                        color="primary"
                                                        className="hover:bg-blue-100"
                                                        sx={{ fontSize: 18 }}
                                                        onClick={() => handleEdit(index, PODet, setIsEditModalActive, setEditItem, setEditIndex)}

                                                    >
                                                        <FaEdit />
                                                    </IconButton>

                                                    <IconButton
                                                        color="error"
                                                        className="hover:bg-red-100"
                                                        sx={{ fontSize: 18 }}
                                                        onClick={(e) => { e.stopPropagation(); openDialog(index); }}

                                                    >
                                                        <FaTrash />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Desktop View */}
                            <div className="hidden lg:block ">
                                <div className="max-h-[300px] overflow-y-auto overflow-x-auto">
                                    <table className="w-full table-auto  whitespace-nowrap">
                                        <thead>
                                            <tr className="text-left text-sm font-semibold   bg-teal-400  text-white dark:bg-gray-800 ">
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Sno</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Actions</th>
                                                {/* <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">G/S</th> */}
                                                {/* <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700"></th> */}
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Item Name</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Code</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">L.Rate</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Make</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">IND</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">SKU Qty</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">SKU</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Ord Qty</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Tol.</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Unit</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Rate</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Amount</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">PRM</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700 ">Remarks</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">OH</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Req.Date</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">Item Desc</th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700">QC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PODet.map((ele, index) => (
                                                <tr key={index} className="border-t border-gray-300 dark:border-gray-700">
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{index + 1}</td>
                                                    <td className="px-4 py-1 whitespace-nowrap">
                                                        <div className="flex items-center justify-end space-x-1">
                                                            <IconButton
                                                                color="primary"
                                                                className="hover:bg-blue-100"
                                                                sx={{ fontSize: 18 }}
                                                                onClick={() => handleEdit(index, PODet, setIsEditModalActive, setEditItem, setEditIndex)}

                                                            >
                                                                <FaEdit />
                                                            </IconButton>

                                                            <IconButton
                                                                color="error"
                                                                className="hover:bg-red-100"
                                                                sx={{ fontSize: 18 }}
                                                                onClick={(e) => { e.stopPropagation(); openDialog(index); }}

                                                            >
                                                                <FaTrash />
                                                            </IconButton>
                                                        </div>
                                                    </td>
                                                    {/* <td className="px-4 py-3 text-xs text-black text-black whitespace-nowrap">G</td> */}
                                                    {/* <td className="px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap">
                                                    <input
                                                        className="cursor-pointer"
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={handleCheckboxClick}
                                                    />
                                                </td> */}
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{ele.strItemDesc}</td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">
                                                        {ele.strManualCode}

                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">
                                                        {ele.LRate}

                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{ele.strMakeName}</td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">
                                                        <TiArrowSortedDown
                                                            className="inline text-gray-500 text-lg cursor-pointer"
                                                            onClick={() => setIndPopupOpenIndex(index)}
                                                        />

                                                        {IndPopupOpenIndex === index && (
                                                            <PODetailsComp
                                                                isOpen={true}
                                                                togglePopup={() => setIndPopupOpenIndex(null)}
                                                                strIndNo={PO[index]?.strIndDocId ?? ""}
                                                                StrItemCode={ele.strItemCode ?? ""}
                                                                StrV_date={PO[index]?.strV_Date || currentDate}
                                                                savedData={poDetailsMap[index] ?? null}
                                                                setSavedData={(data) => {
                                                                    setPoDetailsMap((prev) => ({
                                                                        ...prev,
                                                                        [index]: data,
                                                                    }));

                                                                    // 👇 Total order qty nikal ke PO[index] update karo
                                                                    const totalOrdQty = data.reduce((sum, row) => sum + (row.DblOrdQty ?? 0), 0);
                                                                    updatePOQtyAtIndex(index, totalOrdQty);
                                                                }}
                                                            />

                                                        )}


                                                    </td>

                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{ele.dblQtySKU}</td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{ele.strUnit}</td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{ele.dblOrdQty}</td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">
                                                        <TiArrowSortedDown
                                                            className="inline ml-1 text-gray-500 text-lg"
                                                            onClick={() => toggleTolPopup(ele.dblPIQty || ele.dblOrdQty, index)}
                                                        />

                                                        {TolPopupOpenIndex === index && (
                                                            <POOrdToComp
                                                                isOpen={true}
                                                                togglePopup={() => setTolPopupOpenIndex(null)}
                                                                ordQty={selectedOrdQty}
                                                            />
                                                        )}

                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{ele.strUnit}</td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{ele.dblRate}</td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{ele.dblAmount}</td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">
                                                        <TiArrowSortedDown className="inline text-gray-500 text-lg" onClick={togglePrmPopup} />
                                                        <POPrmDetailsComp isOpen={PrmPopupOpen} togglePopup={togglePrmPopup} />
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap break-words  max-w-full">{ele.strRemark}</td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap" onClick={handleLineOHOpen}><TiArrowSortedDown className="inline text-gray-500 text-lg" /></td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{formatDate(ele.strReqDate || '', 'display')}</td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{ele.strItmDsc}</td>
                                                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">  <TiArrowSortedDown
                                                        className="inline text-gray-500 text-lg cursor-pointer"
                                                        onClick={() => setQCPopupOpenIndex(index)}
                                                    />

                                                        {QCPopupOpenIndex === index && (
                                                            <QCDetailsComp
                                                                isOpen={true}
                                                                togglePopup={() => setQCPopupOpenIndex(null)}
                                                                strIndNo={PO[0]?.strIndDocId ?? ""}
                                                                StrItemCode={ele.strItemCode ?? ""}
                                                                StrV_date={PO[0]?.strV_Date || currentDate}
                                                            />
                                                        )}</td>


                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>




            {/* Footer inputs */}
            <div className="mt-6 rounded-md border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark">

                <div className="flex flex-col lg:flex-row justify-between p-4 gap-6">

                    <div className="flex-1">
                        <TermsAndConditions
                            TCT={POTCT}
                            onTCTChange={handleTCTChange}
                        />
                    </div>
                    <div className="flex-1 space-y-4  lg:mt-0">
                        <HeaderOHComp
                            fetchItems={fetchOHHeaderData}
                            columnsConfig={HeaderOHColumnsConfig}
                            onShowItem={handleShowItem} // ✅ passes the callback
                        />
                    </div>
                </div>
            </div >

            <LineOHComp
                open={openLineOH}
                onClose={handleLineOHClose}
                fetchItems={fetchOHLineData}
                columnsConfig={LineOHColumnsConfig}
                title="Structure Line"
                dialogWidth="600px"
            />


            <ShowHeaderOHComp
                open={openHeaderOH}
                onClose={handleHeaderOHClose}
                fetchItems={fetchOHHeaderData}
                columnsConfig={ShowHeaderOHColumnsConfig}
                title="Structure Header"
                dialogWidth="600px"
                selectedItem={selectedHeaderItem} // pass selected item if needed
            />



            <div className="flex justify-end">
                <button
                    className='w-14 px-1 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
                    onClick={(e) => handleSubmit(e, setIsSelect)}
                >
                    Save

                </button>
            </div>


            <AddPOModal
                // Modal state and toggle
                isAddModalActive={isAddModalActive}
                toggleAddModal={() => setIsAddModalActive(false)}
                isEditModalActive={isEditModalActive}
                toggleEditModal={() => setIsEditModalActive(false)}
                onFormSubmit={isEditModalActive ? submitEditForm : submitForm}
                editItem={isEditModalActive ? editItem : undefined} // Pass editItem only if in edit mode
                PO={PO}
                setPO={setPO}
                PODet={PODet}
                setPODet={setPODet}
            />
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                        Are you sure you want to delete this Row?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{
                            backgroundColor: '#7367F0', // Yes button color
                            color: 'white', // Text color
                        }}
                        onClick={handleConfirmDelete}
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
            {isModalvalidate && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 animate-fadeIn z-[1000]">
                    <div className="bg-white dark:border-strokedark dark:bg-boxdark p-6 rounded-lg shadow-lg max-w-sm w-full transform scale-95 animate-scaleUp">
                        <h2 className="text-xl font-semibold text-gray-800 text-center mb-7">{modalMessage}</h2>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setIsModalvalidate(false)}
                                className="bg-blue-400 text-white px-4 py-1 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}
const POEntry = () => {
    const router = useRouter()
    function handleChange() {
        router.push('/entrypoint/purchaseorder/purchaseorderlist/')
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            // transition={Flip}
            />
            <HeadingTab TitleIcon={BsBank2} Title='Purchase' RoutingIcon={SiHomebridge} routingPath='/home/' />
            <div style={{ marginTop: '10px' }}>
                <Card>
                    <CardHeader
                        title='Purchase Order Entry'
                        action={
                            <div style={{ display: 'flex' }}>
                                <IconButton
                                    onClick={handleChange}
                                    size='small'
                                    aria-label='settings'
                                    className='card-more-options'
                                    sx={{ color: 'text.secondary' }}
                                >
                                    <ExitToApp />
                                </IconButton>
                            </div>
                        }
                    />
                    <Divider variant='middle' />
                    <CardContent sx={{ padding: '10px' }}>{RenderStats()}</CardContent>
                </Card>
            </div>

        </>
    )
}

export default POEntry
