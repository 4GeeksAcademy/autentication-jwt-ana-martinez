import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getBackendUrl } from "../component/BackendURL";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Validar que el usuario esté autenticado
        const validateToken = async () => {
            // Si no hay token, redirigir al login
            if (!store.token) {
                navigate("/login");
                return;
            }

            try {
                // Verificar que el token sea válido haciendo una petición al backend
                const response = await fetch(`${getBackendUrl()}/api/private`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${store.token}`
                    }
                });

                if (!response.ok) {
                    // Token inválido o expirado
                    navigate("/login");
                } else {
                    // Token válido
                    setLoading(false);
                }
            } catch (err) {
                setError("Error de conexión");
                console.error("Error:", err);
                setLoading(false);
            }
        };

        validateToken();
    }, [store.token, navigate]);

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">
                                Página Privada
                            </h2>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <div className="alert alert-success" role="alert">
                                <h4 className="alert-heading">¡Bienvenido!</h4>
                                <p>Has accedido correctamente a la página privada.</p>
                                <hr />
                                <p className="mb-0">
                                    <strong>Email:</strong> {store.user?.email}
                                </p>
                                <p className="mb-0">
                                    <strong>ID de usuario:</strong> {store.user?.id}
                                </p>
                            </div>

                            <div className="mt-4">
                                <h5>Información del Token:</h5>
                                <div className="card bg-light">
                                    <div className="card-body">
                                        <p className="small text-muted mb-0" style={{ wordBreak: "break-all" }}>
                                            {store.token}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
