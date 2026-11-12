'use client'

import Cookies from 'js-cookie'
import secureLocalStorage from 'react-secure-storage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ** Third-Party Imports

// ** Type Imports
import type { Mode } from '@core/types'
import type { ChangeEvent, FormEvent, MouseEvent } from 'react'

// ** MUI Components
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import type { CardProps } from '@mui/material/Card'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components
import Illustrations from '@/components/Illustrations'
import Loading from '@/components/Loading'

// ** Custom Hooks
import { useImageVariant } from '@/@core/hooks/useImageVariant'

// ** Configs
import { getStaticIpPortAction, getUsernamePassAction } from '@/app/action/loginAction'
import themeConfig from '@/configs/themeConfig'
import CryptoJS from 'crypto-js'

// ** API URLs
// const BSA_URL = 'http://103.177.224.33:5002';

interface State {
  clientcode: string
  username: string
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '70rem' },
  [theme.breakpoints.down('md')]: { display: 'block !important', position: 'relative' }
}))

const Login = ({ mode }: { mode: Mode }) => {
  const router = useRouter()

  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  // ** State
  const [open, setOpen] = useState(false)

  const [values, setValues] = useState<State>({
    clientcode: '',
    username: '',
    password: '',
    showPassword: false
  })

  const secretKey = 'your-secret-key'

  useEffect(() => {
    async function attemptAutoLogin() {
      Object.keys(Cookies.get()).forEach(cookieName => {
        Cookies.remove(cookieName)
      })

      const getstoredClientCode =
        typeof window !== 'undefined' ? (secureLocalStorage.getItem('ClientCode') as string | null) : null

      const getstoredUsername =
        typeof window !== 'undefined' ? (secureLocalStorage.getItem('UserName') as string | null) : null

      const getstoredPW = typeof window !== 'undefined' ? (secureLocalStorage.getItem('PW') as string | null) : null

      let storedClientCode: string | null = null
      let storedUsername: string | null = null
      let storedPW: string | null = null

      if (typeof window !== 'undefined') {
        if (getstoredClientCode !== null) {
          storedClientCode = getstoredClientCode
        }

        if (getstoredUsername !== null) {
          storedUsername = getstoredUsername
        }

        if (getstoredPW !== null) {
          storedPW = getstoredPW
        }

        setValues(values => ({
          ...values,
          clientcode: storedClientCode || values.clientcode,
          username: storedUsername || values.username,
          password: storedPW || values.password,
          showPassword: false
        }))
      }
    }

    attemptAutoLogin()
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const tempLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/dashboardpage')
  }

  const handleClientCode = async (e: FormEvent<HTMLFormElement>) => {
    handleOpen()
    e.preventDefault()

    if (values.password.trim() === '') {
      toast.error('Password cannot be blank!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })

      return
    }

    try {
      sessionStorage.clear()
      const response = await getStaticIpPortAction(values.clientcode, values.username)
      const data = await response

      if (data.status === 200) {
        handleLogin(e, data.URL)
      } else {
        setValues({ ...values, clientcode: '', username: '', password: '' })
        toast.error('Unauthorized Access !!!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }
    } catch (err) {
      console.error('Error occurred during handleClientCode:', err)
      setValues({ ...values, clientcode: '', username: '', password: '' })
      toast.error(`Unauthorized Access due to: ${err}`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
  }


  const handleLogin = async (e: FormEvent<HTMLFormElement> | null, baseUrl: string) => {
    if (e !== null) {
      e.preventDefault()
    }

    try {
      sessionStorage.clear()
      const encodedPassword = encodeURIComponent(values.password)
      const response = await getUsernamePassAction(baseUrl, values.username, encodedPassword)
      if (response.result) {
        secureLocalStorage.setItem('ClientCode', values.clientcode.toUpperCase())
        secureLocalStorage.setItem('UserName', values.username.toUpperCase())
        const encryptedusername = CryptoJS.AES.encrypt(values.username, secretKey).toString()
        Cookies.set('username', encryptedusername)
        secureLocalStorage.setItem('PW', values.password)
        secureLocalStorage.setItem('BaseURL', baseUrl)
        Cookies.set('BaseURL', baseUrl)
        console.log('BaseURL', baseUrl)
        secureLocalStorage.setItem('tokenLogin', response.Token)
        secureLocalStorage.setItem('tokenComp', '')
        Cookies.set('tokenLogin', response.Token)
        Cookies.set('tokenComp', '')
        router.push('/company')
        toast.success('Welcome to Paperbiz!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      } else {
        secureLocalStorage.setItem('tokenLogin', '')
        secureLocalStorage.setItem('tokenComp', '')
        Cookies.set('tokenLogin', '')
        Cookies.set('tokenComp', '')
        setValues({ ...values, username: '', password: '' })
        toast.error('User Name or password invalid !!!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }
    } catch (err) {
      console.error('Login failed due to:', err)
      secureLocalStorage.setItem('tokenLogin', '')
      secureLocalStorage.setItem('tokenComp', '')
      Cookies.set('tokenLogin', '')
      Cookies.set('tokenComp', '')
      setValues({ ...values, username: '', password: '' })
      toast.error(`Login failed due to: ${err}`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Card sx={{ zIndex: 1, display: 'flex' }}>
        <div>
          <CardMedia
            className='dm-login-img-style'
            component='img'
            sx={{ height: '428px', position: 'relative', objectPosition: 'left', maxWidth: '100%' }}
            image='/Paperbiz.jpg'
          />
        </div>
        <CardContent sx={{ padding: theme => `${theme.spacing(6, 9, 4)} !important` }}>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`${themeConfig.AppName} 👋🏻`}</Typography>
              <Typography className='mbs-1'>Please login-in to your account and start the adventure</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={tempLogin}>
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <InputLabel htmlFor='auth-login-clientcode'>Client Code</InputLabel>
                <OutlinedInput
                  label='Client Code'
                  value={values.clientcode}
                  id='auth-login-clientcode'
                  onChange={handleChange('clientcode')}
                />
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <InputLabel htmlFor='auth-login-username'>User Name</InputLabel>
                <OutlinedInput
                  label='User Name'
                  value={values.username}
                  id='auth-login-username'
                  onChange={handleChange('username')}
                />
              </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='auth-login-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        <i className={values.showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'end' }}>
                <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                  Forgot password?
                </Typography>
              </Box>
              <Button
                type='submit'
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 6, backgroundColor: '#7367F0' }}
              >
                Login
              </Button>
              <Backdrop
                sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
              >
                <Loading />
              </Backdrop>
            </form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default Login
