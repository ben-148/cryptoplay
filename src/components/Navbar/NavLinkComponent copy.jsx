import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import WalletIcon from "@mui/icons-material/Wallet"; // Import the WalletIcon
import "@fontsource/oswald";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 600,
  fontFamily: "'Oswald', sans-serif",
  color: theme.palette.text.gold, // Set the default text color

  "&.active": {
    color:
      theme.palette.mode === "dark" ? theme.palette.secondary.main : "#FFD700", // Set the text color for the active link
  },
}));
//ben
const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  "&.active": {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.primary.gold // Set the text color for the active link in dark mode to gold
        : "#FFD700",
    backgroundColor:
      theme.palette.mode === "dark" ? "#333" : theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    transition: "background-color 0.3s ease",
  },
}));

const NavLinkComponent = ({ url, label, icon, ...rest }) => {
  return (
    <StyledNavLink to={url} {...rest}>
      <StyledTypography
        component="div"
        className={rest.isActive ? "active" : ""}
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          p: 2,
        }}
      >
        {icon && (
          <div style={{ marginRight: "8px", marginTop: "8px" }}>{icon}</div>
        )}
        {label}
      </StyledTypography>
    </StyledNavLink>
  );
};

export default NavLinkComponent;
