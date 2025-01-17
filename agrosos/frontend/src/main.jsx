import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './i18n'; // Importa la configuración de i18n aquí

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
