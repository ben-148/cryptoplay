import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import CoinsManagmentPage from "../pages/CoinsManagmentPage";
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
import UserFromCRMPage from "../pages/UserFromCRMPage";
import AdminBoxPage from "../pages/AdminBoxPage";
import AboutPage from "../pages/AboutPage";
import Home2 from "../pages/HomePage2.jsx";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path="home2" element={<Home2 />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />

      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      {/* <Route
        path={ROUTES.SANDBOX}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false || true}
            element={<SandboxPage />}
          />
        }
      >
        <Route path="nr" element={<NestedRoutePage />}>
          <Route path="nestedpage1" element={<NestedPage1 />} />
          <Route path="nestedpage2" element={<NestedPage2 />} />
        </Route>
        <Route path="rerender" element={<ReRenderPage />} />
        <Route path="redux1" element={<RP1 />} />
        <Route path="redux2" element={<RP2 />} />
      </Route> */}

      {/* <Route path={ROUTES.ADMINZONE} element={<CoinsManagmentPage />} /> */}
      <Route
        path={ROUTES.ADMINZONE}
        element={
          <SuperProtectedRoute isAdmin={true} element={<AdminBoxPage />} />
        }
      >
        <Route path="coinsManagment" element={<CoinsManagmentPage />} />
        <Route path="crm" element={<CRMPage />}>
          {/* <Route path="profile/:id" element={<UserFromCRMPage />} /> */}
        </Route>
      </Route>

      <Route
        path={ROUTES.PROFILECRM + "/:id"}
        element={
          <SuperProtectedRoute isAdmin={true} element={<UserFromCRMPage />} />
        }
      />

      {/* <Route path={ROUTES.PROFILECRM} element={<UserFromCRMPage />} /> */}

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
