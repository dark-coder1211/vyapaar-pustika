
import { useTheme } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import { Menu, MenuItem, MenuSection } from '@menu/vertical-menu'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { BsBank2 } from 'react-icons/bs'
import { BiTrendingUp } from 'react-icons/bi'
import { FaBookOpenReader, FaCartArrowDown, FaCity, FaStore } from 'react-icons/fa6'
import { CgAttachment } from 'react-icons/cg'
import { MdSystemSecurityUpdateGood } from 'react-icons/md'
import { TbLayoutDashboardFilled } from 'react-icons/tb'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: { scrollMenu: (container: any, isPerfectScrollbar: boolean) => void }) => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: container => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: container => scrollMenu(container, true)
        })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <MenuSection label='BSA'>
          <MenuItem href='/home/' icon={<TbLayoutDashboardFilled size={'1.50rem'} />} >
            Dashboard
          </MenuItem>
          <MenuItem href='/finance/' icon={<BsBank2 size={'1.25rem'} />} >
            Finance
          </MenuItem>
          <MenuItem href='/sale' icon={<BiTrendingUp size={'1.25rem'} />} >
            Sale
          </MenuItem>
          <MenuItem href='/purchase ' icon={<FaCartArrowDown size={'1.25rem'} />} >
            Purchase
          </MenuItem>
          <MenuItem href='/production ' icon={<FaCity size={'1.25rem'} />} >
            Production
          </MenuItem>
          <MenuItem href='/inventory ' icon={<FaStore size={'1.25rem'} />}>
            Inventory
          </MenuItem>
          <MenuItem href='/task ' icon={<FaBookOpenReader size={'1.25rem'} />}>
            Task
          </MenuItem>
          <MenuItem href='/attachment' icon={<CgAttachment size={'1.25rem'} />}>
            Attachment
          </MenuItem>
          <MenuItem href='/approvalView' icon={<MdSystemSecurityUpdateGood size={'1.25rem'} />}>
            Approval View
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
