import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AdminZonePage from "../pages/AdminZonePage";
import FavoritesPage from "../pages/FavoritesPage";

import ROUTES from "./ROUTES";
import EditCoinPage from "../pages/EditCoinPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ADMINZONE} element={<AdminZonePage />} />
      <Route path={ROUTES.FAV} element={<FavoritesPage />} />
      <Route path="editcoin/:id" element={<EditCoinPage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
