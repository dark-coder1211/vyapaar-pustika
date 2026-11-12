"use client";

import React from 'react';

interface ConfirmationPopupProps {
  isVisible: boolean;
  onConfirm: () => void;
}

const ApprovedPopup: React.FC<ConfirmationPopupProps> = ({ isVisible, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out forwards;
          }

          @keyframes scaleUp {
            0% {
              transform: scale(0.95);
            }
            100% {
              transform: scale(1);
            }
          }

          .animate-scaleUp {
            animation: scaleUp 0.3s ease-out forwards;
          }
        `}
      </style>

      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 animate-fadeIn">
        <div className="bg-white dark:border-strokedark dark:bg-boxdark p-6 rounded-lg shadow-lg max-w-sm md:w-full transform scale-95 animate-scaleUp">
          <h2 className="text-lg font-medium text-gray-600 text-center mb-2">This order has been approved, You cannot edit this record.</h2>
          {/* <h2 className="text-lg font-medium text-gray-600 text-center">You cannot edit this record.</h2> */}

          <div className="flex justify-center">
            <button
              onClick={onConfirm}
              className="bg-blue-400 text-white px-2 md:px-4 font-semibold py-1 rounded-md hover:bg-blue-700 transition duration-200 mr-2"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovedPopup;
