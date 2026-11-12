'use client'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { FaFileContract} from 'react-icons/fa6'
import { GrDocumentStore } from 'react-icons/gr'
import { useRouter } from 'next/navigation'

interface RPTTitle {
  Title: string
}

const RenderStats = () => {
  // Hardcoded data
  const myData: RPTTitle[] = [
    { Title: 'Stock Report Quantity Based' },
    { Title: 'Stock Report Value Based' },
  ]

  const router = useRouter()

  const getAvatarColor = (title: string) => {
    if (title === 'Stock Report Quantity Based') {
      return { color: '#FFA000', backgroundColor: '#ffe7c0' } // Sales Order Tracking Display color
    }
    if (title === 'Stock Report Value Based') {
      return { color: '#009688', backgroundColor: '#caefec' }
    }
  }

  const getAvatarIcon = (title: string) => {
    switch (title) {
      case 'Stock Report Quantity Based':
        return <GrDocumentStore size={'1.45rem'} />
      case 'Stock Report Value Based':
        return <FaFileContract size={'1.45rem'} />
      default:
        return null
    }
  }

  return myData.map((item: RPTTitle, index: number) => (
    <Grid item xs={12} sm={6} md={6} key={index}>
      {' '}
      {/* Ensure 50% width on all screen sizes */}
      <a
        href='#'
        onClick={e => {
          e.preventDefault()
          if (item.Title === 'Stock Report Quantity Based') {
            router.push(`/reports/stockreportqty`)
          } else if (item.Title === 'Stock Report Value Based') {
            router.push(`/reports/stockreportval`)
          } 
        }}
        style={{ textDecoration: 'none' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '8px',
            boxShadow: 1,
            bgcolor: 'background.paper',
            transition: 'all 0.3s ease',
            '&:hover': { boxShadow: 6, transform: 'scale(1.03)' }
          }}
        >
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 48,
              height: 48,
              boxShadow: 2,
              ...getAvatarColor(item.Title)
            }}
          >
            {getAvatarIcon(item.Title)}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: 'grey' }}>
              {item.Title}
            </Typography>
          </Box>
        </Box>
      </a>
    </Grid>
  ))
}

const StockReports = () => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
      <CardHeader
        title='Stock Report Type: '

        // action={
        //   <IconButton size='small' aria-label='settings' sx={{ color: 'text.secondary' }}>
        //     <BiDotsVerticalRounded />
        //   </IconButton>
        // }
        
        titleTypographyProps={{
          sx: {
            mb: 0,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent>
        <Grid container spacing={3}>
          {RenderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StockReports
