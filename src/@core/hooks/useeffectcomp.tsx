// src/hooks/useFilterData.ts
import { useState, useEffect } from 'react';
import { SubGroupHelp, PurchaseOrderHelp, ItemHelp, ItemGroupHelp, ItemCatHelp, SiteMastHelp, TransactionTypeHelp } from '@/app/action/filteraction';
import { OrderData, PartyData, TypeData } from './interfaces/page';

const useFilterData = () => {
    const [orderNo, setOrderNo] = useState<OrderData[]>([]);
    const [partyName, setPartyName] = useState<PartyData[]>([]);
    const [itemName, setItemName] = useState<TypeData[]>([]);
    const [itemGroup, setItemGroup] = useState<TypeData[]>([]);
    const [itemCategory, setItemCategory] = useState<TypeData[]>([]);
    const [siteName, setSiteName] = useState<TypeData[]>([]);
    const [transactionType, setTransactionType] = useState<TypeData[]>([]);

    useEffect(() => {
        const fetchPartyData = async () => {
            const result = await SubGroupHelp();
            if (result) {
                setPartyName(result);
            }
        };

        const fetchOrderData = async () => {
            const result = await PurchaseOrderHelp();
            if (result) {
                setOrderNo(result);
            }
        };

        const fetchItemData = async () => {
            const result = await ItemHelp();
            if (result) {
                setItemName(result);
            }
        };

        const fetchItemGroupData = async () => {
            const result = await ItemGroupHelp();
            if (result) {
                setItemGroup(result);
            }
        };

        const fetchItemCatData = async () => {
            const result = await ItemCatHelp();
            if (result) {
                setItemCategory(result);
            }
        };

        const fetchSiteData = async () => {
            const result = await SiteMastHelp();
            if (result) {
                setSiteName(result);
            }
        };

        const fetchTransData = async () => {
            const result = await TransactionTypeHelp();
            if (result) {
                setTransactionType(result);
            }
        };

        fetchPartyData();
        fetchOrderData();
        fetchItemData();
        fetchItemGroupData();
        fetchItemCatData();
        fetchSiteData();
        fetchTransData();
    }, []);

    return {
        orderNo,
        partyName,
        itemName,
        itemGroup,
        itemCategory,
        siteName,
        transactionType,
    };
};
export default useFilterData()
