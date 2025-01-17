import React, { createContext, useState, useContext, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export function DarkModeProvider({ children }) {
    // Inicializar el estado con la preferencia almacenada o el valor predeterminado
    const [darkMode, setDarkMode] = useState(() => {
        const savedPreference = localStorage.getItem('darkMode');
        return savedPreference === 'true'; // Convertir string a boolean
    });

    // Actualizar el localStorage cada vez que darkMode cambie
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <div className={darkMode ? 'dark-mode' : ''}>
                {children}
            </div>
        </DarkModeContext.Provider>
    );
}
