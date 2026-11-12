import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';

interface RowData {
  DocId: string;
  V_Type: string;
  EntryNo: string;
  EntryDt: Date;
  PartyOrdNo: string;
  PartyOrdDt: Date;
  PartyCode: string;
  PartyName: string;
  ShortCode: string;
  NAmount: number;
  Qty: number;
}

interface CustomGridProps {
  row: RowData;
  icon: React.ElementType;
  avatarColor: string;
  bgavatarColor: string;
}

const CustomGridComponent1: React.FC<CustomGridProps> = ({ row, icon, avatarColor, bgavatarColor }) => {
  const parseDate = (date: string | Date): Date => {
    return date instanceof Date ? date : new Date(date);
  };

  const formatDate = (date: string | Date): string => {
    return parseDate(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Grid
      container
      wrap="nowrap"
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
          paddingTop: '0.9rem !important',
        }}
      >
        {/* Avatar and icon */}
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            margin: 'auto',
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              mr: 3,
              width: 32,
              height: 32,
              boxShadow: 3,
              color: avatarColor,
              backgroundColor: bgavatarColor,
              margin: 'auto',
              fontSize: '1.45rem',
            }}
          >
            {React.createElement(icon, { sx: { fontSize: '1.25rem' } })}
          </Avatar>
        </Grid>

        {/* Text information */}
        <Grid
          item
          sx={{
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            flex: '0 0 calc(100% - 44px)',
            lineHeight: 'normal',
          }}
        >
          <Grid item sx={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
            <Typography
              variant="body2"
              sx={{
                display: 'inline-block',
                verticalAlign: 'top',
                fontSize: '13px',
                fontWeight: '600',
                lineHeight: 'normal',
              }}
            >
              {row.PartyName}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: 'inline-block',
              flexDirection: 'row',
              cursor: 'pointer',
              verticalAlign: 'top',
            }}
          >
            <Typography variant="caption" sx={{ display: 'inline-block', verticalAlign: 'top', fontSize: '11px' }}>
              {row.EntryNo}
            </Typography>
            <Typography
              variant="caption"
              sx={{ display: 'inline-block', verticalAlign: 'top', float: 'right', fontSize: '11px' }}
            >
              {formatDate(row.EntryDt)}
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
          backgroundColor: '#ECEFF1',
        }}
      >
        <Grid item sx={{ display: 'inline-block', width: '50%', flexDirection: 'column', cursor: 'pointer' }}>
          <div>
            <Typography variant="body2" sx={{ fontSize: '11px' }}>
              {' '}
              Value{' '}
            </Typography>
          </div>
          <div>
            <Typography sx={{ color: '#009688', alignItems: 'end', fontWeight: '500' }}> {row.NAmount}</Typography>
          </div>
        </Grid>
        <Grid
          item
          sx={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'right',
            flexDirection: 'column',
            cursor: 'pointer',
          }}
        >
          <div>
            <Typography variant="body2" sx={{ fontSize: '11px' }}>
              {' '}
              Qty.{' '}
            </Typography>
          </div>
          <div>
            <Typography sx={{ color: '#EF5350', alignItems: 'end', fontWeight: '500' }}> {row.Qty}</Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomGridComponent1;
