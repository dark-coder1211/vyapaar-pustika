"use client"

import { useEffect, useState } from 'react'

// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { lighten } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Types
import type { HomeCardStatsVerticalProps } from '@/@core/types'

// import { Home } from '@/app/action/homeAction'
import { Home } from './homeform_action'
import type { Data, RenderStatsProps } from './homeForm_modal'
import { Site_Code, UserName, companyid } from '@/app/action/getLocalStorageData'

// ** Icons Imports
// import DotsVertical from 'mdi-material-ui/DotsVertical' 
// import IconButton from '@mui/material/IconButton'

const RenderStats: React.FC<RenderStatsProps> = ({ API }) => {
  const [myData, setMyData] = useState<Data[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await Home(API, Site_Code as string, companyid as string, UserName)
      if (Array.isArray(data)) {
        setMyData(data)
      } else {
        console.warn('Expected an array but got:', typeof data)
        setMyData([]) // Fallback or handle accordingly
      }
    }
    fetchData()
  }, [API])

  return <>{Array.isArray(myData) && myData.map((item, index) => <div key={index}>{item.Value}</div>)}</>
}

const CustomCard = (props: HomeCardStatsVerticalProps) => {
  // ... (other code)
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // This code runs on mount and checks the window width to set isMobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Check once on mount
    handleResize()

    // Optionally, adjust isMobile on window resize
    window.addEventListener('resize', handleResize)


    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile === undefined) return null


  const { title, subtitle, icon, stats, BGColor = '', unit } = props

  return (
    <Card
      sx={{
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: lighten(BGColor || '#FFFFFF', 0.1),
        
        // backgroundColor: ` ${BGColor}`,
        
        overflow: 'hidden',
        clipPath: isMobile ? 'polygon(5% 5%, 100% -5%, 100% 90%, 0% 100%)' : ''
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 0,
          height: 0,
          borderLeft: '160px solid transparent',
          borderBottom: `160px solid ${BGColor}` // Set the color to match the card background
        }}
      />

      <CardContent sx={{ padding: '17px', pb: '10px', position: 'relative', zIndex: 1, paddingRight: '2px' }}>
        <Box sx={{ display: 'flex', marginBottom: '5px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Avatar
            sx={{
              width: 35, // Adjust the width as needed
              height: 35, // Adjust the height as needed
              boxShadow: 3,
              color: `${BGColor}`,
              backgroundColor: `common.white`
            }}
          >
            {icon}
          </Avatar>
        </Box>
        <Typography variant='body1' sx={{ fontWeight: 600, color: `common.white` }}>
          {title}
        </Typography>
        <Box sx={{ margin: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Typography component='sup' sx={{ mr: 2, color: `common.white` }}>
            <RenderStats API={stats} />
          </Typography>
          <Typography variant='caption' sx={{ p: '1.5px', color: `common.white`, verticalAlign: 'middle' }}>
            {unit}
          </Typography>
        </Box>
        {/* <Box sx={{ margin: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography component='sup' sx={{ color: `common.white` }}>
            <RenderStats API={API_URL} />
          </Typography>
          <Typography variant='caption' sx={{ color: `common.white`, verticalAlign: 'middle' }}>
            {unit}
          </Typography>
        </Box> */}
        <Typography variant='caption' sx={{ color: `common.white`, verticalAlign: 'center' }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CustomCard
