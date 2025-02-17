import React, { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log("Intentando conectar con WebSocket...");
        const socket = new WebSocket("ws://localhost:3000"); // Ajusta el puerto si es necesario

        socket.onopen = () => {
            console.log("Conectado al WebSocket");
            setWs(socket);
        };

        socket.onmessage = (event) => {
            console.log("Mensaje recibido:", event.data);
            setMessages((prevMessages) => {
                console.log("Mensajes antes de añadir el nuevo:", prevMessages);
                return [...prevMessages, event.data];
            });
        };

        socket.onclose = () => {
            console.log("Desconectado del WebSocket");
        };

        socket.onerror = (error) => {
            console.error("Error de WebSocket:", error);
        };

        return () => {
            console.log("Cerrando conexión WebSocket...");
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ ws, messages, setMessages }}>
            {children}
        </WebSocketContext.Provider>
    );
};
