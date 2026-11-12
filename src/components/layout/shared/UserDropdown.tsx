'use client'

// ** React Imports
import Cookies from 'js-cookie'
import type { SyntheticEvent } from 'react'
import { Fragment, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/navigation'

// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import { BiCog } from "react-icons/bi"
import { PiMapPinAreaFill } from "react-icons/pi"
import { RiLogoutBoxRLine } from "react-icons/ri"
import secureLocalStorage from 'react-secure-storage'


// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const cleanKey = (key: any) => {
    return key.replace('@secure.s.', '')
  }

  const handleLogout = (url?: string) => {
    if (url) {
      router.push(url)
      sessionStorage.clear()

      // Iterating in reverse to avoid indexing issues during removal
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i)
        const cleanedKey = cleanKey(key)
        if (key !== null && key !== '@secure.s.ClientCode' && key !== '@secure.s.UserName') {
          localStorage.removeItem(key)
          secureLocalStorage.removeItem(cleanedKey)
        }
      }

      // Loop through all cookies and remove them
      Object.keys(Cookies.get()).forEach(cookieName => {
        Cookies.remove(cookieName)
      })
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal'
  }

  const username: string = typeof window !== 'undefined' ? (secureLocalStorage.getItem('UserName') as string) || '' : ''
  const site_name: string =
    typeof window !== 'undefined' ? (secureLocalStorage.getItem('Site_Name') as string) || '' : ''

  // const username = getCookie('UserName');
  // const site_name = getCookie('Site_Name');

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt='PaperBiz'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40, color: '#7367F0', backgroundColor: '#d6d1ff' }}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar sx={{ width: '2.5rem', height: '2.5rem', color: '#7367F0', backgroundColor: '#d6d1ff' }} />
            </Badge>

            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>PaperBIz</Typography>
              <Typography variant='body1' sx={{ fontWeight: 600, color: '#7367F0' }}>
                {username ? username.toUpperCase() : ''}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />

        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/siteMaster/')}>
          <Box sx={styles}>
            <PiMapPinAreaFill color='#1e90ff' className='mr-2' />
            {site_name}
          </Box>
        </MenuItem>
        {(username.toUpperCase() === 'SA' || username.toUpperCase() === 'SUPER') && (
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/UserPanel/')}>
            <Box sx={styles}>
              <BiCog color='#009688' className='mr-2' />
              User Control Panel
            </Box>
          </MenuItem>
        )}

        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleLogout('/login/')}>
          <RiLogoutBoxRLine fontSize='1.375rem' color='#EF5350' className='mr-2' />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
