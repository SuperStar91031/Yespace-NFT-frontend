import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './themes';
import { BASE_PATH } from './config';
import { persister, store } from 'store';
import Snackbar from 'components/Snackbar';
import 'assets/scss/style.scss';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <BrowserRouter basename={BASE_PATH}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <Snackbar />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
