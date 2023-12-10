import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import { toast } from "react-toastify";

import useQueryParams from "../hooks/useQueryParams";

import CoinCardComponent from "../components/CoinCardComponent";

const HomePage = () => {
  const [originalCoinsArr, setOriginalCoinsArr] = useState(null);
  const [coinsArr, setCoinsArr] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState({}); // Added state for favorite status

  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  let qparams = useQueryParams();
  const navigate = useNavigate();

  const filterFunc = useCallback(
    (data) => {
      if (!coinsArr && !data) {
        return;
      }
      let filter = "";
      if (qparams.filter) {
        filter = qparams.filter.toLowerCase(); // Convert search input to lowercase
      }
      if (!coinsArr && data) {
        setOriginalCoinsArr(data);
        setCoinsArr(
          data.filter(
            (coin) =>
              coin.name.toLowerCase().startsWith(filter) || // Convert data to lowercase for comparison
              coin.codeName.toLowerCase().startsWith(filter)
          )
        );
        return;
      }
      if (originalCoinsArr) {
        let newOriginalCoinsArr = JSON.parse(JSON.stringify(originalCoinsArr));
        setCoinsArr(
          newOriginalCoinsArr.filter(
            (coin) =>
              coin.name.toLowerCase().startsWith(filter) || // Convert data to lowercase for comparison
              coin.codeName.toLowerCase().startsWith(filter)
          )
        );
      }
    },
    [originalCoinsArr, qparams.filter]
  );

  useEffect(() => {
    axios
      .get("/coins")
      .then(({ data }) => {
        filterFunc(data);
        setFavoriteStatus(
          data.reduce(
            (status, card) => ({
              ...status,
              [card._id]: card.likes.includes(payload?._id),
            }),
            {}
          )
        );
      })
      .catch((err) => {
        toast.error("Oops");
      });
  }, [filterFunc]);

  useEffect(() => {
    filterFunc();
  }, [filterFunc, qparams.filter]);

  if (!coinsArr) {
    return <CircularProgress />;
  }

  const coinProfileClick = (id) => {
    navigate(`/coinProfile/${id}`);
  };
  const buyBtnClick = (id) => {
    navigate(`/coinTrade/${id}`);
  };

  const handleLikeFromInitialCardsArr = async (id) => {
    try {
      const response = await axios.patch("coins/coin-like/" + id);
      const updatedStatus = !favoriteStatus[id]; // Calculate the updated favorite status
      setFavoriteStatus((prevStatus) => ({
        ...prevStatus,
        [id]: updatedStatus,
      }));
      const toastMessage = updatedStatus
        ? "🦄 Card added to favorites :)"
        : "🦄 Card removed from favorites ";
      toast.success(toastMessage);
    } catch (err) {
      toast.error("error when liking", err.response.data);
    }
  };

  return (
    <Box textAlign="center">
      <Typography
        variant="h1"
        style={{ fontFamily: "'Leckerli One', cursive" }}
      >
        CryptoPlay
      </Typography>
      <Typography
        variant="h2"
        style={{
          fontFamily: "'Playfair Display', serif",
        }}
      >
        your crypto EXCHAGNE{" "}
      </Typography>
      <Typography
        variant="h4"
        style={{ fontFamily: "'Montserrat', sans-serif", marginBottom: "16px" }}
      >
        BUY SOME CRYPTO{" "}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {coinsArr.map((item) => (
          <Grid item xs={4} sm={6} md={4} lg={3} key={item._id + Date.now()}>
            <CoinCardComponent
              // {...item}
              id={item._id}
              name={item.name}
              codeName={item.codeName}
              price={item.price}
              img={item.image.url}
              onImageClick={coinProfileClick}
              onBuyClick={buyBtnClick}
              onLike={handleLikeFromInitialCardsArr}
              isFav={favoriteStatus[item._id]}
              loggedIn={payload}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

/* // Assume the users are stored in an array
let users = [
  {
    // User 1 details
    // ...
    balance: 1000, // Initial balance in USDT
    portfolio: {}, // User's portfolio
  },
  {
    // User 2 details
    // ...
    balance: 1000,
    portfolio: {},
  },
  // ... other users
];

// Function to perform a trade
const trade = (user, cryptoSymbol, amount) => {
  const cryptoPrice = 10; // Replace with actual price retrieval logic

  // Calculate the cost of the trade
  const tradeCost = amount * cryptoPrice;

  // Check if the user has sufficient balance
  if (user.balance >= tradeCost) {
    // Deduct the cost from the user's balance
    user.balance -= tradeCost;

    // Add the crypto to the user's portfolio
    if (user.portfolio[cryptoSymbol]) {
      // If the user already has this crypto, add to the existing amount
      user.portfolio[cryptoSymbol] += amount;
    } else {
      // Otherwise, create a new entry in the portfolio
      user.portfolio[cryptoSymbol] = amount;
    }

    console.log(`Trade successful. ${amount} ${cryptoSymbol} added to ${user.name.firstName}'s portfolio.`);
  } else {
    console.log(`Insufficient balance for ${user.name.firstName} to make the trade.`);
  }
};

// Example usage
const user1 = users[0];
trade(user1, 'BTC', 5); // Trade 5 BTC for user1
 */

export default HomePage;
