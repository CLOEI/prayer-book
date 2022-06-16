import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {Provider} from 'react-redux';
import {registerSW} from 'virtual:pwa-register';
import {AnimatePresence} from 'framer-motion';
import store from './redux/store';

import Prayers from './pages/prayers';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <AnimatePresence exitBeforeEnter initial={false}>
          <ChakraProvider>
            <Router>
              <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/prayers" element={<Prayers/>}/>
              </Routes>
            </Router>
          </ChakraProvider>
        </AnimatePresence>
      </Provider>
    </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  registerSW();
}
