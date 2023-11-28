import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { Fragment } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CoinCardComponent = ({
  img,
  name,
  codeName,
  price,
  id,
  loggedIn,
  isFav,
  onLike,
}) => {
  const handleLikeBtnClick = () => {
    onLike(id);
  };

  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia component="img" image={img} style={{ height: "120px" }} />
        <CardHeader title={name} subheader={codeName} />
        {/* <CardHeader subheader={codeName} /> */}
      </CardActionArea>

      <CardContent>
        <Typography variant="body1">Price: $ {price}</Typography>
      </CardContent>
      <CardActions>
        {loggedIn ? (
          <Fragment>
            {isFav ? (
              <Button onClick={handleLikeBtnClick}>
                <FavoriteIcon />
              </Button>
            ) : (
              <Button onClick={handleLikeBtnClick}>
                <FavoriteBorderIcon />
              </Button>
            )}
          </Fragment>
        ) : (
          ""
        )}
        <Button variant="text" color="primary">
          <CurrencyBitcoinIcon />
          BUY
        </Button>
      </CardActions>
    </Card>
  );
};

CoinCardComponent.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, // Update this to 'name'
  codeName: PropTypes.string.isRequired, // Update this to 'codeName'
  price: PropTypes.string.isRequired,
};

export default CoinCardComponent;
