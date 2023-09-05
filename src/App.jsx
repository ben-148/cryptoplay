import React from "react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
/* import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AdminZonePage from "./pages/AdminZonePage";
 */ import Router from "./routes/Router";
import MuiNavbar from "./components/Navbar/MuiNavbar";
import { createTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function App() {
  const theme = createTheme(light);

  return (
    <ThemeProvider theme={theme}>
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
        <main>
          <Router />
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
