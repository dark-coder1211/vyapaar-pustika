"use client"

// MUI Imports
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CardMedia, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import type { CardProps } from '@mui/material/Card'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '50rem' },
  [theme.breakpoints.down('md')]: { position: 'relative' }
}));

const DashboardAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the login page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/login/')
    }, 3000) // Adjust the time as needed

    return () => clearTimeout(timer) // Cleanup the timer on component unmount
  }, [router])

  return (
    <Grid sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', mt: '60px' }}>
      <Card sx={{ zIndex: 1, display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
        <CardMedia
          className='dm-login-img-style'
          component='img'
          sx={{ position: 'relative', objectPosition: 'center', maxWidth: '100%' }}
          image='/PaperBIz.png'
        />
      </Card>
    </Grid>
  )
}

export default DashboardAnalytics
