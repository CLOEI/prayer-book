import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Box} from '@chakra-ui/react';

import {setDeferredPrompt} from '../redux/slice/PWASlice';

import type {AppDispatch} from '../redux/store';

type Props = {
  children: React.ReactNode;
}

function Layout({children}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      dispatch(setDeferredPrompt(e as BeforeInstallPromptEvent));
    });
  }, []);


  return (
    <Box p="2">
      {children}
    </Box>
  );
}

export default Layout;
