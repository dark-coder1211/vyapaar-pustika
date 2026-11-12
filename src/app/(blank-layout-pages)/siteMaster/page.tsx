// Component Imports
import { getServerMode } from '@/@core/utils/serverHelpers'
import SiteMast from '@/views/SiteMaster'

const SitePage = () => {
  const mode = getServerMode()

  return <SiteMast mode={mode} />
}

export default SitePage
