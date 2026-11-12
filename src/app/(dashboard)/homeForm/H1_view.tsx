'use client'

import { Box, Card, CardContent, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaWpforms } from 'react-icons/fa6'
import CustomCard from './CustomCard_view'
import Loading from '@/components/Loading'
import { LocalCurrency, userPermission } from './homeform_action'
import secureLocalStorage from 'react-secure-storage'
import { TbReport } from 'react-icons/tb'
import type { CardData, CardPermissions } from './homeForm_modal'
import { useParams } from '@/context/paramcontext'

const { Site_Code, companyid } = useParams()
const cardData: CardData[] = [
  {
    key: 'Entries',
    stats: '',
    icon: <FaWpforms size={'1.25rem'} />,
    title: 'Transactions',
    subtitle: ``,
    BGColor: '#14b8a6',
    unit: '',
    link: '/entrypoint/'
  },
  {
    key: 'Reports',
    stats: '',
    icon: <TbReport size={'1.25rem'} />,
    title: 'Reports',
    subtitle: ``,
    BGColor: '#854d0e',
    unit: '',
    link: '/reports/'
  }
]

const Home = () => {
  const [localCurrency, setLocalCurrency] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [cardPermissions, setCardPermissions] = useState<CardPermissions>({
    Entries: 0,
    Reports: 0
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  function handleCardClick(cardKey: string) {
    if (cardPermissions[cardKey as keyof CardPermissions] === 1) {
      router.push(cardData.find(card => card.key === cardKey)?.link || '/')
    } else {
      setIsDialogOpen(true)
    }
  }

  useEffect(() => {
    const UserName = secureLocalStorage.getItem('UserName')
    const fetchData = async () => {
      try {
        const data = await userPermission(UserName as string)
        setCardPermissions(data[0])
        setLoading(false) // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data from API:', error)
        setLoading(false) // Set loading to false when data is fetched
      }
    }

    const fetchLC = async () => {
      try {
        const data = await LocalCurrency(Site_Code as string, companyid as string)
        if (data && data.length > 0) {
          setLocalCurrency(data[0]?.LocalCurrencyName || '')
        } else {
          console.warn('Local Currency Data is empty or undefined')
          setLocalCurrency('')
        }
      } catch (error) {
        console.error('Error fetching data from API:', error)
      }
    }

    fetchData()

    fetchLC()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1, bgcolor: 'white', borderRadius: 8, boxShadow: 15 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(7, 6, 7)} !important` }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container spacing={4}>
                {cardData.map(card => {
                  // Check if the card has permission to be displayed
                  if (cardPermissions[card.key as keyof CardPermissions] === 1) {
                    return (
                      <Grid item xs={6} sm={4} lg={3} key={card.key} onClick={() => handleCardClick(card.key)}>
                        <CustomCard
                          stats={card.stats}
                          icon={card.icon}
                          title={card.title}
                          subtitle={card.subtitle}
                          BGColor={card.BGColor}
                          unit={card.unit === '(INR)' ? `(${localCurrency})` : card.unit}
                        />
                      </Grid>
                    )
                  }
                  return null // If no permission, do not render the card
                })}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogContentText>You are not an authorized person to open this module !!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Home
