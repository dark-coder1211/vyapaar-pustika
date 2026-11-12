// Component Imports
import Company from '@views/Company'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const CompanyPage = () => {
  // Vars
  const mode = getServerMode()

  return <Company mode={mode} />
}

export default CompanyPage
