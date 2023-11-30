import * as React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { NavLink, useNavigate } from "react-router-dom";
import SearchPartial from "./SearchPartial";
import ROUTES from "../../routes/ROUTES";
import { darkThemeActions } from "../../store/darkTheme";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../store/auth";
import ProfileComponent from "./ProfileComponent";
import MuiNavBarHambComponent from "./MuiNavBarHambComponent";

// access to all
const pages = [
  {
    label: "Home",
    url: ROUTES.HOME,
  },
  { label: "About", url: ROUTES.ABOUT },
  /*   { label: "ADMIN", url: ROUTES.ADMINZONE },
  { label: "register", url: ROUTES.REGISTER },
  { label: "login", url: ROUTES.LOGIN },
  {
    label: "Favorites",
    url: ROUTES.FAV,
  }, */
];

// not logged in users
const notAuthPages = [
  {
    label: "Register",
    url: ROUTES.REGISTER,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];

// logged in users
const authedPages = [
  {
    label: "Favorites",
    url: ROUTES.FAV,
  },
];

const avatarMenu = [
  {
    label: "Profile",
    url: ROUTES.PROFILE,
  },
  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
];

// biz pages
const bizPage = [
  {
    label: "My-Cards",
    url: ROUTES.MYCARDS,
  },
];

const adminPages = [
  // {
  //   label: "Sand Box",
  //   url: ROUTES.SANDBOX,
  // },
  // {
  //   label: "CRM",
  //   url: ROUTES.CRM,
  // },
  { label: "ADMIN", url: ROUTES.ADMINZONE },
];

const MuiNavbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const navigate = useNavigate();
  const isAdmin = payload && payload.isAdmin;
  // const isBiz = payload && payload.biz;

  const anchorElRef = useRef(null);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log("event.currentTarget:", event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  /*   React.useEffect(() => {
    // Set anchorElNavProp to the hamburger icon button when the component mounts
    setAnchorElNav(document.getElementById("hamburger-icon-button"));
  }, []);
 */
  /*   React.useEffect(() => {
    setTimeout(() => setAnchorElNav(anchorElNav?.current), 1);
  }, [anchorElNav]);
 */

  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  const renderPages = () => {
    const allPages = [...pages];

    if (isLoggedIn) {
      allPages.push(...authedPages);
    } else {
      allPages.push(...notAuthPages);
    }

    // if (isBiz) {
    //   allPages.push(...bizPage);
    // }

    if (isAdmin) {
      allPages.push(...adminPages);
    }

    return allPages.map((page) => (
      <NavLinkComponent key={page.url} {...page} />
    ));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: "none", md: "inline" },
              cursor: "pointer",
            }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/favicon.ico`}
              alt="Favicon"
              style={{ marginRight: "8px", width: "24px", height: "24px" }}
            />
          </Typography>
          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {renderPages()}
          </Box>
          <SearchPartial />
          <Box
            sx={{
              my: 2,
              p: 1,
              cursor: "pointer",
            }}
          >
            {isDarkTheme ? (
              <LightModeIcon onClick={changeTheme} />
            ) : (
              <ModeNightIcon onClick={changeTheme} />
            )}{" "}
          </Box>
          {/* hamburger with menu */}
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              id="hamburger-icon-button" // Add this line
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <MuiNavBarHambComponent
              anchorElNavProp={anchorElNav}
              handleCloseNavMenuProp={handleCloseNavMenu}
              pagesArray={pages}
              isLoggedInProp={isLoggedIn}
              authedPagesProp={authedPages}
              logoutClickProp={logoutClick}
              notAuthPagesProp={notAuthPages}
              isAdminProp={isAdmin}
              adminPagesArr={adminPages}
            />
          </Box>
          {isLoggedIn && (
            <ProfileComponent
              profilePages={avatarMenu}
              logoutClickProp={logoutClick}
            />
          )}{" "}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MuiNavbar;
