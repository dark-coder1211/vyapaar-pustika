'use client'

import { Button, CardContent, CardMedia, Typography } from '@mui/material'
import type { CardProps } from '@mui/material/Card'
import MuiCard from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// ** React Toastify
import { useImageVariant } from '@/@core/hooks/useImageVariant'
import type { Mode } from '@/@core/types'
import { getSiteDet } from '@/app/action/siteMaster'
import Illustrations from '@/components/Illustrations'
import secureLocalStorage from 'react-secure-storage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '70rem' },
  [theme.breakpoints.down('md')]: { display: 'block !important', position: 'relative' }
}))

// Interface definitions
interface Site {
  Site_Code: string
  Site_Name: string
}

const SiteMast = ({ mode }: { mode: Mode }) => {
  const [myData, setMyData] = useState<Site[]>([])
  const [selectedSiteCode, setSelectedSiteCode] = useState<string | null>(null)
  const [selectedSiteName, setSelectedSiteName] = useState<string | null>(null)
  const router = useRouter()
  const secretKey = 'your-secret-key'

  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  useEffect(() => {
    async function fetchData() {
      try {
        const jsonData = await getSiteDet()
        if (jsonData) {
          setMyData(jsonData)

          // Retrieve site code from session storage
          const storedSiteCode =
            typeof window !== 'undefined' ? (secureLocalStorage.getItem('Site_Code') as string | null) : null
          const storedSiteName =
            typeof window !== 'undefined' ? (secureLocalStorage.getItem('Site_Name') as string | null) : null

          setSelectedSiteCode(storedSiteCode)
          setSelectedSiteName(storedSiteName)
          if (storedSiteCode) {
            Cookies.set('Site_Code', storedSiteCode, { expires: 7, path: '' }) // Expires in 7 days
          }
          if (storedSiteName) {
            Cookies.set('Site_Name', storedSiteName, { expires: 7, path: '' }) // Expires in 7 days
          }
        } else {
          throw new Error('Failed to fetch data from the API')
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleBack = () => {
    router.push('/dashboardpage/')
    localStorage.clear()
  }

  const handleChange = (e: any) => {
    if (selectedSiteCode !== null) {
      const siteCode = selectedSiteCode ?? ''
      secureLocalStorage.setItem('Site_Code', siteCode)
      const encryptedSite_Code = CryptoJS.AES.encrypt(e.target.value, secretKey).toString()
      Cookies.set('Site_Code', encryptedSite_Code)
      if (selectedSiteName !== null) {
        secureLocalStorage.setItem('Site_Name', selectedSiteName)
        const encryptedSite_Name = CryptoJS.AES.encrypt(selectedSiteName, secretKey).toString()
        Cookies.set('Site_Name', encryptedSite_Name)
        toast.success('Site changed successfully')
      } else {
        toast.error('Something went wrong !!!')
        console.warn('No site name selected.')
      }
    } else {
      toast.error('Something went wrong !!!')
      console.warn('No site code selected.')
    }
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
        <Card sx={{ zIndex: 1, display: 'flex' }}>
          <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />

          <div>
            <CardMedia
              className='dm-login-img-style'
              component='img'
              sx={{ height: '408px', position: 'relative', objectPosition: 'left', maxWidth: '100%' }}
              image='/images/misc/Site.png'
            />
          </div>

          <div>
            <CardContent sx={{ padding: theme => `${theme.spacing(6, 9, 4)} !important` }}>
              <Typography variant='h4' sx={{ fontWeight: 550, marginBottom: 3 }}>
                Site Master
              </Typography>
              <form>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <RadioGroup
                    aria-labelledby='Site-Master'
                    name='site'
                    value={selectedSiteCode}
                    onChange={e => {
                      setSelectedSiteCode(e.target.value)
                      const selectedSite = myData.find(item => item.Site_Code === e.target.value)
                      setSelectedSiteName(selectedSite ? selectedSite.Site_Name : '')
                    }}
                  >
                    {myData.map(item => (
                      <FormControlLabel
                        key={item.Site_Code}
                        value={item.Site_Code}
                        control={<Radio />}
                        label={item.Site_Name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <br />

                <Button
                  size='small'
                  variant='contained'
                  sx={{ backgroundColor: '#7367F0', marginRight: 2 }}
                  onClick={handleChange}
                >
                  Change
                </Button>
                <Button size='small' variant='contained' sx={{ backgroundColor: '#FFA000' }} onClick={handleBack}>
                  Go to Dashboard
                </Button>
              </form>
            </CardContent>
          </div>
        </Card>
        <Illustrations maskImg={{ src: authBackground }} />
      </div>
    </>
  )
}

export default SiteMast
