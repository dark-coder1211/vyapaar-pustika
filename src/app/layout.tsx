// app/layout.tsx

// import NProgressHandler from '@/components/NProgressHandler'
import Providers from '@/components/Providers'


// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'BSA | PaperBiz',
  description: 'Business Static Application.',
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        {/* <NProgressHandler /> */}
        <Providers children={children} direction={'rtl'} />
      </body>
    </html>
  )
}

export default RootLayout
