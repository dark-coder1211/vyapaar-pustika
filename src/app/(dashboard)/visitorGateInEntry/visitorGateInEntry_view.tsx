'use client'

import React, { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    Grid,
    IconButton,
    Button,
    TextField,
    Typography,
    Box,
    Paper,
    useMediaQuery,
    useTheme,

} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { useRouter, useSearchParams } from 'next/navigation'
import HeadingTab from '@/components/HeadingTab'
import ExitToApp from '@/components/ExitToApp'
import TextBoxOne from '@/components/TextBoxOne'
import type { RecidInterface, VisitorGatePass } from './visitorGateInEntry_modal'
import { useParams } from '@/context/paramcontext'
import { AddVGPAction, GetVGPByDocid, RecidNOHelp } from './visitorGateInEntry_action'
import CityHelpComponent from '@/components/HelpBox/cityhelp'


const VGPInEntry = () => {
    const router = useRouter()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [vgsno, setVgsNo] = useState('')
    const [docId, setdocId] = useState<string>('')

    // Initialize with current date & time
    const getCurrentDate = () => new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const getCurrentTime = () => new Date().toTimeString().slice(0, 5); // HH:MM
    const { Site_Code, companyid, UserName, bu } = useParams()
    const searchParams = useSearchParams()

    const [formData, setFormData] = useState<VisitorGatePass>({
        strDocId: "",
        strV_Type: "VGP",
        IntV_No: 0,
        IntV_Prefix: 0,
        StrV_Date: getCurrentDate(),
        StrRecId: "",
        StrInTime: getCurrentTime(),
        StrPurpose: "",
        StrName: "",
        StrAddress: "",
        StrCity: "",
        StrCityName: "",
        StrPhMob: "",
        StrPersonToMeet: "",
        StrVehicle: "",
        StrPreparedBy: UserName ?? ""
    });


    // Optional: auto-update time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setFormData(prev => ({ ...prev, time: getCurrentTime() }))
        }, 60000) // update every 1 minute
        return () => clearInterval(timer)
    }, [])



    // Handle Input Change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }


    // Exit navigation
    const handleExit = () => router.push('/visitorGateInList/')

    const requiredFields: { key: keyof VisitorGatePass; label: string }[] = [
        { key: 'StrName', label: 'Visitor Name' },
        { key: 'StrAddress', label: 'Address' },
        { key: 'StrPersonToMeet', label: 'Person To Meet' },
        { key: 'StrPurpose', label: 'Purpose' }
    ];


    // Submit Handler
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        for (const field of requiredFields) {
            if (!formData[field.key]) {
                toast.error(`⚠️ Please fill ${field.label}!`);
                return;
            }
        }


        const updatedPostFormData = {
            strDocId: formData.strDocId,
            strV_Type: formData.strV_Type,
            IntV_No: formData.IntV_No,
            StrV_Date: formData.StrV_Date,
            IntV_Prefix: formData.IntV_Prefix,
            StrRecId: formData.StrRecId,
            StrInTime: formData.StrInTime,
            StrPurpose: formData.StrPurpose,
            StrName: formData.StrName,
            StrAddress: formData.StrAddress,
            StrCity: formData.StrCity,
            StrCityName: formData.StrCityName,
            StrPhMob: formData.StrPhMob,
            StrPersonToMeet: formData.StrPersonToMeet,
            StrVehicle: formData.StrVehicle,
            StrPreparedBy: UserName ?? ""
        };



        console.log(
            JSON.stringify(updatedPostFormData, null, 2)
        );



        try {
            const res = await AddVGPAction(updatedPostFormData, Site_Code as string, companyid as string, UserName as string, bu as string)

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
                            strV_Type: '',
                            IntV_No: 0,
                            StrV_Date: getCurrentDate(),
                            IntV_Prefix: 0,
                            StrRecId: '',
                            StrInTime: getCurrentTime(),
                            StrPurpose: '',
                            StrName: '',
                            StrAddress: '',
                            StrCity: '',
                            StrCityName: '',
                            StrPhMob: '',
                            StrPersonToMeet: '',
                            StrVehicle: '',
                            StrPreparedBy: ''
                        });
                        fetchVGSNo()
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
    };

    const fetchVGSNo = async () => {
        const res: RecidInterface = await RecidNOHelp(
            getCurrentDate(),
            'VGP',
            'VGatePass',
            Site_Code as string,
            companyid as string,
            UserName as string,
            bu as string
        )
        const clientId = searchParams.get('clientId')

        if (!clientId) {
            if (res?.success) {
                setVgsNo(res?.data)
            } else {
                const errorMessage = res.error || 'Unknown error'
                toast.error(errorMessage, {
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
    }

    useEffect(() => {
        if (Site_Code && companyid && UserName) {
            fetchVGSNo()
        }
    }, [Site_Code, companyid, UserName])

    useEffect(() => {
        if (vgsno) {
            setFormData(prev => ({ ...prev, StrRecId: vgsno }))
        }
    }, [vgsno])

    // Convert "14/Nov/2025" => "2025-11-14"
    function formatDateForInput(dateStr: string): string {
        if (!dateStr) return '';
        const [day, monthStr, year] = dateStr.split('/');
        const monthMap: Record<string, string> = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12',
        };
        const month = monthMap[monthStr] || '01';
        return `${year}-${month}-${day.padStart(2, '0')}`;
    }

    // Convert "12.41" => "12:41"
    function formatTimeForInput(timeStr: string): string {
        if (!timeStr) return '';
        return timeStr.replace('.', ':');
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const Docid = searchParams.get('DocId')
                if (Docid) {
                    setdocId(Docid)
                    const result = await GetVGPByDocid({ Docid }, UserName!, Site_Code!, companyid!, bu!)

                    if (result?.success && result.data?.length > 0) {
                        const data = result.data[0]; // pick the first item
                        setFormData({
                            ...data,
                            StrV_Date: formatDateForInput(data.StrV_Date),   // convert to YYYY-MM-DD
                            StrInTime: formatTimeForInput(data.StrInTime),  // convert to HH:MM
                        });

                    }


                }
            } catch (error) {
                console.error('Error fetching Visitor Gate Pass data:', error)
            }
        }

        fetchData()
    }, [searchParams, Site_Code, companyid, UserName, bu])





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
                    height: isMobile ? 'auto' : 'calc(100vh - 130px)',
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
                        title='Visitor Gate In Entry'
                        action={
                            <IconButton onClick={handleExit} size='small' aria-label='exit' sx={{ color: 'text.secondary' }}>
                                <ExitToApp />
                            </IconButton>
                        }
                        sx={{ pb: 0 }}
                    />
                    <Divider />

                    <CardContent sx={{ py: 2 }}>
                        <Grid container spacing={3}>
                            {/* LEFT SIDE */}
                            <Grid item xs={12} md={8}>
                                <Paper elevation={0} sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <TextBoxOne label='Entry No.' name='StrRecId' value={formData.StrRecId} onChange={handleChange} disabled required />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextBoxOne label='Date' name='StrV_Date' type='date' value={formData.StrV_Date} onChange={handleChange} disabled required />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextBoxOne label='Time' name='StrInTime' type='time' value={formData.StrInTime} onChange={handleChange} disabled required />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextBoxOne
                                                label='Visitor Name'
                                                name='StrName'
                                                required
                                                value={formData.StrName}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={2}
                                                label="Address"
                                                name="StrAddress"
                                                value={formData.StrAddress}
                                                onChange={handleChange}
                                                variant="outlined"
                                                required
                                                sx={{
                                                    "& .MuiFormLabel-asterisk": {
                                                        color: "red"
                                                    }
                                                }}
                                            />

                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <CityHelpComponent<typeof formData>
                                                filters={formData}
                                                handleChange={(
                                                    key,
                                                    value
                                                ) => setFormData(prev => ({ ...prev, [key]: value }))} // connect to formData state
                                                filterKey="StrCity"
                                                nameKey="StrCityName"
                                                label={<>City</>}
                                            />

                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextBoxOne label='Phone' name='StrPhMob' value={formData.StrPhMob} onChange={handleChange} />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <TextBoxOne label='Vehicle' name='StrVehicle' value={formData.StrVehicle} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextBoxOne
                                                label='Person To Meet'
                                                name='StrPersonToMeet'
                                                required
                                                value={formData.StrPersonToMeet}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* RIGHT SIDE */}
                            <Grid item xs={12} md={4}>
                                <Box display='flex' flexDirection='column' gap={2}>
                                    {/* Purpose */}
                                    <Paper
                                        elevation={0}
                                        sx={{ p: 2, backgroundColor: '#f9f9ff', borderRadius: 2, border: '1px solid #ddd' }}
                                    >
                                        <Typography variant='subtitle1' fontWeight='bold' color='primary' sx={{ mb: 1 }}>
                                            Purpose <span style={{ color: 'red' }}>*</span>
                                        </Typography>

                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={5}
                                            placeholder='Enter purpose of visit...'
                                            name='StrPurpose'
                                            value={formData.StrPurpose}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Paper>
                                </Box>
                            </Grid>
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

export default VGPInEntry
