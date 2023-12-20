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
import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import NorthEastIcon from "@mui/icons-material/NorthEast";

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
  change24,
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

      <CardContent
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "flex-start",
      // }}
      >
        <Typography variant="body1">Price: $ {price}</Typography>
        <Typography variant="body1">
          24 hours:{" "}
          {change24 > 0 ? (
            <FiArrowUpRight style={{ color: "green" }} />
          ) : (
            <FiArrowDown style={{ color: "red" }} />
          )}
          <span style={{ color: change24 > 0 ? "green" : "red" }}>
            {change24.toFixed(2)}%
          </span>
        </Typography>
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
  price: PropTypes.number.isRequired,
};

export default CoinCardComponent;
