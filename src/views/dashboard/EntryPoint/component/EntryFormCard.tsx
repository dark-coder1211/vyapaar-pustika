'use client'

import { useEffect, useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import {
  FaFileCode,
  FaFileLines,
  FaClipboardList,
  FaClipboardCheck,
  FaTruckFast,
  FaTruckRampBox
} from 'react-icons/fa6'

import Loading from '@/components/Loading'
import { useRouter } from 'next/navigation'
import { GetNoOfEntries } from '@/app/action/homeAction'
import { useParams } from '@/context/paramcontext'
import { GiEntryDoor } from 'react-icons/gi'
import { PiInvoiceFill } from 'react-icons/pi'
import { BsFillDoorOpenFill } from 'react-icons/bs' // Visitor Icons
import { GrLogout } from 'react-icons/gr'
import { GoFileSymlinkFile } from 'react-icons/go'

interface Entry {
  Category: string
  NoOfEntries: number
}

const RenderStats = () => {
  const [loading, setLoading] = useState(true)
  const [myData, setMyData] = useState<Entry[]>([])
  const router = useRouter()
  const { Site_Code, companyid, UserName, bu } = useParams()

  // Default categories to always display
  const defaultCategories: Entry[] = [
    { Category: 'IND', NoOfEntries: 0 },
    { Category: 'PORD', NoOfEntries: 0 },
    { Category: 'SORD', NoOfEntries: 0 },
    { Category: 'REQ', NoOfEntries: 0 },
    { Category: 'ORDT', NoOfEntries: 0 },
    { Category: 'ISU', NoOfEntries: 0 },
    { Category: 'VGP', NoOfEntries: 0 },
    { Category: 'VGO', NoOfEntries: 0 },
    { Category: 'GATEIN', NoOfEntries: 0 },
    { Category: 'GATEOUT', NoOfEntries: 0 },
    { Category: 'UNL', NoOfEntries: 0 }
  ]

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetNoOfEntries(Site_Code as string, companyid as string, UserName as string, bu as string)
      if (result) {
        // Merge result with defaults (preserve order and fill missing with 0)
        // console.log('result', result)

        const mergedData = defaultCategories.map(defaultItem => {
          const match = result.find((item: Entry) => item.Category === defaultItem.Category)
          return match ? match : defaultItem
        })
        setMyData(mergedData)
      } else {
        setMyData(defaultCategories)
      }
      setLoading(false)
    }
    // if (Site_Code && companyid && UserName) 
      fetchData()
  }, [])
  // }, [Site_Code, companyid, UserName])

  if (loading) return <Loading />

  const getAvatarColor = (category: string) => {
    switch (category) {
      case 'IND':
        return { color: '#FFA000', backgroundColor: '#FFF7EB' }
      case 'PORD':
        return { color: '#009688', backgroundColor: '#caefec' }
      case 'SORD':
        return { color: '#1976D2', backgroundColor: '#bbdefb' }
      case 'REQ':
        return { color: '#8BC34A', backgroundColor: '#e8f5e9' }
      case 'ORDT':
        return { color: 'red', backgroundColor: '#fffff' }
      case 'ISU':
        return { color: '#DA2F43', backgroundColor: '#FFE3D6' }
      case 'VGP':
        return { color: '#B23A48', backgroundColor: '#F4D1D1' }
      case 'VGO':
        return { color: '#000000', backgroundColor: '#F3EFE0' }
      case 'GATEIN':
        return { color: '#1E3231', backgroundColor: '#FDEDF1' }
      case 'GATEOUT':
        return { color: '#584B53', backgroundColor: '#EACAAE' }
      case 'UNL':
        return { color: '#007DA3', backgroundColor: '#FEBE5D' }

      default:
        return {}
    }
  }

  const getAvatarIcon = (category: string) => {
    switch (category) {
      case 'IND':
        return <FaFileLines size={'1.45rem'} />
      case 'PORD':
        return <FaFileCode size={'1.45rem'} />
      case 'SORD':
        return <FaClipboardList size={'1.45rem'} />
      case 'REQ':
        return <FaClipboardCheck size={'1.45rem'} />
      case 'ORDT':
        return <FaTruckFast size={'1.45rem'} />
      case 'ISU':
        return <PiInvoiceFill size={'1.45rem'} />
      case 'VGP':
        return <BsFillDoorOpenFill size={'1.45rem'} />
      case 'VGO':
        return <GiEntryDoor size={'1.45rem'} />
      case 'GATEIN':
        return <GoFileSymlinkFile size={'1.5rem'} />
      case 'GATEOUT':
        return <GrLogout size={'1.45rem'} />
      case 'UNL':
        return <FaTruckRampBox size={'1.45rem'} />
      default:
        return null
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'IND':
        return 'Indent'
      case 'PORD':
        return 'Purchase Order'
      case 'SORD':
        return 'Sale Order'
      case 'REQ':
        return 'Requisition'
      case 'ORDT':
        return 'Order Transfer'
      case 'ISU':
        return 'Stock Issue'
      case 'VGP':
        return 'Visitor Gate In'
      case 'VGO':
        return 'Visitor Gate Out'
      case 'GATEIN':
        return 'Gate In List'
      case 'GATEOUT':
        return 'Gate Out List'
      case 'UNL':
        return 'Unloading'
      default:
        return 'Unknown'
    }
  }

  return (
    <Grid container spacing={3}>
      {myData.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <a
            href='#'
            onClick={e => {
              e.preventDefault()
              switch (item.Category) {
                case 'IND':
                  router.push(`/indentList`)
                  break
                case 'PORD':
                  router.push(`/purchaseOrderList`)
                  break
                case 'SORD':
                  router.push(`/saleorderentrylist`)
                  break
                case 'REQ':
                  router.push(`/reqList`)
                  break
                case 'ORDT':
                  router.push('/orderTransferEntry')
                  break
                case 'ISU':
                  router.push('/stockissueList')
                  break
                case 'VGP':
                  router.push('/visitorGateInList')
                  break
                case 'VGO':
                  router.push('/visitorGateOutList')
                  break
                case 'GATEIN':
                  router.push('/gateInList')
                  break
                case 'GATEOUT':
                  router.push('/gateOutList')
                  break
                case 'UNL':
                  router.push('/unloadList')
                  break
              }
            }}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                borderRadius: '50px',
                boxShadow: 3,
                bgcolor: '#F7CBCA',
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
                  ...getAvatarColor(item.Category),
                  borderRadius: '50%'
                }}
              >
                {getAvatarIcon(item.Category)}
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', color: '#373F47' }}>
                  {getCategoryLabel(item.Category)}
                </Typography>
                <Typography variant='h6' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {item.NoOfEntries}
                </Typography>
              </Box>
            </Box>
          </a>
        </Grid>
      ))}
    </Grid>
  )
}

const EntryFormCard = () => {
  return (
    <Card sx={{ backgroundColor: '#FCF9ED' }}>
      <CardHeader
        title='Entry Points'

        // action={
        //   <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
        //     <BiDotsVerticalRounded />
        //   </IconButton>
        // }
        
        titleTypographyProps={{
          sx: {
            // textDecoration: 'underline',
            fontWeight: 'bold',
            color: '#373F47',
            mb: 0,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        <Grid container spacing={[2, 0]}>
          {RenderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EntryFormCard
