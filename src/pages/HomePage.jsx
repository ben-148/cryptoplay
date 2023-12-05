import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import useQueryParams from "../hooks/useQueryParams";

import CoinCardComponent from "../components/CoinCardComponent";

const HomePage = () => {
  const [originalCoinsArr, setOriginalCoinsArr] = useState(null);
  const [coinsArr, setCoinsArr] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState({}); // Added state for favorite status

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
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
