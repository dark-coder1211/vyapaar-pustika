import React from 'react'

interface PopupProps {
  isOpen: boolean
  togglePopup: () => void
}

const POPrmDetailsComp: React.FC<PopupProps> = ({ isOpen, togglePopup }) => {
  // Dummy Data for the table
  const tableData = [
    {
      parameter: 'Parameter 1',
      defaultValue: 'Default 1',
      requiredValue: 'Required 1'
    }
  ]

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full mx-4 sm:mx-0'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg sm:text-xl md:text-xl font-semibold text-gray-700'>Parameter</h2>
              <button onClick={togglePopup} className='text-gray-500 hover:text-gray-700 text-2xl'>
                &times;
              </button>
            </div>

            <div className='overflow-x-auto'>
              <div className='block sm:hidden'>
                {/* Mobile view */}
                {tableData.map((row, index) => (
                  <div key={index} className='border-b border-gray-300 mb-4'>
                    <div className='flex justify-between text-sm font-medium text-gray-700'>
                      <div className='w-1/2'>S.No:</div>
                      <div className='w-1/2'>{index + 1}</div>
                    </div>
                    <div className='flex justify-between text-sm font-medium text-gray-700'>
                      <div className='w-1/2'>Parameter:</div>
                      <div className='w-1/2'>{row.parameter}</div>
                    </div>
                    <div className='flex justify-between text-sm font-medium text-gray-700'>
                      <div className='w-1/2'>Default Value:</div>
                      <div className='w-1/2'>{row.defaultValue}</div>
                    </div>
                    <div className='flex justify-between text-sm font-medium text-gray-700'>
                      <div className='w-1/2'>Required Value:</div>
                      <div className='w-1/2'>{row.requiredValue}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='hidden sm:block'>
                {/* Desktop view */}
                <table className='min-w-full border-collapse text-xs sm:text-sm md:text-base'>
                  <thead>
                    <tr className='bg-gray-100'>
                      <th className='border px-4 py-2 text-sm text-left'>S.No.</th>
                      <th className='border px-4 py-2 text-sm text-left'>Parameter</th>
                      <th className='border px-4 py-2 text-sm text-left'>Default Value</th>
                      <th className='border px-4 py-2 text-sm text-left'>Required Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index} className='border-b'>
                        <td className='px-4 py-2 text-sm'>{index + 1}</td>
                        <td className='px-4 py-2 text-sm'>{row.parameter}</td>
                        <td className='px-4 py-2 text-sm'>{row.defaultValue}</td>
                        <td className='px-4 py-2 text-sm'>{row.requiredValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='flex justify-end mt-4 space-x-4'>
              <button
                onClick={togglePopup}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out text-xs sm:text-sm md:text-base'
              >
                OK
              </button>
              <button
                onClick={togglePopup}
                className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300 ease-in-out text-xs sm:text-sm md:text-base'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default POPrmDetailsComp
