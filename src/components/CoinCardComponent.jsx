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
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const CoinCardComponent = ({
  img,
  name,
  codeName,
  price,
  id,
  loggedIn,
  isFav,
  onLike,
  onBuyClick,
  onImageClick,
}) => {
  const handleLikeBtnClick = () => {
    onLike(id);
  };

  const handleImageBtnClick = () => {
    onImageClick(id);
  };
  const handleBuyBtnClick = () => {
    onBuyClick(id);
  };

  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          onClick={handleImageBtnClick}
          style={{ height: "120px" }}
        />
        <CardHeader title={name} subheader={codeName} />
        {/* <CardHeader subheader={codeName} /> */}
      </CardActionArea>

      <CardContent>
        <Typography variant="body1">Price: $ {price}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="text" color="primary" onClick={handleBuyBtnClick}>
          <CurrencyExchangeIcon />
          TRADE
        </Button>

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
