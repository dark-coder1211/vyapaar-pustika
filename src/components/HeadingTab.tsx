"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Define interface for props
interface HeadingTabProps {
  TitleIcon: React.ElementType
  Title: string
  RoutingIcon: React.ElementType
  routingPath: string
}

const HeadingTab: React.FC<HeadingTabProps> = ({ TitleIcon, Title, RoutingIcon, routingPath }) => {
  const router = useRouter()
  function handleChange() {
    router.push(routingPath)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          backgroundColor: 'white',
          top: 66, // Adjust this value as needed
          zIndex: 90,
          transition: 'box-shadow 0.3s ease',
          boxShadow: '0px 4px 8px rgba(115, 103, 240, 0.5)',
          borderRadius: '10px'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {TitleIcon && <TitleIcon color='#7367F0' size='1.25rem' className='card-more-options ml-3' />}
          <Typography variant='h5' sx={{ fontWeight: 600, color: `#7367F0`, marginLeft: 2 }}>
            {Title}
          </Typography>
        </Box>
        <IconButton
          onClick={handleChange}
          size='small'
          aria-label='settings'
          className='card-more-options'
          sx={{ color: '#7367F0' }}
        >
          {RoutingIcon && <RoutingIcon />}
        </IconButton>
      </Box>
    </>
  )
}

export default HeadingTab
