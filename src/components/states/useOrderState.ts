
import { useState } from 'react';
import type { FormData, Consignee, Delivery, Contract, DMSSordItemDetailUpdatePostData, SaleReportInterface, OrderStatus, PendingOrder, ProductType, DMSSordHeader, EnquiryType, CustomerPrevEnquiryDetail, Gsm, ItemName, Bf, SearchFilterListDetails, SizeUnit, AddSaleEnquiry, AddNewPartyInterface, City, Country, PartyRequestName, VerifiedOrderStatus, PartyDataforSale, BalanceEntry, PartyforSale, cosno, AddressBook, Type, PriceDetails, AddressBookData, TypeData, OrderStatusData, StockData, LedgerData, OrderTrackData, PartyRequestByDocIdData, BalanceEntryData, MakeToOrderData, AgtForm, TransactionTypeforSale, TransactionTypeDataforSale, PartyDataforSaleOrder } from '../interfaces/page'
import { PriceListinitialFormData, initialFormData, initialFormDataForSale } from '../Functions/SaleOrder/SaleOrder';
import { clsSaleOrderItemDetail, ConsigneeDataForSale } from '@/app/(dashboard)/saleOrderEntry/SaleOrder_Entry_modal';

export const useOrderState = () => {
    const [partyName, setPartyName] = useState<string>('');
    const [siteCode, setSiteCode] = useState("");
    const [sitename, setSiteName] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPlaced, setIsPlaced] = useState(false);
    const [totalGrossAmount, setTotalGrossAmount] = useState(0);
    const [totalCGST, setTotalCGST] = useState(0);
    const [totalSGST, setTotalSGST] = useState(0);
    const [totalIGST, setTotalIGST] = useState(0);
    const [agtForm, setAgtForm] = useState<AgtForm[]>([]);
    const [isFetchedAgtForm, setIsFetchedAgtForm,] = useState<boolean>(false);
    const [totalAdditionAmount, setTotalAdditionAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [isAddModalActive, setIsAddModalActive] = useState(false);
    const [isEditModalActive, setIsEditModalActive] = useState(false);
    const [submittedData, setSubmittedData] = useState<clsSaleOrderItemDetail | null>(null);
    const [submissions, setSubmissions] = useState<clsSaleOrderItemDetail[]>([]);
    const [detailToPost, setdetailToPost] = useState<DMSSordItemDetailUpdatePostData[]>([]);
    const [detailToPost2, setdetailToPost2] = useState<DMSSordItemDetailUpdatePostData[]>([]);
    const [viewDetails, setViewDetails] = useState<FormData[]>([]);
    const [roundOff, setRoundOff] = useState(0);
    const [netAmount, setNetAmount] = useState(0);





    const [consignees, setConsignees] = useState<ConsigneeDataForSale[]>([]);
    const [addressbook, setAddressbook] = useState<AddressBook[]>([]);
    const [addressbookData, setAddressbookData] = useState<AddressBookData[]>([]);





    const [deladdressbook, setDelAddressbook] = useState<AddressBook[]>([]);
    const [partyaddressbook, setPartyaddressbook] = useState<AddressBook[]>([]);
    const [productType, setProductType] = useState<ProductType[]>([]);
    const [transaction, setTransaction] = useState<TransactionTypeDataforSale[]>([]);
    const [delivery, setDelivery] = useState<Delivery[]>([]);
    const [party, setParty] = useState<PartyDataforSaleOrder[]>([]);
    const [freighttype, setFreightType] = useState<Type[]>([]);
    const [salesperson,setSalesPerson] = useState<Type[]>([]);
    const [freighttypeData, setFreightTypeData] = useState<TypeData[]>([]);
    const [contractSales, setcontractSales] = useState<Contract[]>([]);
    const [isFetchedCon, setIsFetchedCon] = useState<boolean>(false);
    const [isFetchedAdd, setIsFetchedAdd] = useState<boolean>(false);
    const [isFetchedDelAdd, setIsFetchedDelAdd] = useState<boolean>(false);
    const [isFetchedPartyAdd, setIsFetchedPartyAdd] = useState<boolean>(false);
    const [isFetchedProductType, setisFetchedProductType] = useState<boolean>(false);
    const [isFetchedTransaction, setIsFetchedTransaction] = useState<boolean>(false);
    const [isFetchedDel, setIsFetchedDel] = useState<boolean>(false);
    const [isFetchedParty, setIsFetchedParty] = useState<boolean>(false);
    const [isFetchedFreightType, setIsFetchedFreightType] = useState<boolean>(false);
    const [isFetchedSalesPerson, setIsFetchedSalesPerson] = useState<boolean>(false);
    const [selectedConsignee, setSelectedConsignee] = useState<string>('');
    const [selectedProductType, setSelectedProductType] = useState<string>('');
    const [selectedProductTypeCode, setSelectedProductTypeCode] = useState<string>('');
    const [selectedDelivery, setSelectedDelivery] = useState<string>('');
    const [editItem, setEditItem] = useState<clsSaleOrderItemDetail | null>(null);
    const [viewItem, setViewItem] = useState<clsSaleOrderItemDetail | null>(null);
    const [viewSaleItem, setViewSaleItem] = useState<SaleReportInterface | null>(null);
    const [viewPendingOrderItem, setViewPendingOrderItem] = useState<PendingOrder | null>(null);
    const [viewOrderStatusItem, setViewOrderStatusItem] = useState<OrderStatus | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [viewIndex, setViewIndex] = useState<number | null>(null);
    const [orderDate, setOrderDate] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryDatePost, setDeliveryDatePost] = useState('');
    const [orderDatePost, setOrderDatePost] = useState('');
    const [error, setError] = useState('');
    const [orderType, setOrderType] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [contractSO, setcontractSO] = useState<string>('');
    const [isFetchedCOS, setisFetchedCOS] = useState<boolean>(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [selectedRelatedOrders, setSelectedRelatedOrders] = useState<Contract[]>([]);
    const [partyOrderNo, setPartyOrderNo] = useState('');
    const [remarks, setRemarks] = useState('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedEnquiryType, setSelectedEnquiryType] = useState<string>('');
    const [selectedTrans, setselectedTrans] = useState<string>('');
    const [partyCode, setpartyCode] = useState<string>('');
    const [cityCode, setcityCode] = useState<string>('');
    const [placeOfSupply, setPlaceOfSupply] = useState<string>('');
    const [transCode, settransCode] = useState<string>('');
    // const [header, setHeader] = useState<DMSSordHeader[]>([]);
    const [detail, setDetail] = useState<clsSaleOrderItemDetail[]>([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [docId, setdocId] = useState<string>('');
    const [orderDocId, setOrderDocId] = useState<number>(0);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [openConsigneeHelp, setOpenConsigneeHelp] = useState(false);
    const [openPartyHelp, setOpenPartyHelp] = useState(false);
    const [openDeliveryHelp, setOpenDeliveryHelp] = useState(false);
    const [openAddressBookHelp, setOpenAddressBookHelp] = useState(false);
    const [openDelAddressBookHelp, setOpenDelAddressBookHelp] = useState(false);
    const [openPartyAddressBookHelp, setOpenPartyAddressBookHelp] = useState(false);

    const [cities, setCities] = useState<City[]>([]);
    const [enquiryType, setEnquiryType] = useState<EnquiryType[]>([]);
    const [isFetchedCity, setIsFetchedCity] = useState<boolean>(false);
    const [isFetchedCountry, setIsFetchedCountry] = useState<boolean>(false);
    const [isFetchedEnquiryType, setIsFetchedEnquiryType] = useState<boolean>(false);
    const [customerPreEnquiry, setCustomerPreEnquiry] = useState<CustomerPrevEnquiryDetail[]>([]);


    const [gsm, setGsm] = useState<Gsm[]>([]);
    const [item, setItem] = useState<ItemName[]>([]);
    const [packingtype, setPackingType] = useState<Type[]>([]);
    const [cosono, setCosono] = useState<cosno[]>([]);

    const [priceListData, setPriceListData] = useState<PriceDetails>(PriceListinitialFormData);


    const [isFetchedGsm, setisFetchedGsm] = useState<boolean>(false);
    const [isFetchedItem, setisFetchedItem] = useState<boolean>(false);
    const [isFetchedPackingType, setisFetchedPackingType] = useState<boolean>(false);
    const [isFetchedCoSnO, setIsFetchedCoSnO] = useState<boolean>(false);
    const [selectedGsmFrom, setselectedGsmFrom] = useState<string>('');
    const [selectedGsmTo, setselectedGsmTo] = useState<string>('');
    const [selectedItem, setselectedItem] = useState<string>('Select');
    const [selectedPackingType, setselectedPackingType] = useState<string>('Select');
    const [selectedCoSNo, setSelectedCoSNo] = useState<string>('Select');
    const [contractDocId, setContractDocId] = useState<string | undefined>('');
    const [bf, setBf] = useState<Bf[]>([]);
    const [selectedBFFrom, setSelectedBFFrom] = useState<string>('');
    const [selectedBFTo, setSelectedBFTo] = useState<string>('');
    const [isFetchedBf, setIsFetchedBf] = useState<boolean>(false);
    const [filteredItem, setFilteredItem] = useState<SearchFilterListDetails[]>([]);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());



    const [sizeUnit, setsizeUnit] = useState<SizeUnit[]>([]);
    const [coSo, setCoSo] = useState<number>();
    const [isFetchedSizeUnit, setisFetchedSizeUnit] = useState<boolean>(false);
    const [selectedBF, setSelectedBF] = useState<string>('');
    const [selectedSizeUnit, setSelectedSizeUnit] = useState<string>('');
    const [formData, setFormData] = useState<clsSaleOrderItemDetail>(initialFormDataForSale);


    const [saleEnquiryData, setSaleEnquiryData] = useState<AddSaleEnquiry[]>([]);

    const [selectedItemNames, setSelectedItemNames] = useState<string[]>([]);
    const [selectedItemCode, setSelectedItemCode] = useState<string[]>([]);
    const [selectedPriceList, setSelectedPriceList] = useState<string[]>([]);



    const [data, setData] = useState<AddSaleEnquiry[]>([]);
    const [filteredData, setFilteredData] = useState<AddSaleEnquiry[]>([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [StrAsOnDate, setStrAsOnDate,] = useState('')
    const [selectedParty, setSelectedParty] = useState('')
    const [parties, setParties] = useState<PartyDataforSale[]>([]);
    const [selectedClient, setSelectedClient] = useState<AddSaleEnquiry | null>(null);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [checkedClients, setCheckedClients] = useState<Set<number>>(new Set());
    const [clientIdToCheck, setClientIdToCheck] = useState<number | null>(null);
    const [verifiedclientIdToCheck, setVerifiedClientIdToCheck] = useState<string>('');
    const [userVerified, setUserVerified] = useState<string | null>(null);;
    const [isDropdownVisible, setIsDropdownVisible] = useState(true);
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);




    //Order Status

    const [orderdata, setOrderData] = useState<OrderStatusData[]>([]);
    const [verifiedorderdata, setVerifiedOrderData] = useState<VerifiedOrderStatus[]>([]);
    const [ordertrackdata, setOrderTrackData] = useState<OrderTrackData[]>([]);
    const [filteredOrderTrackData, setFilteredOrderTrackData] = useState<OrderTrackData[]>([]);
    const [filteredOrderData, setFilteredOrderData] = useState<OrderStatusData[]>([]);
    const [verifiedfilteredOrderData, setVerifiedFilteredOrderData] = useState<VerifiedOrderStatus[]>([]);
    const [StockData, setStockData,] = useState<StockData[]>([]);
    const [filteredStockData, setFilteredStockData,] = useState<StockData[]>([]);

    const [makeToOrderData, setMakeToOrderData] = useState<MakeToOrderData[]>([]);
    const [filteredmakeToOrderData, setFilteredmakeToOrderData] = useState<MakeToOrderData[]>([]);

    const [financialdata, setFinancialData] = useState<LedgerData[]>([]);
    const [filteredfinancialdata, setFilteredFinancialData] = useState<LedgerData[]>([]);
    const [StrFromDate, setStrFromDate] = useState('')
    const [StrToDate, setStrToDate] = useState('')
    const [selectedClientOrder, setSelectedClientOrder] = useState<OrderStatusData | null>(null);
    const [hold, setHold] = useState<string | null>('')
    const [selectedPendingorder, setSelectedPendingOrder] = useState('Pending')


    const [selectedItemName, setSelectedItemName] = useState('');
    const [selectedGSM, setSelectedGSM] = useState('');
    const [selectedWidth, setSelectedWidth] = useState('');
    const [selectedHeight, setSelectedHeight] = useState('');

    const [items, setItems] = useState<PartyDataforSale[]>([]);
    const [bfs, setBfs] = useState<PartyDataforSale[]>([]);
    const [gsms, setGsms] = useState<PartyDataforSale[]>([]);
    const [widths, setWidths] = useState<PartyDataforSale[]>([]);
    const [heights, setHeights] = useState<PartyDataforSale[]>([]);

    //New Party Request

    const [newPartyRequestData, setNewPartyRequestData] = useState<AddNewPartyInterface[]>([]);

    const [countries, setCountries] = useState<Country[]>([]);

    //Edit Party Request

    const [partyRequestData, setPartyRequestData] = useState<PartyRequestName[]>([]);
    const [partyRequestDataById, setPartyRequestDataById] = useState<PartyRequestByDocIdData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isVChecked, setIsVChecked] = useState<boolean>(false);
    const [strholdRemark, setStrholdRemark] = useState<string>('')



    //Approval Order Status

    const [approvalStatusdata, setApprovalStatusdata] = useState<OrderStatusData[]>([]);
    const [approvalStatusFilteredData, setApprovalStatusFilteredData] = useState<OrderStatusData[]>([]);

    //Approve Order
    const [approveChecked, setApproveChecked] = useState(false);
    const [holdChecked, setHoldChecked] = useState(false);
    const [cancelChecked, setCancelChecked] = useState(false);


    //Account Statement

    const [distributor, SetDistributor] = useState<string>(''); // to track selected distributor
    const [StrReportFor, setStrReportFor] = useState<string>('');
    const [StrBalance, setStrBalance] = useState<string>('');
    const [balanceEntries, setBalanceEntries] = useState<BalanceEntryData[]>([]);
    const [balanceEntriesWithSuccess, setBalanceEntriesWithSuccess] = useState<BalanceEntry>();
    const [totalDebit, setTotalDebit] = useState<number>(0);
    const [totalCredit, setTotalCredit] = useState<number>(0);
    const [totalBalance, setTotalBalance] = useState<number>(0);

    const [status, setStatus] = useState<string>('');
    const [StrConsignee, setStrConsignee] = useState<string>('');
    const [isPriceListApplicable, setIsPriceListApplicable] = useState<number>(0);
    const [isAgreedFilled, setIsAgreedFilled] = useState<boolean>(false);
    const [StrUserCode, setStrUserCode] = useState<string>('');
    const [strClientCode, setstrClientCode] = useState<string>('');
    const [currentOrderStatus, setCurrentOrderStatus] = useState<string>('');
    const [transTypeCat, setTransTypeCat] = useState<string | undefined>('');
    const [vsNo, setVsNo] = useState<number>();

    const [partyAddressBookName, setPartyAddressBookName] = useState<string>('');
    const [partyAddressBookCode, setPartyAddressBookCode] = useState<string>('');

    const [partyAddress1Name, setPartyAddress1Name] = useState<string>('');
    const [partyAddress1Code, setPartyAddress1Code] = useState<string>('');

    const [partyAddress2Name, setPartyAddress2Name] = useState<string>('');
    const [partyAddress2Code, setPartyAddress2Code] = useState<string>('');


    const [clientCode, setClientCode] = useState<string | number | true | object>('');
    const [Site_Code, setSite_Code] = useState<string | number | true | object>('');
    const [LinkCode, setLinkCode] = useState<string | number | true | object>('');
    const [companyid, setCompanyid] = useState<string | number | true | object>('');
    const [username, setUsername] = useState<string | number | true | object>('');
    const [StrToken, setStrToken] = useState<string | number | true | object>('');






    const [PartyDisplayName, setPartyDisplayName] = useState<string | number | true | object>('');
    const [DistributorDisplayName, setDistributorDisplayName] = useState<string | number | true | object>('');
    const [PartyCode, setPartyCode] = useState<string | number | true | object>('');
    const [distributorName, setDistributorName] = useState<string | number | true | object>('');
    const [distributorCode, setdistributorCode] = useState<string | number | true | object>('');
    const [NatureName, setNatureName] = useState<string | number | true | object>('');
    const [role, setrole] = useState<string | number | true | object>('');



    const [bu, setBu] = useState<string | number | true | object>('');







    const [postFormData, setPostFormData] = useState<{
        clsHeader: DMSSordHeader[],
        clsItemDetail: DMSSordItemDetailUpdatePostData[]
    }>({
        clsHeader: [],
        clsItemDetail: []
    });

    return {
        postFormData, setPostFormData,
        currentDate, setCurrentDate,
        docId, setdocId,
        isViewModalOpen, setIsViewModalOpen,
        detail, setDetail,
        // header, setHeader,
        selectedTrans, setselectedTrans,
        transCode, settransCode,
        partyName, setPartyName,
        siteCode, setSiteCode,
        sitename, setSiteName,
        formData, setFormData,
        isModalOpen, setIsModalOpen,
        isPlaced, setIsPlaced,
        totalGrossAmount, setTotalGrossAmount,
        totalAdditionAmount, setTotalAdditionAmount,
        totalAmount, setTotalAmount,
        totalDiscount, setTotalDiscount,
        discount, setdiscount,
        isAddModalActive, setIsAddModalActive,
        isEditModalActive, setIsEditModalActive,
        submittedData, setSubmittedData,
        submissions, setSubmissions,
        detailToPost, setdetailToPost,
        detailToPost2, setdetailToPost2,
        viewDetails, setViewDetails,
        roundOff, setRoundOff,
        netAmount, setNetAmount,
        consignees, setConsignees,
        addressbook, setAddressbook,
        addressbookData, setAddressbookData,
        deladdressbook, setDelAddressbook,
        partyaddressbook, setPartyaddressbook,
        productType, setProductType,
        transaction, setTransaction,
        delivery, setDelivery,
        party, setParty,
        totalCGST, setTotalCGST,
        totalSGST, setTotalSGST,
        totalIGST, setTotalIGST,
        agtForm, setAgtForm,
        isFetchedAgtForm, setIsFetchedAgtForm,
        freighttype, setFreightType,
        salesperson,setSalesPerson,
        contractSales, setcontractSales,
        isFetchedCon, setIsFetchedCon,
        isFetchedAdd, setIsFetchedAdd,
        isFetchedDelAdd, setIsFetchedDelAdd,
        isFetchedPartyAdd, setIsFetchedPartyAdd,
        isFetchedProductType, setisFetchedProductType,
        isFetchedTransaction, setIsFetchedTransaction,
        isFetchedDel, setIsFetchedDel,
        isFetchedParty, setIsFetchedParty,
        isFetchedFreightType, setIsFetchedFreightType,
        isFetchedSalesPerson, setIsFetchedSalesPerson,
        selectedConsignee, setSelectedConsignee,
        selectedProductType, setSelectedProductType,
        selectedProductTypeCode, setSelectedProductTypeCode,
        selectedDelivery, setSelectedDelivery,
        editItem, setEditItem,
        viewItem, setViewItem,
        viewSaleItem, setViewSaleItem,
        viewPendingOrderItem, setViewPendingOrderItem,
        viewOrderStatusItem, setViewOrderStatusItem,
        editIndex, setEditIndex,
        viewIndex, setViewIndex,
        orderDate, setOrderDate,
        deliveryDate, setDeliveryDate,
        deliveryDatePost, setDeliveryDatePost,
        orderDatePost, setOrderDatePost,
        error, setError,
        orderType, setOrderType,
        transactionType, setTransactionType,
        isErrorModalOpen, setIsErrorModalOpen,
        contractSO, setcontractSO,
        isFetchedCOS, setisFetchedCOS,
        orderNumber, setOrderNumber,
        selectedRelatedOrders, setSelectedRelatedOrders,
        partyOrderNo, setPartyOrderNo,
        remarks, setRemarks,
        selectedCity, setSelectedCity,
        selectedEnquiryType, setSelectedEnquiryType,
        partyCode, setpartyCode,
        cityCode, setcityCode,
        placeOfSupply, setPlaceOfSupply,
        openConsigneeHelp, setOpenConsigneeHelp,
        openAddressBookHelp, setOpenAddressBookHelp,
        openDelAddressBookHelp, setOpenDelAddressBookHelp,
        openPartyHelp, setOpenPartyHelp,
        openPartyAddressBookHelp, setOpenPartyAddressBookHelp,
        openDeliveryHelp, setOpenDeliveryHelp,

        cities, setCities,
        enquiryType, setEnquiryType,
        isFetchedCity, setIsFetchedCity,
        isFetchedEnquiryType, setIsFetchedEnquiryType,
        customerPreEnquiry, setCustomerPreEnquiry,

        gsm, setGsm,
        item, setItem,
        packingtype, setPackingType,
        cosono, setCosono,
        isFetchedGsm, setisFetchedGsm,
        isFetchedItem, setisFetchedItem,
        isFetchedPackingType, setisFetchedPackingType,
        selectedPackingType, setselectedPackingType,
        isFetchedCoSnO, setIsFetchedCoSnO,
        selectedGsmFrom, setselectedGsmFrom,
        selectedGsmTo, setselectedGsmTo,
        selectedItem, setselectedItem,
        bf, setBf,
        selectedBFFrom, setSelectedBFFrom,
        selectedBFTo, setSelectedBFTo,
        isFetchedBf, setIsFetchedBf,
        filteredItem, setFilteredItem,
        selectedRows, setSelectedRows,

        sizeUnit, setsizeUnit,
        coSo, setCoSo,
        isFetchedSizeUnit, setisFetchedSizeUnit,
        selectedBF, setSelectedBF,
        selectedSizeUnit, setSelectedSizeUnit,

        saleEnquiryData, setSaleEnquiryData,
        selectedItemNames, setSelectedItemNames,
        selectedItemCode, setSelectedItemCode,
        selectedPriceList, setSelectedPriceList,


        data, setData,
        filteredData, setFilteredData,
        searchTerm, setSearchTerm,
        debouncedSearchTerm, setDebouncedSearchTerm,
        fromDate, setFromDate,
        toDate, setToDate,
        StrAsOnDate, setStrAsOnDate,
        selectedParty, setSelectedParty,
        parties, setParties,
        selectedClient, setSelectedClient,
        isPopupVisible, setPopupVisible,
        isChecked, setChecked,
        checkedClients, setCheckedClients,
        clientIdToCheck, setClientIdToCheck,
        userVerified, setUserVerified,
        isDropdownVisible, setIsDropdownVisible,
        activeCardId, setActiveCardId,
        currentPage, setCurrentPage,

        orderdata, setOrderData,
        filteredOrderData, setFilteredOrderData,
        ordertrackdata, setOrderTrackData,
        filteredOrderTrackData, setFilteredOrderTrackData,
        selectedPendingorder, setSelectedPendingOrder,
        StrFromDate, setStrFromDate,
        StrToDate, setStrToDate,
        selectedClientOrder, setSelectedClientOrder,
        orderDocId, setOrderDocId,
        StockData, setStockData,
        filteredStockData, setFilteredStockData,
        makeToOrderData, setMakeToOrderData,
        filteredmakeToOrderData, setFilteredmakeToOrderData,

        financialdata, setFinancialData,
        filteredfinancialdata, setFilteredFinancialData,
        newPartyRequestData, setNewPartyRequestData,
        countries, setCountries,
        isFetchedCountry, setIsFetchedCountry,

        selectedItemName, setSelectedItemName,
        selectedGSM, setSelectedGSM,
        selectedWidth, setSelectedWidth,
        selectedHeight, setSelectedHeight,

        items, setItems,
        bfs, setBfs,
        gsms, setGsms,
        widths, setWidths,
        heights, setHeights,

        partyRequestData, setPartyRequestData,
        partyRequestDataById, setPartyRequestDataById,
        isLoading, setIsLoading,

        isVChecked, setIsVChecked,
        verifiedorderdata, setVerifiedOrderData,
        verifiedfilteredOrderData, setVerifiedFilteredOrderData,
        verifiedclientIdToCheck, setVerifiedClientIdToCheck,
        hold, setHold,
        strholdRemark, setStrholdRemark,

        approvalStatusdata, setApprovalStatusdata,
        approvalStatusFilteredData, setApprovalStatusFilteredData,
        approveChecked, setApproveChecked,
        holdChecked, setHoldChecked,
        cancelChecked, setCancelChecked,

        distributor, SetDistributor,
        StrReportFor, setStrReportFor,
        StrBalance, setStrBalance,
        balanceEntries, setBalanceEntries,
        balanceEntriesWithSuccess, setBalanceEntriesWithSuccess,
        totalDebit, setTotalDebit,
        totalCredit, setTotalCredit,
        totalBalance, setTotalBalance,
        status, setStatus,
        selectedCoSNo, setSelectedCoSNo,
        contractDocId, setContractDocId,
        StrConsignee, setStrConsignee,
        isPriceListApplicable, setIsPriceListApplicable,
        priceListData, setPriceListData,
        isAgreedFilled, setIsAgreedFilled,

        StrUserCode, setStrUserCode,
        StrToken, setStrToken,
        strClientCode, setstrClientCode,
        freighttypeData, setFreightTypeData,
        currentOrderStatus, setCurrentOrderStatus,
        transTypeCat, setTransTypeCat,
        vsNo, setVsNo,


        clientCode, setClientCode,
        Site_Code, setSite_Code,
        LinkCode, setLinkCode,
        companyid, setCompanyid,
        username, setUsername,


        PartyDisplayName, setPartyDisplayName,
        DistributorDisplayName, setDistributorDisplayName,
        PartyCode, setPartyCode,
        distributorName, setDistributorName,
        distributorCode, setdistributorCode,
        NatureName, setNatureName,
        role, setrole,

        bu, setBu,
        partyAddressBookName, setPartyAddressBookName,
        partyAddressBookCode, setPartyAddressBookCode,
        partyAddress1Name, setPartyAddress1Name,
        partyAddress1Code, setPartyAddress1Code,
        partyAddress2Name, setPartyAddress2Name,
        partyAddress2Code, setPartyAddress2Code,




    };
};
