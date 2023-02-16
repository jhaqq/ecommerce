import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { themes } from './theme'

import cartReducer from './state'
import App from './App';
import './index.css';

const store = configureStore({
    reducer: { cart: cartReducer }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);