"use client"
import { useRouter } from 'next/navigation'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Styled Component Import

// ** Components Imports
import ExitToApp from '@/components/ExitToApp'
import { Grid } from '@mui/material'
import { FaCartArrowDown } from 'react-icons/fa6'
import ReportCard from './component/ReportCard'


const ReportDashboard = () => {
    const router = useRouter()

    function handleChange() {
        router.push('/home/')
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
                    zIndex: 1000,
                    transition: 'box-shadow 0.3s ease',
                    boxShadow: '0px 4px 8px rgba(115, 103, 240, 0.5)',
                    borderRadius: '10px'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FaCartArrowDown color='#7367F0' size={'1.25rem'} className='ml-3' />
                    <Typography variant='h5' sx={{ fontWeight: 600, color: `#7367F0`, marginLeft: 2 }}>
                        Reports & Displays
                    </Typography>
                </Box>
                <IconButton
                    onClick={handleChange}
                    size='small'
                    aria-label='settings'
                    className='card-more-options'
                    sx={{ color: '#7367F0' }}
                >
                    <ExitToApp />
                </IconButton>
            </Box>

            <div style={{ marginTop: '10px' }}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12} >
                        <ReportCard />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ReportDashboard
