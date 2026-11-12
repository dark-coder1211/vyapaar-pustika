import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import type { MultiHelpProps } from '../interfaces/page'

const MultiHelp = <T,>({
  defaultSearch,
  open,
  onClose,
  onSelect,
  fetchItems,
  columnsConfig,
  title,
  dialogWidth, // Default width if not provided
  searchField
}: MultiHelpProps<T> & { dialogWidth?: string }) => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>(defaultSearch || '')
  const isMobile = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!open) return // fetch only when dialog is open
        setLoading(true)
        const response = await fetchItems()
        setItems(response)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch items:', error)
        setLoading(false)
      }
    }

    fetchData() // call only when `open` changes to true
  }, [open, fetchItems])

  useEffect(() => {
    if (open) {
      setSearchTerm(defaultSearch || '')
    }
  }, [open, defaultSearch])

  const filteredItems = items.filter(item => {
    if (!searchField) return true // if no field is given, return all
    const value = item[searchField]
    return typeof value === 'string' ? value.toLowerCase().includes(searchTerm.toLowerCase()) : false
  })

  const handleRowClick = (item: any) => {
    onSelect(item)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          width: isMobile ? '90%' : dialogWidth,
          backgroundColor: '#f9f9f9',
          overflow: 'unset',
          overflowY: 'auto',
          borderRadius: '10px'
        }
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          backgroundColor: '#2dd4bf',
          color: '#ffffff',
          padding: '1px',
          paddingLeft: '10px',
          height: '25px',
          fontSize: '14px',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)' // Gölge ekleme
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', padding: '5px' }}>
        <div
          style={{
            position: 'sticky',
            top: 5,
            backgroundColor: '#f9f9f9',
            zIndex: 1
          }}
        >
          <TextField
            value={searchTerm}
            size='small'
            autoComplete='off'
            placeholder='Search...'
            onChange={e => setSearchTerm(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 5,
                backgroundColor: '#ffffff',
                height: '35px',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2dd4bf'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2dd4bf'
                }
              },
              pb: '10px'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PiMagnifyingGlass fontSize='small' color='#2dd4bf' />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            maxHeight: isMobile ? 'calc(80vh - 56px)' : 'calc(80vh - 56px)'
          }}
        >
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <CircularProgress />
            </div>
          ) : isMobile ? (
            filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <Card
                  key={item.Code}
                  onClick={() => handleRowClick(item)}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    backgroundColor: '#ccfbf1',
                    '&:hover': {
                      backgroundColor: '#ccfbf1'
                    }
                  }}
                >
                  <CardContent>
                    {columnsConfig
                      .filter(column => column.visible)
                      .map(column => (
                        <Typography
                          key={column.index}
                          variant='body2'
                          sx={{
                            fontSize: '13px',
                            color: column.label === 'Name' ? '#1976d2' : 'textSecondary',
                            fontWeight: column.label === 'Name' ? 'bold' : 'normal',
                            marginBottom: column.label === 'Name' ? '5px' : '2px'
                          }}
                        >
                          {column.label}: {item[column.field] || ''}
                        </Typography>
                      ))}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography
                variant='body2'
                sx={{
                  textAlign: 'center',
                  color: 'textSecondary',
                  marginTop: '20px'
                }}
              >
                No record found
              </Typography>
            )
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: '300px',
                overflowY: 'auto',
                borderRadius: '10px',
                border: '1px solid #ccfbf1'
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columnsConfig
                      .filter(col => col.visible)
                      .map(column => (
                        <TableCell
                          key={column.index}
                          sx={{
                            backgroundColor: '#2dd4bf',
                            color: '#ffffff',
                            padding: '7px',
                            height: '35px',
                            fontWeight: 'bold',
                            width: column.width,
                            textAlign: column.align
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columnsConfig.filter(col => col.visible).length}
                        sx={{
                          textAlign: 'center',
                          padding: '20px',
                          fontSize: '14px',
                          color: '#888'
                        }}
                      >
                        No record found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map(item => (
                      <TableRow
                        key={item.Code}
                        hover
                        onClick={() => handleRowClick(item)}
                        sx={{
                          cursor: 'pointer'
                        }}
                      >
                        {columnsConfig
                          .filter(col => col.visible)
                          .map(column => (
                            <TableCell
                              key={column.index}
                              sx={{
                                padding: '5px',
                                height: '30px',
                                border: '1px solid #f4f4f5',
                                fontSize: '11px'
                              }}
                              align={column.align}
                            >
                              {item[column.field] || ''}
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={onClose}
          sx={{
            backgroundColor: '#2dd4bf',
            height: '35px',
            fontSize: '12px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#2dd4bf'
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MultiHelp
