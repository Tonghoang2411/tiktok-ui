import RoutesConfig from '../config/routes.js'
import Home from "../pages/Home";
import Following from "../pages/Following";
import Profile from "../pages/Profile";
import Upload from "../pages/Upload";
import HeaderOnly from "../components/Layout/HeaderOnly";

const publicRoutes= [
    { path: RoutesConfig.home, component: Home},
    { path: RoutesConfig.following, component: Following},
    { path: RoutesConfig.profile, component: Profile},
    { path: RoutesConfig.upload, component: Upload,layout:HeaderOnly}
]

const privateRoutes = []

export {publicRoutes, privateRoutes};