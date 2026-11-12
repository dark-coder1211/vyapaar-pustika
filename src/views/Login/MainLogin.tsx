"use client";

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import secureLocalStorage from 'react-secure-storage';

// ** Layout Import
import AutoLogin from './AutoLogin'; // Assuming AutoLogin is a component you created
import Login from './Login';

import type { Mode } from '@/@core/types';


const MainLogin = ({ mode }: { mode: Mode }) => {
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // History API to block going back
    window.history.pushState(null, document.title, location.href);

    const handleBackButton = () => {
      window.history.pushState(null, document.title, location.href);
    };

    window.addEventListener('popstate', handleBackButton);

    // Check for stored credentials
    const storedClientCode = typeof window !== 'undefined' ? secureLocalStorage.getItem('ClientCode') : null;
    const storedUsername = typeof window !== 'undefined' ? secureLocalStorage.getItem('UserName') : null;
    const storedPW = typeof window !== 'undefined' ? secureLocalStorage.getItem('PW') : null;

    if (storedClientCode && storedUsername && storedPW) {
      setIsAutoLogin(true);

      // Optionally, you can redirect or perform additional logic here
      // For example, using router.push('/path-to-auto-login') for redirection
    }

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };

  }, [router]);

  if (isAutoLogin) {
    // If credentials exist, you could directly render AutoLogin component
    // or perform a redirection as needed.
    return <AutoLogin />;
  }

  // Render the login form by default
  return (
    <>
      <Login mode={mode} />
    </>
  );
};

export default MainLogin;
