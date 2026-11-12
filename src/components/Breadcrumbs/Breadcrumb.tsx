'use client'

interface BreadcrumbProps {
  pageName?: string
}
import { MdExitToApp } from 'react-icons/md'
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className=' mb-2 mt-1 flex flex-row gap-3 sm:flex-row sm:items-center justify-between rounded-lg shadow-lg shadow-blue-500/50'>
      {/* ITEM 1 - Show only on mobile */}
      <h2 className='text-title-md2 font-medium text-blue-400 '>{pageName}</h2>

      {/* ITEM 2 */}
      <div onClick={() => window.history.back()} className='rotate-180 text-blue-400  cursor-pointer'>
        <MdExitToApp size={25} />
      </div>
    </div>
  )
}

export default Breadcrumb
