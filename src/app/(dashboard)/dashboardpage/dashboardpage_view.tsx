'use client'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Styled Component Import

// ** Components Imports
import { Grid } from '@mui/material'
import { FaCartArrowDown } from 'react-icons/fa6'
import EntryFormCard from '@/views/dashboard/EntryPoint/component/EntryFormCard'
import ReportCard from '@/views/dashboard/Reports/component/ReportCard'
// import EntryFormCard from './component/EntryFormCard'

const EntryPointDashboard = () => {

  // function handleChange() {
  //     router.push('/home/')
  // }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          backgroundColor: '#AD8A64',
          top: 66, // Adjust this value as needed
          zIndex: 1000,
          transition: 'box-shadow 0.3s ease',
          boxShadow: '0px 4px 8px rgba(115, 103, 240, 0.5)',
          borderRadius: '10px'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FaCartArrowDown color='#FDEAD8' size={'1.25rem'} className='ml-3' />
          <Typography variant='h5' sx={{ fontWeight: 600, color: `#FDEAD8`, marginLeft: 2 }}>
            Dashboard
          </Typography>
        </Box>
        {/* <IconButton
                    onClick={handleChange}
                    size='small'
                    aria-label='settings'
                    className='card-more-options'
                    sx={{ color: '#7367F0' }}
                >
                    <ExitToApp />
                </IconButton> */}
      </Box>

      <div style={{ marginTop: '10px' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <EntryFormCard />
          </Grid>
        </Grid>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <ReportCard />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default EntryPointDashboard
