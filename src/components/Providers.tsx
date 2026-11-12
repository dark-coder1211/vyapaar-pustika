// components/Providers.tsx

import ThemeProvider from '@components/theme'
import { SettingsProvider } from '@core/contexts/settingsContext'
import type { ChildrenType, Direction } from '@core/types'
import { getMode, getSettingsFromCookie } from '@core/utils/serverHelpers'
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import NProgressHandler from './NProgressHandler'
import { ParamProvider } from '@/context/paramcontext'

type Props = ChildrenType & {
  direction: Direction
}

const Providers = (props: Props) => {
  const { children, direction } = props
  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction}>
          <ParamProvider>
            <NProgressHandler />
            {children}
          </ParamProvider>
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
