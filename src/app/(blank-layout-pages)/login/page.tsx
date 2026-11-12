// Component Imports


// Server Action Imports

import MainLogin from '@/views/Login/MainLogin'
import { getServerMode } from '@core/utils/serverHelpers'



const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  return <MainLogin mode={mode} />
}

export default LoginPage
