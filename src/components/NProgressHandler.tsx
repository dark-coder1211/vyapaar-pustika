// // components/NProgressHandler.tsx

// "use client"

// import { useRouter } from 'next/navigation'
// import { Router } from 'next/router'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import { useEffect } from 'react'

// const NProgressHandler = () => {
//   const router = useRouter()

//   useEffect(() => {
//     const handleRouteChangeStart = () => {
//       NProgress.start()
//     }

//     const handleRouteChangeComplete = () => {
//       NProgress.done()
//     }

//     const handleRouteChangeError = () => {
//       NProgress.done()
//     }

//     Router.events.on('routeChangeStart', handleRouteChangeStart)
//     Router.events.on('routeChangeComplete', handleRouteChangeComplete)
//     Router.events.on('routeChangeError', handleRouteChangeError)

//     return () => {
//       Router.events.off('routeChangeStart', handleRouteChangeStart)
//       Router.events.off('routeChangeComplete', handleRouteChangeComplete)
//       Router.events.off('routeChangeError', handleRouteChangeError)
//     }
//   }, [router])

//   return null
// }

// export default NProgressHandler


// components/NProgressHandler.tsx

"use client"

import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

// import 'nprogress/nprogress.css'

import { useEffect, useRef } from 'react';

import '@/app/nprogress-custom.css'; // Import your custom CSS

const NProgressHandler = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleStart = () => {
      if (timer.current) clearTimeout(timer.current)
      NProgress.start()
    }

    const handleStop = () => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        NProgress.done()
      }, 200) // Delay stopping to show the progress bar longer
    }

    handleStart()
    handleStop()

    return () => {
      if (timer.current) clearTimeout(timer.current)
      NProgress.done()
    }
  }, [pathname, searchParams])

  return null
}

export default NProgressHandler
