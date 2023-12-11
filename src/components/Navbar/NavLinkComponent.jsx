import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import WalletIcon from "@mui/icons-material/Wallet"; // Import the WalletIcon

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  "&.active": {
    color: theme.palette.primary.gold,
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    transition: "background-color 0.3s ease",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1.2rem",
  color: theme.palette.text.gold,
  fontFamily: "'Roboto', sans-serif",
}));

const NavLinkComponent = ({ url, label, icon, ...rest }) => {
  return (
    <StyledNavLink to={url} {...rest}>
      <StyledTypography
        component="div"
        sx={{
          my: 2,
          display: "flex", // Make it a flex container
          alignItems: "center", // Align items at the center vertically
          p: 2,
        }}
      >
        {icon && <div style={{ marginRight: "8px" }}>{icon}</div>}
        {label}
      </StyledTypography>
    </StyledNavLink>
  );
};

export default NavLinkComponent;
