import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import AdminZonePage from "../pages/AdminZonePage";
import ROUTES from "./ROUTES";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.ADMINZONE} element={<AdminZonePage />} />
    </Routes>
  );
};

export default Router;
