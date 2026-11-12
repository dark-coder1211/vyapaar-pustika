import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'


const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {


    const AuthComponent: React.FC<P> = props => {
        const [hasPermission, setHasPermission] = useState<boolean>(false)
        const router = useRouter()

        useEffect(() => {
            const username = typeof window !== 'undefined' ? secureLocalStorage.getItem('UserName') as string | null : null;

            // Replace this condition with your actual authentication logic
            if (username && (username.toLowerCase() === 'sa' || username.toLowerCase() === 'super')) {
                setHasPermission(true)
            } else {
                // Redirect to the previous page or another page
                router.back()
            }
        }, [router])

        // If the user has permission, render the wrapped component
        if (hasPermission) {
            return <WrappedComponent {...props} />
        }

        // If the user doesn't have permission and is redirected, you might not need to render anything here
        // Alternatively, you can render an alternative component or message
        return null
    }

    return AuthComponent
}

export default withAuth
