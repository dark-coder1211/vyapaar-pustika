'use client'

// Third-party Imports
import { styled } from '@mui/material'

// Hook Imports
// import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled component for the HeaderImg image
const HeaderImg = styled('img')({
  height: 50
})

const NavToggle = () => {
  // Hooks
  // const { toggleVerticalNav, isBreakpointReached } = useVerticalNav()

  // const handleClick = () => {
  //   toggleVerticalNav()
  // }

  return (
    <>
      {/* Comment following code and uncomment above code in order to toggle menu on desktop screens as well */}
      {/* {isBreakpointReached && <HeaderImg alt='PaperBiz' src='/PaperBIz.png' onClick={handleClick} />} */}
      <HeaderImg alt='PaperBiz' src='/PaperBIz.png' />
    </>
  )
}

export default NavToggle
