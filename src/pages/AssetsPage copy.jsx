import { Box, CircularProgress, Grid, Typography, Button } from "@mui/material";
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
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" for descending order, "asc" for ascending order

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

        console.log("Server Data:", serverData);
        filterFunc(serverData);
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
  }, []);

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

  const handleSortByMarketCap = () => {
    const sortedCoinsArr = [...coinsArr];

    // Sort the array based on market_cap
    sortedCoinsArr.sort((a, b) => {
      const marketCapA = a.market_cap;
      const marketCapB = b.market_cap;

      if (sortOrder === "desc") {
        return marketCapB - marketCapA; // Descending order
      } else {
        return marketCapA - marketCapB; // Ascending order
      }
    });

    // Update the coinsArr state with the sorted array
    setCoinsArr(sortedCoinsArr);

    // Toggle the sorting order for the next click
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
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
      <p>"Powered by CoinGecko"</p>
      <Typography variant="body1">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSortByMarketCap}
        >
          Sort by Market Cap (
          {sortOrder === "desc" ? "Highest to Lowest" : "Lowest to Highest"})
        </Button>
      </Typography>

      <br></br>
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
