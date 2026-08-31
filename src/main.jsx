import {createRoot} from 'react-dom/client';
import './app/platform/material-components.js';
import App from './App.jsx';
import {gateFonts} from './app/platform/fonts.js';
import {registerServiceWorker} from './app/platform/pwa.js';

const rootElement = document.documentElement;
const appRoot = document.getElementById('root');

gateFonts(rootElement);

if (appRoot) {
    createRoot(appRoot).render(<App />);
}

registerServiceWorker();
