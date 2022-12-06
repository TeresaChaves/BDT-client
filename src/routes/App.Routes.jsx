import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login/Login"
import HomePage from "../pages/HomePage/HomePage"
import Profile from "../pages/Profile/Profile"
import ServicesListPage from "../pages/ServicesListPage/ServicesListPage"


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios" element={<ServicesListPage />} />
            <Route path="/servicios/detalles/:service_id" element={<p>DETALLE</p>} />
            <Route path="/servicios/nuevo-servicio" element={<p>NUEVO SERVICIO</p>} />
            <Route path="/servicios/editar-servicio/:service_id" element={<p>EDITAR</p>} />
            <Route path="/servicios/contratar/:service_id" element={<p>CONTRATAR</p>} />
            <Route path="/usuario/registro" element={<p>registro</p>} />
            <Route path="/usuario/iniciar-sesion" element={<Login></Login>} />
            <Route path="/usuario/mi-perfil" element={<Profile></Profile>} />
            <Route path="/usuario/cerrar-sesion" element={<p>cerrar sesion</p>} />

            <Route path="/*" element={<p>404</p>} />
        </Routes>

    )
}

export default AppRoutes