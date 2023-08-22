import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

import CoinCardComponent from "../components/CoinCardComponent";

const HomePage = () => {
  const [coinsArr, setCoinsArr] = useState(null);

  useEffect(() => {
    axios
      .get("/coins")
      .then(({ data }) => {
        setCoinsArr(data);
      })
      .catch((err) => {
        // toast.error("Oops");
      });
  }, []);

  if (!coinsArr) {
    return <CircularProgress />;
  }

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
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
