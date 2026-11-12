'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

type ParamContextType = {
    Site_Code: string | null;
    companyid: string | null;
    UserName: string | null;
    bu: string | null;
    loading: boolean;
};

const ParamContext = createContext<ParamContextType | undefined>(undefined);

const secretKey = 'your-secret-key'; // Make sure this matches encryption key exactly

/**
 * Decrypts a cookie value if it's encrypted with CryptoJS AES.
 * Returns the decrypted string, or the raw value if it is not encrypted.
 */
const decryptCookie = (cookieValue: string | undefined): string | null => {
    if (!cookieValue) return null;

    // CryptoJS encrypted strings start with this prefix by default
    const CRYPTO_PREFIX = 'U2FsdGVkX1';

    if (!cookieValue.startsWith(CRYPTO_PREFIX)) {
        // Probably not encrypted, return raw value to avoid decryption error
        return cookieValue;
    }

    try {
        const bytes = CryptoJS.AES.decrypt(cookieValue, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted || null;
    } catch (err) {
        console.error('Decryption error:', err);
        return null;
    }
};

export const ParamProvider = ({ children }: { children: React.ReactNode }) => {
    const [Site_Code, setSite_Code] = useState<string | null>(null);
    const [companyid, setCompanyId] = useState<string | null>(null);
    const [UserName, setUsername] = useState<string | null>(null);
    const [bu, setBu] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setDecrypted = () => {
            setSite_Code(decryptCookie(Cookies.get('Site_Code')));
            setCompanyId(decryptCookie(Cookies.get('Comp_Code')));
            setUsername(decryptCookie(Cookies.get('username')));
            setBu(decryptCookie(Cookies.get('BaseURL')));
            setLoading(false);
        };

        setDecrypted();
    }, []);

    return (
        <ParamContext.Provider value={{ Site_Code, companyid, UserName, bu, loading }}>
            {children}
        </ParamContext.Provider>
    );
};

export const useParams = () => {
    const context = useContext(ParamContext);
    if (!context) {
        throw new Error('useParams must be used within a ParamProvider');
    }
    return context;
};
