// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/navigation'

import Loading from '@/components/Loading'

const AutoLogin = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
    router.push('/company')
  }, [router]) // Add router to the dependency array to avoid unnecessary re-renders

  if (loading) {
    return <Loading />
  }

  // Placeholder content, or loading indicator, etc.
  return <Loading />
}

export default AutoLogin
