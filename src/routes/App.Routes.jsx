import { Routes, Route } from "react-router-dom"
import Login from "../pages/LoginPage/LoginPage"
import HomePage from "../pages/HomePage/HomePage"
import ServicesListPage from "../pages/ServicesListPage/ServicesListPage"
import ServiceDetailsPage from "../pages/ServicesDetailsPage/ServicesDetailsPage"
import AddService from "../pages/AddServicePage/AddServicePage"
import Profile from "../pages/ProfilePage/ProfilePage"
import SignupPage from "../pages/SignupPage/SignupPage"


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios" element={<ServicesListPage />} />
            <Route path="/servicios/detalles/:service_id" element={<ServiceDetailsPage />} />
            <Route path="/servicios/nuevo-servicio" element={<AddService />} />
            <Route path="/servicios/editar-servicio/:service_id" element={<p>EDITAR</p>} />
            <Route path="/servicios/contratar/:service_id" element={<p>CONTRATAR</p>} />
            <Route path="/usuario/registro" element={<SignupPage />} />
            <Route path="/usuario/iniciar-sesion" element={<Login />} />
            <Route path="/usuario/mi-perfil" element={<Profile />} />
            <Route path="/usuario/cerrar-sesion" element={<p>cerrar sesion</p>} />

            <Route path="/*" element={<p>404</p>} />
        </Routes>

    )
}

export default AppRoutes