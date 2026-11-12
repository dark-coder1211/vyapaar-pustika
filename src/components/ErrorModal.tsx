"use client";

import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ErrorModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-40 flex items-center justify-center p-4 ">
            <div className="bg-blue-400 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black rounded-lg shadow-xl transition-transform transform duration-300 scale-95 hover:scale-100 max-w-sm w-full p-4">
                <div className="flex justify-between items-start text-white">
                    <h2 className="text-lg font-bold">
                        Warning
                    </h2>
                    {/* <button onClick={onClose} className="bg-red-200 bg-opacity-30 hover:bg-opacity-40 rounded-full p-1.5 ml-auto inline-flex items-center" aria-label="close">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button> */}
                </div>
                <div className="mt-4 mb-6 ">
                    <p className="text-sm font-extrabold">
                        {children}
                    </p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-white bg-blue-300 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;

