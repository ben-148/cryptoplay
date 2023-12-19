import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import "@fontsource/oswald";

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import CoinCardComponent from "../components/CoinCardComponent";

const AssetsPage = () => {
  const [originalCoinsArr, setOriginalCoinsArr] = useState(null);
  const [coinsArr, setCoinsArr] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState({}); // Added state for favorite status

  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  let qparams = useQueryParams();
  const navigate = useNavigate();
  let filter = qparams.filter || ""; // Initialize filter with an empty string if it's undefined

  const filterFunc = useCallback(
    (data) => {
      if (!coinsArr && !data) {
        return;
      }
      // let filter = "";
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
    const fetchData = async () => {
      try {
        // Fetch data from your server
        const serverResponse = await axios.get("/coins");
        const serverData = serverResponse.data;

        // Fetch data from the external API axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false' , { crossDomain: true } )
        const apiResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
              locale: "en",
            },
          }
        );
        const apiData = apiResponse.data;

        const combinedData = serverData.map((coinFromServer) => {
          const matchingApiCoin = apiData.find(
            (coinFromApi) =>
              coinFromApi.symbol.toLowerCase() ===
              coinFromServer.codeName.toLowerCase()
          );

          if (matchingApiCoin) {
            // Update values in the server data based on API data
            return {
              ...coinFromServer,
              price: matchingApiCoin.current_price,
              change24: matchingApiCoin.price_change_percentage_24h,
              // Add other keys and values as needed
            };
          }

          // If no match found, return the original server data
          return coinFromServer;
        });

        // Handle the combined data
        console.log("Combined Data:", combinedData);

        // Handle the fetched data
        console.log("Server Data:", serverData);
        console.log("API Data:", apiData);

        // Add your logic here to handle the fetched data

        // Continue with the rest of your logic, e.g., calling filterFunc
        filterFunc(combinedData);
        const updateCoinsOnServer = async () => {
          try {
            const response = await axios.patch("/coins/bulk-update", {
              coins: combinedData.map((coinData) => ({
                id: coinData._id,
                price: coinData.price,
                // price_change_percentage_24h:
                //   coinData.price_change_percentage_24h,
                // Add other fields as needed
              })),
            });

            console.log("Coins updated on server:", response.data);
          } catch (error) {
            console.error("Error updating coins on server:", error);
            // Add error handling logic if needed
          }
        };
        updateCoinsOnServer();

        // Set other state variables as needed
        setFavoriteStatus(
          serverData.reduce(
            (status, card) => ({
              ...status,
              [card._id]: card.likes.includes(payload?._id),
            }),
            {}
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        // Add error handling logic if needed
        toast.error("Oops");
      }
    };

    fetchData();
  }, [filterFunc, payload]);

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
    if (!payload) {
      toast.error("Please sign up or sign in to perform this action");
      return;
    }

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
        ? "🦄 coin added to favorites :)"
        : "🦄 coin removed from favorites ";
      toast.success(toastMessage);
    } catch (err) {
      toast.error("error when liking", err.response.data);
    }
  };

  return (
    <Box textAlign="center">
      <Typography
        variant="h1"
        style={{ fontWeight: 600, fontFamily: "'Oswald', sans-serif" }}
      >
        CryptoPlay
      </Typography>
      <Typography
        variant="h2"
        style={{
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Your EXCHANGE Playground
      </Typography>
      <Typography
        variant="h4"
        style={{
          fontFamily: "'Playfair Display', serif",
          marginBottom: "16px",
        }}
      >
        BUY SOME CRYPTO{" "}
      </Typography>
      {filter && <p>search results - {filter} </p>}
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
              change24={item.change24}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AssetsPage;
