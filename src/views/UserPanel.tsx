"use client";

import {
    Autocomplete,
    Button,
    CardContent,
    CardMedia,
    Checkbox,
    FormControl,
    FormControlLabel,
    TextField,
    Typography
} from '@mui/material';
import MuiCard from '@mui/material/Card';
import type { CardProps } from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

// ** Demo Imports
import withAuth from './withAuth';

// ** React Toastify
import { useImageVariant } from '@/@core/hooks/useImageVariant';
import type { Mode } from '@/@core/types';
import { getUserDet, getUserPermissionDet, setUserPermissions } from '@/app/action/userPanel';
import Illustrations from '@/components/Illustrations';
import { useRouter } from 'next/navigation';
import secureLocalStorage from 'react-secure-storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getComp_CodeFromSession = () => typeof window !== 'undefined' ? secureLocalStorage.getItem('Comp_Code') as string | null : null;
const getSite_CodeFromSession = () => typeof window !== 'undefined' ? secureLocalStorage.getItem('Site_Code') as string | null : null;

const roles = ['Approval', 'Attachment', 'Finance', 'Inventory', 'Purchase', 'Production', 'Sale', 'Task', 'Entries', 'Reports'];

interface User {
    User_Name: string;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    [theme.breakpoints.down('md')]: { display: 'block !important', position: 'relative' }
}));

const UserPanel = ({ mode }: { mode: Mode }) => {
    const [myData, setMyData] = useState<User[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const searchOption = myData.find(item => item.User_Name === searchValue);
    const formattedSearchValue = searchOption ? searchOption.User_Name : '';
    const Comp_Code = getComp_CodeFromSession();
    const Site_Code = getSite_CodeFromSession();

    // Vars
    const darkImg = '/images/pages/auth-v1-mask-dark.png';
    const lightImg = '/images/pages/auth-v1-mask-light.png';

    const authBackground = useImageVariant(mode, lightImg, darkImg);

    // const isFindButtonDisabled = searchValue.trim() === '' || selectedRoles.length === 0

    // Disable the checkboxes until a user is selected
    const areCheckboxesDisabled = searchValue.trim() === '';

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserDet();
            if (Array.isArray(data)) {
                setMyData(data);
            } else {
                console.error('Invalid data format. Expected an array.');
            }
        };

        fetchData().catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const handleAutocompleteChange = async (event: React.SyntheticEvent<Element, Event>, value: string | null) => {
        if (value === null) {
            // If the Autocomplete box is cleared, reset searchValue and selectedRoles
            setSearchValue('');
            setSelectedRoles([]);
        } else {
            setSearchValue(value);

            const userPermissions = await getUserPermissionDet(value);

            if (userPermissions) {
                // Update the selectedRoles based on userPermissions
                const newSelectedRoles = roles.filter(role => userPermissions[role] === 1);
                setSelectedRoles(newSelectedRoles);
            } else {
                // If fetching user permissions failed or no valid data was returned, reset selectedRoles
                setSelectedRoles([]);
            }
        }
    };

    const handleRoleToggle = (role: string) => {
        setSelectedRoles(prevRoles => {
            if (prevRoles.includes(role)) {
                return prevRoles.filter(r => r !== role);
            } else {
                return [...prevRoles, role];
            }
        });
    };

    const handleAdminRoleSelect = () => {
        setSelectedRoles(roles);
    };

    const handleSelectAllToggle = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            handleAdminRoleSelect();
        } else {
            setSelectedRoles([]);
        }
    };

    const handlePost = async () => {
        interface PostData {
            [key: string]: string;
            userName: string;
            comp_Code: string;
            site_Code: string;
        }

        const postData: PostData = {
            userName: searchValue || '',
            comp_Code: Comp_Code || '',
            site_Code: Site_Code || '',
        };

        roles.forEach(role => {
            postData[role] = selectedRoles.length === roles.length || selectedRoles.includes(role) ? '1' : '0';
        });

        try {
            const response = await setUserPermissions(postData);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            toast.success('User Permissions saved successfully');
            window.location.reload();
        } catch (error) {
            // Assert error type as Error
            const errorMessage = (error as Error).message || 'An unexpected error occurred';
            toast.error('Error: ' + errorMessage);
        }
    };

    const router = useRouter();

    const handleBack = () => {
        router.push('/home/');
        localStorage.clear();
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
                <Card sx={{ zIndex: 1, display: 'flex' }}>
                    <ToastContainer
                        position='top-center'
                        autoClose={6000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='light'
                    />
                    <div>
                        <CardMedia
                            className='dm-login-img-style'
                            component='img'
                            sx={{ height: '408px', position: 'relative', objectPosition: 'left', maxWidth: '100%' }}
                            image='/images/misc/5024147.png'
                        />
                    </div>

                    <div>
                        <CardContent sx={{ padding: theme => `${theme.spacing(6, 9, 4)} !important` }}>
                            <Typography variant='h4' sx={{ fontWeight: 550, marginBottom: 3 }}>
                                User Control Panel
                            </Typography>
                            <form>
                                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                    <Autocomplete
                                        disablePortal
                                        id='combo-box-demo'
                                        options={myData.map(item => item.User_Name)}
                                        sx={{ width: 300 }}
                                        onChange={handleAutocompleteChange}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                label='User Name'
                                                value={formattedSearchValue}
                                                onChange={e => setSearchValue(e.target.value)}
                                            />
                                        )}
                                    />
                                </FormControl>
                                <br />

                                <FormControl fullWidth sx={{ marginTop: 4, marginBottom: 2 }}>
                                    <Typography variant='h5' sx={{ fontWeight: 600, color: '#7367F0' }}>
                                        Permission
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={selectedRoles.length === roles.length} onChange={handleSelectAllToggle} />
                                        }
                                        label='Select All'
                                        disabled={areCheckboxesDisabled}
                                    />
                                    {roles.map(role => (
                                        <FormControlLabel
                                            key={role}
                                            control={
                                                <Checkbox checked={selectedRoles.includes(role)} onChange={() => handleRoleToggle(role)} />
                                            }
                                            label={role}
                                            disabled={areCheckboxesDisabled}
                                        />
                                    ))}
                                </FormControl>
                                <Button
                                    size='small'
                                    variant='contained'
                                    sx={{ backgroundColor: '#7367F0', marginRight: 2 }}
                                    onClick={handlePost}
                                    disabled={areCheckboxesDisabled}
                                >
                                    Submit
                                </Button>
                                <Button size='small' variant='contained' sx={{ backgroundColor: '#FFA000' }} onClick={handleBack}>
                                    Go to Dashboard
                                </Button>
                            </form>
                        </CardContent>
                    </div>
                </Card>
                <Illustrations maskImg={{ src: authBackground }} />
            </div >
        </>
    );
};

export default withAuth(UserPanel);
