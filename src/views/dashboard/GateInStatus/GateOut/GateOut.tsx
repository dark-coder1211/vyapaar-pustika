'use client'

import { useEffect, useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Loading from '@/components/Loading'
import { useRouter } from 'next/navigation'
import { useParams } from '@/context/paramcontext'
import type { GateInU } from '@/components/interfaces/page'
import { GateInAction } from '@/app/action/gateinaction'
import Image from 'next/image'
import truck1 from '@/views/Images/truck1.png'
import truck2 from '@/views/Images/truck2.png'

interface Entry {
  Category: string
  NoOfEntries: number
}

interface DataInterface {
  LoadUn: string
  GateOutDate: string
}

interface RenderStatsProps {
  onTotalChange: (total: number) => void
}

const RenderStats = ({ onTotalChange }: RenderStatsProps) => {
  const [loading, setLoading] = useState(true)
  const [myData, setMyData] = useState<Entry[]>([])
  const router = useRouter()
  const { Site_Code, companyid, UserName, bu } = useParams()

  // Default categories to always display
  const defaultCategories: Entry[] = [
    { Category: 'GATEINL', NoOfEntries: 0 },
    { Category: 'GATEINU', NoOfEntries: 0 }
  ]

  useEffect(() => {
    setMyData(defaultCategories)
  }, [])

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await GetNoOfEntries(Site_Code as string, companyid as string, UserName as string, bu as string)
  //       if (result) {
  //         // Merge result with defaults (preserve order and fill missing with 0)
  //         console.log('result', result)

  //         const mergedData = defaultCategories.map(defaultItem => {
  //           const match = result.find((item: Entry) => item.Category === defaultItem.Category)
  //           return match ? match : defaultItem
  //         })
  //         setMyData(mergedData)
  //       } else {
  //         setMyData(defaultCategories)
  //       }
  //       setLoading(false)
  //     }
  //     if (Site_Code && companyid && UserName) fetchData()
  //   }, [Site_Code, companyid, UserName])

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date()


      const filters: GateInU = {
        FromDate: today.toISOString().split('T')[0],
        ToDate: today.toISOString().split('T')[0]
      }

      const result = await GateInAction(
        filters,
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )

      if (result && Array.isArray(result.data)) {
        // const tot = result.data.length
        // onTotalChange(tot)

        const tot = result.data.filter((r: DataInterface) => r.GateOutDate !== null).length
        onTotalChange(tot)

        const lData = result.data.filter((r: DataInterface) => r.LoadUn === 'Loading' && r.GateOutDate !== null).length
        const ulData = tot - lData

        setMyData([
          { Category: 'GATEINL', NoOfEntries: lData },
          { Category: 'GATEINU', NoOfEntries: ulData }
        ])
      } else {
        setMyData(defaultCategories)
      }

      setLoading(false)
    }

    if (Site_Code && companyid && UserName) fetchData()
  }, [Site_Code, companyid, UserName])

  if (loading) return <Loading />

  const getAvatarColor = (category: string) => {
    switch (category) {
      case 'GATEINL':
        return { color: '#DC2626' }
      case 'GATEINU':
        return { color: '#009688' }
      default:
        return {}
    }
  }

  const getAvatarIcon = (category: string) => {
    switch (category) {
      case 'GATEINL':
        return <Image src={truck1} alt='Loading' width={35} height={35} />
      case 'GATEINU':
        return <Image src={truck2} alt='Loading' width={35} height={35} />
      default:
        return null
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'GATEINL':
        return 'Loading'
      case 'GATEINU':
        return 'Unloading'
      default:
        return 'Unknown'
    }
  }

  return (
    <Grid container spacing={3}>
      {myData.map((item, index) => (
        <Grid item xs={6} sm={6} md={6} key={index}>
          <a
            href='#'
            onClick={e => {
              e.preventDefault()
              switch (item.Category) {
                // case 'IND': router.push(`/entrypoint/indent/indentlist`); break
                case 'GATEINL':
                  router.push(`/reports/gateoutreport/?Load=L`)
                  break
                case 'GATEINU':
                  router.push(`/reports/gateoutreport/?Load=U`)
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
                borderRadius: '8px',
                boxShadow: 1,
                bgcolor: 'background.paper',
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: 6, transform: 'scale(1.03)' }
              }}
            >
              <Avatar
                variant='rounded'
                sx={{ mr: 3, width: 48, height: 48, boxShadow: 2, ...getAvatarColor(item.Category) }}
              >
                {getAvatarIcon(item.Category)}
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', fontWeight: 'bold', color: 'grey' }}>
                  {getCategoryLabel(item.Category)}
                </Typography>
                <Typography variant='h6' sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
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

const GateOut = () => {
  const [total, setTotal] = useState(0)
  const router = useRouter()
  return (
    <Card>
      <CardHeader
        title={<Typography
            component='span'
            variant='h5'
            onClick={() => router.push('/reports/gateoutreport')}
            sx={{
              cursor: 'pointer',
              mb: 0,
              lineHeight: '2rem !important',
              letterSpacing: '0.15px !important',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {`Today Gate Out : ${total}`}
          </Typography>}

        // action={
        //   <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
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
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        <Grid container spacing={[2, 0]}>
          <RenderStats onTotalChange={setTotal} />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default GateOut
