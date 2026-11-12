// Type Imports
import type { ChildrenType } from '@core/types'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
// import Navigation from '@components/layout/vertical/Navigation'
import Providers from '@components/Providers'
import VerticalFooter from '@components/layout/vertical/Footer'
import Navbar from '@components/layout/vertical/Navbar'

const Layout = async ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout navbar={<Navbar />} footer={<VerticalFooter />}>  {/* navigation={<Navigation />} */}
            {children}
          </VerticalLayout>
        }
      />
    </Providers>
  )
}

export default Layout
