// Component Imports
import { getServerMode } from '@/@core/utils/serverHelpers'
import UserPanel from '@/views/UserPanel'

const UserPanelPage = () => {
  const mode = getServerMode()

  return <UserPanel mode={mode} />
}

export default UserPanelPage
