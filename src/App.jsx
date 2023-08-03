import logo from "./logo.svg";
import "./App.css";
import { Container } from "@mui/material";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AdminZonePage from "./pages/AdminZonePage";

function App() {
  return (
    <Container>
      {/* <HomePage /> */}
      {/* <RegisterPage /> */}
      <AdminZonePage />
    </Container>
  );
}

export default App;
