import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AdminZonePage from "../pages/AdminZonePage";
import FavoritesPage from "../pages/FavoritesPage";
import UserProfilePage from "../pages/UserProfilePage";
import AddCoinPage from "../pages/AddCoinPage";
import CoinProfilePage from "../pages/CoinProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";
import SuperProtectedRoute from "../components/SuperProtectedRoute";

import ROUTES from "./ROUTES";
import EditCoinPage from "../pages/EditCoinPage";
import CurrencyTradingPage from "../pages/CurrencyTradingPage";
import UserPortfolioPage from "../pages/UserPortfolioPage";
import CRMPage from "../pages/CRMPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      {/* <Route path={ROUTES.ADMINZONE} element={<AdminZonePage />} /> */}
      <Route
        path={ROUTES.ADMINZONE}
        element={
          <SuperProtectedRoute isAdmin={true} element={<AdminZonePage />} />
        }
      />
      <Route
        path={ROUTES.CRM}
        element={<SuperProtectedRoute isAdmin={true} element={<CRMPage />} />}
      />
      <Route
        path={ROUTES.FAV}
        element={<ProtectedRoute element={<FavoritesPage />} />}
      />
      <Route
        path="coinTrade/:id" // <-- Updated path to use dynamic parameter ':id'
        element={<ProtectedRoute element={<CurrencyTradingPage />} />}
      />
      <Route
        path={ROUTES.PORTFOLIO} // <-- Updated path to use dynamic parameter ':id'
        element={<ProtectedRoute element={<UserPortfolioPage />} />}
      />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<UserProfilePage />} />}
      />
      {<Route path="coinProfile/:id" element={<CoinProfilePage />} />}
      <Route
        path="editcoin/:id"
        element={
          <SuperProtectedRoute isAdmin={true} element={<EditCoinPage />} />
        }
      />
      <Route
        path="/addcoin"
        element={
          <SuperProtectedRoute isAdmin={true} element={<AddCoinPage />} />
        }
      />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
