import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {Provider} from 'react-redux';
import {registerSW} from 'virtual:pwa-register';
import store from './redux/store';

import Prayers from './pages/prayers';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App/>}/>
              <Route path="/prayers" element={<Prayers/>}/>
            </Routes>
          </Router>
        </ChakraProvider>
      </Provider>
    </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  registerSW();
}
