'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'

// MUI Imports
import { CardContent } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'

// Icons Imports
import { FaCity } from 'react-icons/fa6'

import { useImageVariant } from '@/@core/hooks/useImageVariant'
import type { Mode } from '@/@core/types'
import { fetchDataAction, fetchSiteDataAction, fetchUserPermissionAction } from '@/app/action/companyAction'
import Illustrations from '@/components/Illustrations'
import CryptoJS from 'crypto-js'

// Interface definitions
interface Company {
  Comp_Code: string
  Comp_Name: string
  CYear: string
}

interface Site {
  Site_Code: string
  Site_Name: string
}

const Company = ({ mode }: { mode: Mode }) => {
  const router = useRouter()
  const [myData, setMyData] = useState<Company[]>([])
  const [myToken, setMyToken] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const secretKey = 'your-secret-key'

  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchDataAction()

        if (response) {
          const jsonData = await response
          setMyData(jsonData.CompanyDetails)
          setMyToken(jsonData.Token)
        } else {
          throw new Error('Failed to fetch data from the API')
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  async function fetchSite(companyid: string) {
    try {
      const resSite = await fetchSiteDataAction(companyid)
      if (resSite) {
        const jsonData: Site[] = await resSite

        if (jsonData.length > 0) {
          const firstSite = jsonData[0]
          secureLocalStorage.setItem('Site_Code', firstSite.Site_Code)
          const encryptedSite_Code = CryptoJS.AES.encrypt(firstSite.Site_Code, secretKey).toString()
          Cookies.set('Site_Code', encryptedSite_Code)
          console.log('Site_Code', encryptedSite_Code)
          secureLocalStorage.setItem('Site_Name', firstSite.Site_Name)
          const encryptedSite_Name = CryptoJS.AES.encrypt(firstSite.Site_Name, secretKey).toString()
          Cookies.set('Site_Name', encryptedSite_Name)
        } else {
          console.warn('Unauthorized')
        }
      } else {
        throw new Error('Failed to fetch data from the API')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserPermissions = async () => {
    const UserName = secureLocalStorage.getItem('UserName')
    try {
      const response = await fetchUserPermissionAction(UserName)
      const data = await response

      // Assuming data[0] contains the permission object
      const userPermissions = data[0]

      // Check if the values of all specified permissions are 0
      const hasNoPermissions =
        userPermissions.Finance === 0 &&
        userPermissions.Sale === 0 &&
        userPermissions.Purchase === 0 &&
        userPermissions.Production === 0 &&
        userPermissions.Inventory === 0 &&
        userPermissions.Task === 0 &&
        userPermissions.Attachment === 0 &&
        userPermissions.Approval === 0

      if (hasNoPermissions) {
        // Show the dialog with the unauthorized message
        setOpenDialog(true)
      } else {
        // Process user permissions as usual
        secureLocalStorage.setItem('Finance', userPermissions.Finance)
        secureLocalStorage.setItem('Sale', userPermissions.Sale)
        secureLocalStorage.setItem('Purchase', userPermissions.Purchase)
        secureLocalStorage.setItem('Production', userPermissions.Production)
        secureLocalStorage.setItem('Inventory', userPermissions.Inventory)
        secureLocalStorage.setItem('Task', userPermissions.Task)
        secureLocalStorage.setItem('Attachment', userPermissions.Attachment)
        secureLocalStorage.setItem('Approval', userPermissions.Approval)

        // Also, store them in Cookies
        Cookies.set('Finance', userPermissions.Finance)
        Cookies.set('Sale', userPermissions.Sale)
        Cookies.set('Purchase', userPermissions.Purchase)
        Cookies.set('Production', userPermissions.Production)
        Cookies.set('Inventory', userPermissions.Inventory)
        Cookies.set('Task', userPermissions.Task)
        Cookies.set('Attachment', userPermissions.Attachment)
        Cookies.set('Approval', userPermissions.Approval)
        router.push('/dashboardpage/')
      }
    } catch (error) {
      console.error('Error fetching user permissions:', error)
    }
  }

  const cleanKey = (key: any) => {
    return key.replace('@secure.s.', '')
  }

  const handleCloseDialog = (url?: string) => {
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
  }

  const saveCompanyDetailsInSession = (selectedCompany: Company) => {
    if (openDialog) {
      return // Stop the routing if the dialog is open
    }
    if (typeof window !== 'undefined') {
      secureLocalStorage.setItem('tokenComp', myToken)
      const encryptedtokenComp = CryptoJS.AES.encrypt(myToken, secretKey).toString()
      Cookies.set('tokenComp', encryptedtokenComp)

      secureLocalStorage.setItem('Comp_Code', selectedCompany.Comp_Code)
      const encryptedComp_Code = CryptoJS.AES.encrypt(selectedCompany.Comp_Code, secretKey).toString()
      Cookies.set('Comp_Code', encryptedComp_Code)

      secureLocalStorage.setItem('Comp_Name', selectedCompany.Comp_Name)
      const encryptedComp_Name = CryptoJS.AES.encrypt(selectedCompany.Comp_Name, secretKey).toString()
      Cookies.set('Comp_Name', encryptedComp_Name)

      secureLocalStorage.setItem('V_Prifix', selectedCompany.CYear)
      const encryptedV_Prifix = CryptoJS.AES.encrypt(selectedCompany.CYear, secretKey).toString()
      Cookies.set('V_Prifix', encryptedV_Prifix)

      // Cookies.set('prevPath', pathname);
      router.push('/siteMaster')
      console.log('siteMaster')
    }
    fetchSite(selectedCompany.Comp_Code)
    fetchUserPermissions()
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Box className='content-center'>
        <Card sx={{ zIndex: 1, bgcolor: '#d6d1ff', borderRadius: 8 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 6, 7)} !important` }}>
            <Typography variant='h4' mb={4}>
              Company Details
            </Typography>
            <Grid container spacing={3}>
              {myData &&
                myData.map((row: Company) => (
                  <Grid item xs={12} md={6} lg={4} key={row.Comp_Code}>
                    <Card>
                      <Box p={1} onClick={() => saveCompanyDetailsInSession(row)} style={{ cursor: 'pointer' }}>
                        <Box display='flex' alignItems='center' mb={2}>
                          <Avatar
                            variant='rounded'
                            sx={{
                              mr: 2,
                              width: 40,
                              height: 40,
                              boxShadow: 3,
                              color: 'common.white',
                              backgroundColor: '#7367F0'
                            }}
                          >
                            <FaCity size={'1.75rem'} />
                          </Avatar>
                          <Box>
                            <Typography variant='h6' fontWeight={600}>
                              {row.Comp_Name}
                            </Typography>
                            <Typography variant='subtitle1' fontWeight={500}>
                              {row.CYear}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Illustrations maskImg={{ src: authBackground }} />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <Typography>You are not an authorized person !!</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ backgroundColor: '#EF5350', fontSize: '11px', fontWeight: 'bold' }}
            variant='contained'
            onClick={() => handleCloseDialog('/login/')}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Company
