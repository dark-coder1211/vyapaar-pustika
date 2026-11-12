// CustomGridComponent.tsx
import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'

interface RowData {
  ItemCode: string
  ItemName: string
  GSMName: string
  BFName: string
  ProdQty: number
  Dispatch: number
  SordQty: number
}

interface CustomGridProps {
  row: RowData
  icon: React.ElementType
  avatarColor: string
  bgavatarColor: string
}

const CustomGridComponent2: React.FC<CustomGridProps> = ({ row, icon, avatarColor, bgavatarColor }) => {
  return (
    <Grid
      container
      wrap='nowrap'
      spacing={2}
      sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', marginLeft: 0, width: '100%' }}
    >
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
          flex: '0 0 100%',
          paddingRight: '0.7rem',
          paddingLeft: '0.7rem',
          paddingTop: '0.9rem !important'
        }}
      >
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            margin: 'auto'
          }}
        >
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 32,
              height: 32,
              boxShadow: 3,
              color: avatarColor,
              backgroundColor: bgavatarColor,
              margin: 'auto',
              fontSize: '1.45rem'
            }}
          >
            {React.createElement(icon, { sx: { fontSize: '1.25rem' } })}
          </Avatar>
        </Grid>
        <Grid
          item
          sx={{
            display: 'grid',
            alignItems: 'center',
            cursor: 'pointer',
            flex: '0 0 calc(100% - 44px)',
            lineHeight: 'normal'
          }}
        >
          <Grid item sx={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
            <Typography
              variant='body2'
              sx={{
                display: 'inline-block',
                verticalAlign: 'top',
                fontSize: '15px',
                fontWeight: '600',
                lineHeight: 'normal'
              }}
            >
              {row.ItemName}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          display: 'inline-block',
          flexDirection: 'row',
          cursor: 'pointer',
          paddingRight: '0.7rem',
          paddingLeft: '0.9rem !important',
          paddingBottom: '0.7rem',
          marginTop: '9px',
          backgroundColor: '#ECEFF1'
        }}
      >
        <Grid item sx={{ display: 'inline-block', width: '25%', flexDirection: 'column', cursor: 'pointer' }}>
          <div>
            <Typography variant='body2' sx={{ fontSize: '11px' }}>
              {' '}
              BF{' '}
            </Typography>
          </div>
          <div>
            <Typography sx={{ color: '#EF5350', alignItems: 'end', fontWeight: '500' }}> {row.BFName}</Typography>
          </div>
        </Grid>
        <Grid item sx={{ display: 'inline-block', width: '25%', flexDirection: 'column', cursor: 'pointer' }}>
          <div>
            <Typography variant='body2' sx={{ fontSize: '11px' }}>
              {' '}
              GSM{' '}
            </Typography>
          </div>
          <div>
            <Typography sx={{ color: '#EF5350', alignItems: 'end', fontWeight: '500' }}> {row.GSMName}</Typography>
          </div>
        </Grid>

        {/* Conditionally displayed ProdQty and Dispatch */}
        {row.SordQty > 0 && (
          <Grid
            item
            sx={{
              display: 'inline-block',
              width: '50%',
              textAlign: 'right',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
          >
            <Typography variant='body2' sx={{ fontSize: '11px' }}>
              {' '}
              Sale Order Qty.{' '}
            </Typography>
            <Typography sx={{ color: '#009688', alignItems: 'end', fontWeight: '500' }}> {row.SordQty}</Typography>
          </Grid>
        )}
        {row.ProdQty > 0 && (
          <Grid
            item
            sx={{
              display: 'inline-block',
              width: '50%',
              textAlign: 'right',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
          >
            <Typography variant='body2' sx={{ fontSize: '11px' }}>
              {' '}
              Production Qty.{' '}
            </Typography>
            <Typography sx={{ color: '#009688', alignItems: 'end', fontWeight: '500' }}> {row.ProdQty}</Typography>
          </Grid>
        )}

        {row.Dispatch > 0 && (
          <Grid
            item
            sx={{
              display: 'inline-block',
              width: '50%',
              textAlign: 'right',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
          >
            <Typography variant='body2' sx={{ fontSize: '11px' }}>
              {' '}
              Dispatch Qty.{' '}
            </Typography>
            <Typography sx={{ color: '#009688', alignItems: 'end', fontWeight: '500' }}> {row.Dispatch}</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default CustomGridComponent2
