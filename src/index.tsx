import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { registerSW } from 'virtual:pwa-register';

import 'react-toastify/dist/ReactToastify.css';

registerSW({
  onOfflineReady() {
    toast.info('App-Daten gespeichert. Sie ist jetzt offline nutzbar.', {
      position: 'bottom-center',
      autoClose: 5000,
    });
  },
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);
