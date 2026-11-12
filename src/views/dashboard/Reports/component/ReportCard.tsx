'use client'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { FaFileCode, FaFileContract, FaFilePen, FaFileInvoice, FaFileInvoiceDollar } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { MdPendingActions, MdOutlineSummarize } from 'react-icons/md'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { TbReportSearch } from 'react-icons/tb'
import { GrDocumentStore } from 'react-icons/gr'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'


interface RPTTitle {
  Title: string
}

const RenderStats = () => {
  // Hardcoded data
  const myData: RPTTitle[] = [
    { Title: 'Requisition Register' },
    { Title: 'Pending Indent Report' },
    { Title: 'Pending Purchase Order Report' },
    { Title: 'Gate In Status' },
    { Title: 'Pending Sale Order Report' },
    { Title: 'Sale Order Tracking Display' },
    { Title: 'Stock Report' },
    { Title: 'Store Issue Receive Register' },
    { Title: 'Finish Stock Summary' },
    { Title: 'Gate Vs Invoice' },
    { Title: 'Ledger' },
    { Title: 'Bill Wise Ledger' }
  ]

  const router = useRouter()

  const getAvatarColor = (title: string) => {
    if (title === 'Sale Order Tracking Display') {
      return { color: '#FFA000', backgroundColor: '#ffe7c0' } // Sales Order Tracking Display color
    }
    if (title === 'Pending Purchase Order Report') {
      return { color: '#009688', backgroundColor: '#caefec' }
    }
    if (title === 'Pending Sale Order Report') {
      return { color: 'oklch(71.2% 0.194 13.428)', backgroundColor: 'oklch(89.2% 0.058 10.001)' }
    }
    if (title === 'Gate In Status') {
      return { color: '#BE123C', backgroundColor: '#FDA4AF' }
    }
    if (title === 'Requisition Register') {
      return { color: 'oklch(55.8% 0.288 302.321)', backgroundColor: 'oklch(82.7% 0.119 306.383)' }
    }
    if (title === 'Pending Indent Report') {
      return { color: '#92400E', backgroundColor: '#fee2e2' }
    }
    if (title === 'Stock Report') {
      return { color: '#155e75', backgroundColor: '#cffafe' }
    }
    if (title === 'Store Issue Receive Register') {
      return { color: '#4E6142', backgroundColor: '#D4E7B1' }
    }
    if (title === 'Finish Stock Summary') {
      return { color: '#5B59C5', backgroundColor: '#AFC8D4' }
    }
    if (title === 'Gate Vs Invoice') {
      return { color: '#753742', backgroundColor: '#D8BD8A' }
    }
    if (title === 'Ledger') {
      return { color: '#987284', backgroundColor: '#FEEEEC' }
    }
    if (title === 'Bill Wise Ledger') {
      return { color: '#3A3335', backgroundColor: '#FDF0D5' }
    }
  }

  const getAvatarIcon = (title: string) => {
    switch (title) {
      case 'Pending Purchase Order Report':
        return <FaFileCode size={'1.45rem'} />
      case 'Sale Order Tracking Display':
        return <FaFilePen size={'1.45rem'} />
      case 'Pending Sale Order Report':
        return <FaFileContract size={'1.45rem'} />
      case 'Gate In Status':
        return <BsFillDoorOpenFill size={'1.38rem'} />
      case 'Requisition Register':
        return <MdPendingActions size={'1.45rem'} />
      case 'Pending Indent Report':
        return <HiOutlineDocumentReport size={'1.45rem'} />
      case 'Stock Report':
        return <TbReportSearch size={'1.45rem'} />
      case 'Store Issue Receive Register':
        return <GrDocumentStore size={'1.38rem'} />
      case 'Finish Stock Summary':
        return <MdOutlineSummarize size={'1.5rem'} />
      case 'Gate Vs Invoice':
        return <FaFileInvoice size={'1.5rem'} />
      case 'Ledger':
        return <FaFileInvoiceDollar size={'1.5rem'} />
      case 'Bill Wise Ledger':
        return <LiaFileInvoiceDollarSolid size={'1.5rem'} />
      default:
        return null
    }
  }

  return myData.map((item: RPTTitle, index: number) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      {' '}
      {/* Ensure 50% width on all screen sizes */}
      <a
        href='#'
        onClick={e => {
          e.preventDefault()
          if (item.Title === 'Requisition Register') {
            router.push(`/reports/requisitionregister`)
          } else if (item.Title === 'Pending Purchase Order Report') {
            router.push(`/reports/pendingporeport`)
          } else if (item.Title === 'Pending Sale Order Report') {
            router.push(`/reports/pendingSOReport`)
          } else if (item.Title === 'Gate In Status') {
            router.push(`/reports/gateinstatus`)
          } else if (item.Title === 'Sale Order Tracking Display') {
            router.push(`/reports/saleOrderTrackingDisplay`)
          } else if (item.Title === 'Pending Indent Report') {
            router.push(`/reports/pendingindent`)
          } else if (item.Title === 'Stock Report') {
            router.push(`/reports/stockreport`)
          } else if (item.Title === 'Store Issue Receive Register') {
            router.push(`/reports/storeissuereceive`)
          } else if (item.Title === 'Finish Stock Summary') {
            router.push(`/reports/finishstocksummary`)
          } else if (item.Title === 'Gate Vs Invoice') {
            router.push(`/reports/gatevsinvoice`)
          } else if (item.Title === 'Ledger') {
            router.push(`/reports/ledger`)
          } else if (item.Title === 'Bill Wise Ledger') {
            router.push(`/reports/billwiseledger`)
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
            bgcolor: '#CBD1B3',
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
              ...getAvatarColor(item.Title),
              borderRadius: '50%'
            }}
          >
            {getAvatarIcon(item.Title)}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: '#464D2E' }}>
              {item.Title}
            </Typography>
          </Box>
        </Box>
      </a>
    </Grid>
  ))
}

const ReportCard = () => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#FCF9ED' }}>
      <CardHeader
        title='Reports & Displays'

        // action={
        //   <IconButton size='small' aria-label='settings' sx={{ color: 'text.secondary' }}>
        //     <BiDotsVerticalRounded />
        //   </IconButton>
        // }

        titleTypographyProps={{
          sx: {
            color: '#464D2E',
            fontWeight: 'bold',
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

export default ReportCard
