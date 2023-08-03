import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Button,
  CardMedia,
} from "@mui/material";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

const ListItemComponent = ({
  img,
  name,
  codeName,
  price,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <CardMedia
            component="img"
            image={img}
            style={{ height: "50px", width: "50px", marginRight: "16px" }}
          />
        </ListItemIcon>
        <ListItemText
          primary={name}
          secondary={`Code Name: ${codeName} | Price: $${price}`}
        />
        <Button onClick={onEdit} variant="outlined" color="primary">
          Edit
        </Button>
        <Button onClick={onDelete} variant="outlined" color="secondary">
          Delete
        </Button>
      </ListItem>
      <Divider />
    </>
  );
};

ListItemComponent.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  codeName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListItemComponent;
