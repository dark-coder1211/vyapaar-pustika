import React from 'react'

import { styled } from '@mui/system'
import { MdExitToApp } from 'react-icons/md'

const BackwardExitIcon = styled(MdExitToApp)({
  transform: 'rotate(180deg)',
  fontSize: '24px',
  cursor: 'pointer'
})

const ExitToApp: React.FC = () => {
  return (
    <>
      <BackwardExitIcon size={'1.25rem'} />
    </>
  )
}

export default ExitToApp
