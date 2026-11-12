// React Imports
import type { ReactNode } from 'react'

// Third-party Imports
import classnames from 'classnames'
import { Fab } from '@mui/material'
import { ImArrowUp2 } from 'react-icons/im'

// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import LayoutContent from './components/vertical/LayoutContent'
import ScrollToTop from './components/scroll-to-top/ScrolltoTop'

// Util Imports
import { verticalLayoutClasses } from './utils/layoutClasses'

type VerticalLayoutProps = ChildrenType & {
  navigation?: ReactNode
  navbar?: ReactNode
  footer?: ReactNode
  scrollToTop?: (props?: any) => ReactNode
}

const VerticalLayout = (props: VerticalLayoutProps) => {
  // Props
  const { navbar, footer, navigation, children, scrollToTop } = props

  return (
    <div className={classnames(verticalLayoutClasses.root, 'flex flex-auto')}>
      {navigation || null}
      <div className={classnames(verticalLayoutClasses.contentWrapper, 'flex flex-col min-is-0 is-full')}>
        {navbar || null}
        {/* Content */}
        <LayoutContent>
          {children}
        </LayoutContent>
        {footer || null}

        {/* Scroll to top button */}
        {scrollToTop ? (
          scrollToTop(props)
        ) : (
          <ScrollToTop className='mui-fixed'>
            <Fab color='primary' size='small' aria-label='scroll back to top' sx={{ backgroundColor: '#7367F0' }}>
              <ImArrowUp2 />
            </Fab>
          </ScrollToTop>
        )}
      </div>
    </div>
  )
}

export default VerticalLayout
