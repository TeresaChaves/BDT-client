import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import ServicesListPage from "../pages/ServicesListPage/ServicesListPage"
import ServiceDetailsPage from "../pages/ServicesDetailsPage/ServicesDetailsPage"
import Profile from "../pages/ProfilePage/ProfilePage"
import SignupPage from "../pages/SignupPage/SignupPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import PrivateRoute from "./PrivateRoute"
import HireServicePage from "../pages/HireService/HireServicePage"


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios" element={<ServicesListPage />} />

            {/* <Route path="/servicios/editar-servicio/:service_id" element={<p>EDITAR</p>} /> */}
            <Route path="/servicio/contratar" element={<HireServicePage />} />
            <Route path="/usuario/registro" element={<SignupPage />} />
            <Route path="/usuario/iniciar-sesion" element={<LoginPage />} />
            <Route path="/servicios/detalles/:service_id" element={<ServiceDetailsPage />} />


            <Route element={<PrivateRoute />}>
                <Route path="/usuario/mi-perfil" element={<Profile />} />
                <Route path="/servicios/editar-servicio/:service_id" element={<p>EDITAR</p>} />
            </Route>

            <Route path="/*" element={<p>404</p>} />
        </Routes>

    )
}

export default AppRoutes