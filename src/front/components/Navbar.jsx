import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Llamar a la acción de logout del store
        dispatch({ type: "logout" });
        // Redirigir al login
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    {!store.token ? (
                        // Si NO está logueado, mostrar botones de Login y Signup
                        <>
                            <Link to="/login">
                                <button className="btn btn-primary me-2">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-success">Signup</button>
                            </Link>
                        </>
                    ) : (
                        // Si SÍ está logueado, mostrar email y botón de Logout
                        <>
                            <span className="me-3">
                                Hola, <strong>{store.user?.email}</strong>
                            </span>
                            <Link to="/private" className="me-2">
                                <button className="btn btn-info">Private</button>
                            </Link>
                            <button 
                                className="btn btn-danger" 
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};