'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Button,
  Box,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { useRouter, useSearchParams } from 'next/navigation'
import HeadingTab from '@/components/HeadingTab'
import ExitToApp from '@/components/ExitToApp'
import TextBoxOne from '@/components/TextBoxOne'
import type { UnloadingEntryInterface } from './UnloadEntry_modal'
import { useParams } from '@/context/paramcontext'
import { AddUnloadingAction, getUnloadingEntryByDocId } from './UnloadEntry_action'
import GateNoHelpComponent from '@/components/HelpBox/gatenohelp'
import GateEntryPartyHelpComponent from '@/components/HelpBox/gateentrypartyhelp'
import GateEntryOrdNoHelpComponent from '@/components/HelpBox/gateentryordernohelp'
import GateEntryAdvItemHelpComponent from '@/components/HelpBox/gateentryadviseitemhelp'
import GateEntryAdvChangeItemHelpComponent from '@/components/HelpBox/advisechangeitemhelp'
import { GateNoHelp } from '@/app/action/filteraction'

const UnloadingEntry = () => {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [docId, setdocId] = useState<string>('')

  const { Site_Code, companyid, UserName, bu } = useParams()
  const searchParams = useSearchParams()
  const [stockDependOn, setStockDependOn] = useState('')
  const [labDependOn, setLabDependOn] = useState('')

  const [formData, setFormData] = useState<UnloadingEntryInterface>({
    strDocId: '',
    IntV_SNo: 0,
    strItemCode: '',
    StrItemName: '',
    StrComponentCode: '',
    StrComponentName: '',
    DblApproxQty: 0,
    StrOrdDocID: '',
    StrOrdNo: '',
    IntOrdV_SNo: 0,
    StrForm31No: '',
    StrPartyCode: '',
    StrPartyName: '',
    StrGateInNo: '',
    StrWeightmentNo: '',
    StrWeightmentDocID: ''
  })

  // Optional: auto-update time every minute
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setFormData(prev => ({ ...prev, time: getCurrentTime() }))
  //   }, 60000) // update every 1 minute
  //   return () => clearInterval(timer)
  // }, [])

  // Handle Input Change
  // const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target
  //   setFormData(prev => ({ ...prev, [name]: value }))
  // }

  const handleChange = useCallback(
    async (eventOrKey: any, value?: any) => {
      let key: string
      let updatedValue: any

      // 🔍 Check if triggered by an event
      if (typeof eventOrKey === 'object' && eventOrKey?.target) {
        const { name, value: inputValue } = eventOrKey.target
        key = name
        updatedValue = key === 'amount3' || key === 'grossAmt' ? parseFloat(inputValue) || 0 : inputValue
      }
      else if (typeof eventOrKey === 'string') {
        key = eventOrKey
        updatedValue = key === 'amount3' || key === 'grossAmt' ? parseFloat(value) || 0 : value
      } else {
        return
      }

      // 📝 Update form data
      setFormData(prev => ({
        ...prev,
        [key]: updatedValue
      }))
    },
    [setFormData] // ✅ Add all state setters to dependencies
  )

  // Exit navigation
  const handleExit = () => router.push('/unloadList/')

  const requiredFields: { key: keyof UnloadingEntryInterface; label: string }[] = [
    { key: 'strDocId', label: 'Gate No.' },
    { key: 'StrPartyName', label: 'Party Name' },
    { key: 'StrItemName', label: 'Item Name' }
  ]

  // Submit Handler
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    for (const field of requiredFields) {
      if (!formData[field.key]) {
        toast.error(`⚠️ Please fill ${field.label}!`)
        return
      }
    }

    const updatedPostFormData = {
      strDocId: formData.strDocId,
      IntV_SNo: formData.IntV_SNo,
      strItemCode: formData.strItemCode,
      StrItemName: formData.StrItemName,
      StrComponentCode: formData.StrComponentCode,
      StrComponentName: formData.StrComponentName,
      DblApproxQty: formData.DblApproxQty,
      StrOrdDocID: formData.StrOrdDocID,
      StrOrdNo: formData.StrOrdNo,
      IntOrdV_SNo: formData.IntOrdV_SNo,
      StrForm31No: formData.StrForm31No,
      StrPartyCode: formData.StrPartyCode,
      StrPartyName: formData.StrPartyName,
      StrGateInNo: formData.StrGateInNo,
      StrWeightmentNo: formData.StrWeightmentNo,
      StrWeightmentDocID: formData.StrWeightmentDocID
    }

    try {
      const res = await AddUnloadingAction(
        updatedPostFormData,
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )
      const showToastAndReload = async () => {
        if (res?.success) {
          // Show success toast
          if (docId === '') {
            toast.success('Add Record Successfully!', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            })
            setFormData({
              strDocId: '',
              IntV_SNo: 0,
              strItemCode: '',
              StrItemName: '',
              StrComponentCode: '',
              StrComponentName: '',
              DblApproxQty: 0,
              StrOrdDocID: '',
              StrOrdNo: '',
              IntOrdV_SNo: 0,
              StrForm31No: '',
              StrPartyCode: '',
              StrPartyName: '',
              StrGateInNo: '',
              StrWeightmentNo: '',
              StrWeightmentDocID: ''
            })
            setStockDependOn('')
            setLabDependOn('')
          } else {
            toast.success('Edit Record Successfully!', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            })
          }
        } else {
          toast.error(res?.error, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
        }
      }
      showToastAndReload()
    } catch (error) {
      toast.error('API call failed', {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
  }

  // const fetchVGSNo = async () => {
  //   const res: RecidInterface = await RecidNOHelp(
  //     getCurrentDate(),
  //     'VGP',
  //     'VGatePass',
  //     Site_Code as string,
  //     companyid as string,
  //     UserName as string,
  //     bu as string
  //   )
  //   const clientId = searchParams.get('clientId')

  //   if (!clientId) {
  //     if (res?.success) {
  //       setVgsNo(res?.data)
  //     } else {
  //       const errorMessage = res.error || 'Unknown error'
  //       toast.error(errorMessage, {
  //         position: 'top-center',
  //         autoClose: false,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: 'light'
  //       })
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (Site_Code && companyid && UserName) {
  //     fetchVGSNo()
  //   }
  // }, [Site_Code, companyid, UserName])

  // useEffect(() => {
  //   if (vgsno) {
  //     setFormData(prev => ({ ...prev, StrRecId: vgsno }))
  //   }
  // }, [vgsno])

  // Convert "14/Nov/2025" => "2025-11-14"

  // function formatDateForInput(dateStr: string): string {
  //   if (!dateStr) return ''
  //   const [day, monthStr, year] = dateStr.split('/')
  //   const monthMap: Record<string, string> = {
  //     Jan: '01',
  //     Feb: '02',
  //     Mar: '03',
  //     Apr: '04',
  //     May: '05',
  //     Jun: '06',
  //     Jul: '07',
  //     Aug: '08',
  //     Sep: '09',
  //     Oct: '10',
  //     Nov: '11',
  //     Dec: '12'
  //   }
  //   const month = monthMap[monthStr] || '01'
  //   return `${year}-${month}-${day.padStart(2, '0')}`
  // }

  // // Convert "12.41" => "12:41"
  // function formatTimeForInput(timeStr: string): string {
  //   if (!timeStr) return ''
  //   return timeStr.replace('.', ':')
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Docid = searchParams.get('Docid')
        const V_SNo = searchParams.get('V_SNo')

        if (Docid) {
          setdocId(Docid)
          const result = await getUnloadingEntryByDocId(
            bu as string,
            Site_Code as string,
            companyid as string,
            Docid,
            V_SNo as string
          )

          if (result?.success && result.data?.length > 0) {
            const data = result.data[0] // pick the first item
            setFormData({
              ...data
            })

            const gateResponse = await GateNoHelp(
              Site_Code as string,
              companyid as string,
              bu as string,
              `AND G.DocId='${data.strDocId}'`
            )
            if ( gateResponse?.length > 0) {
              const gateInfo = gateResponse[0]

              setStockDependOn(gateInfo.StockDependOnName || '')
              setLabDependOn(gateInfo.LabTestDependOnName || '')
            }
          }
        }
      } catch (error) {
        console.error('Error fetching Unloading data:', error)
      }
    }

    fetchData()
  }, [searchParams, Site_Code, companyid, UserName, bu])

  const handleItemSelect = (item: any | null) => {
    if (item?.GateEntryDocID) {
      setFormData(prev => ({
        ...prev,
        StrPartyName: item.PartyName,
        StrPartyCode: item.Partycode
      }))

      setStockDependOn(item.StockDependOnName || '')
      setLabDependOn(item.LabTestDependOnName || '')
    } else {
      console.log('mai pahuch gai')
      setFormData(prev => ({
        ...prev,
        StrPartyName: '',
        StrPartyCode: ''
      }))

      setStockDependOn('')
      setLabDependOn('')
    }
  }

  return (
    <>
      <ToastContainer position='top-center' autoClose={4000} theme='colored' />

      <HeadingTab
        TitleIcon={BsFillDoorOpenFill}
        Title='Gate'
        RoutingIcon={SiHomebridge}
        routingPath='/dashboardpage/'
      />

      <Box
        sx={{
          mt: 5,
          height: isMobile ? 'auto' : 'calc(100vh - 220px)',
          overflow: 'auto',
          px: isMobile ? 1 : 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 1300,
            borderRadius: 3,
            boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
            background: '#fafafa'
          }}
        >
          <CardHeader
            title='Unloading Entry'
            action={
              <IconButton onClick={handleExit} size='small' aria-label='exit' sx={{ color: 'text.secondary' }}>
                <ExitToApp />
              </IconButton>
            }
            sx={{ pb: 0 }}
          />
          <Divider />

          <CardContent sx={{ py: 2 }}>
            {/* LEFT SIDE */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2 }}>
                <Grid container spacing={2} columnSpacing={4}>
                  <Grid item xs={12} md={4}>
                    <GateNoHelpComponent
                      filters={formData}
                      handleChange={handleChange}
                      filterKey='strDocId'
                      nameKey='StrGateInNo'
                      label={
                        <>
                          Gate No. <span className='text-red-500'>*</span>
                        </>
                      }
                      onItemSelect={handleItemSelect}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextBoxOne
                      label='S. No.'
                      name='StrV_Date'
                      type='text'
                      value={formData.IntV_SNo || 0}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <GateEntryPartyHelpComponent
                      filters={formData}
                      handleChange={handleChange}
                      filterKey='StrPartyCode'
                      nameKey='StrPartyName'
                      label={
                        <>
                          Party Name <span className='text-red-500'>*</span>
                        </>
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <GateEntryOrdNoHelpComponent
                      filters={formData}
                      handleChange={handleChange}
                      filterKey='StrOrdDocID'
                      nameKey='StrOrdNo'
                      label='Order No.'
                      partyCode={formData.StrPartyCode}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <GateEntryAdvItemHelpComponent
                      filters={formData}
                      handleChange={handleChange}
                      filterKey='strItemCode'
                      nameKey='StrItemName'
                      label={
                        <>
                          Item Name <span className='text-red-500'>*</span>
                        </>
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <GateEntryAdvChangeItemHelpComponent
                      filters={formData}
                      handleChange={handleChange}
                      filterKey='StrComponentCode'
                      nameKey='StrComponentName'
                      label='Change Item Name'
                      itemCode={formData.strItemCode}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextBoxOne
                      label='Approx Qty.'
                      name='DblApproxQty'
                      value={formData.DblApproxQty || ''}
                      onChange={handleChange}
                      type='number'
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextBoxOne label='Stock Depend On' name='stockdependon' value={stockDependOn || ''} disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextBoxOne label='Lab Depend On' name='labdependon' value={labDependOn || ''} disabled />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant='contained'
                color='primary'
                sx={{
                  px: 5,
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,255,0.25)',
                  transition: '0.3s',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: '0 6px 16px rgba(0,0,255,0.4)' }
                }}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default UnloadingEntry
