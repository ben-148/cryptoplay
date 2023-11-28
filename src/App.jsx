import React from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

/* import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AdminZonePage from "./pages/AdminZonePage";
 */ import Router from "./routes/Router";
import { useSelector } from "react-redux";

import MuiNavbar from "./components/Navbar/MuiNavbar";
import { createTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLoggedIn from "./hooks/useLoggedIn";

const light = {
  palette: {
    mode: "light",
    primary: {
      main: red[500],
    },
    secondary: {
      main: blue[500],
    },
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loggedIn = useLoggedIn();
  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);

  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  // const theme = createTheme(light);

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />

      <Container>
        <header>
          <MuiNavbar />
        </header>
        <main>{isLoading ? <CircularProgress /> : <Router />}</main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
