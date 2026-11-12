// components/Loading.tsx

import CircularProgress from '@mui/material/CircularProgress';
import 'nprogress/nprogress.css';
import React from 'react';

const Loading: React.FC = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loading;
