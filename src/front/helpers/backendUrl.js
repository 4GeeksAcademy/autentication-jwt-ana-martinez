export const getBackendUrl = () => {
    // Primero intenta obtener la URL de las variables de entorno
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    if (backendUrl) {
        console.log("Backend URL from env:", backendUrl);
        return backendUrl;
    }
    
    // Si no existe, construye la URL basándose en el hostname actual
    if (window.location.hostname === "localhost") {
        return "http://localhost:3001";
    }
    
    // Para Codespaces - CORREGIDO
    const hostname = window.location.hostname;
    
    // Si el hostname tiene "-3000.app.github.dev", reemplazarlo
    if (hostname.includes("-3000.app.github.dev")) {
        const backendHost = hostname.replace("-3000.app.github.dev", "-3001.app.github.dev");
        return `https://${backendHost}`;
    }
    
    // Si el hostname solo tiene ".github.dev", añadir el puerto
    if (hostname.includes(".github.dev")) {
        const backendHost = hostname.replace(".github.dev", "-3001.app.github.dev");
        return `https://${backendHost}`;
    }
    
    // Fallback
    return "http://localhost:3001";
};
