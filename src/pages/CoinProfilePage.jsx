import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";

const CoinProfilePage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(`/coins/${id}`);
        setCoinData(response.data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoinData();
  }, [id]);

  if (!coinData) {
    return <CircularProgress />;
  }

  return (
    <Box textAlign="center">
      <Typography
        variant="h1"
        style={{ fontFamily: "'Leckerli One', cursive" }}
      >
        {coinData.name} Profile
      </Typography>
      {coinData.image && coinData.image.url && (
        <img
          src={coinData.image.url}
          alt={`Logo of ${coinData.name}`}
          style={{ maxWidth: "100%", maxHeight: "150px", marginTop: "10px" }}
        />
      )}

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">Name: {coinData.name}</Typography>
          <Typography variant="h5">CODE: {coinData.codeName}</Typography>
          <Typography variant="h5">Price: ${coinData.price} </Typography>
          <Typography variant="h5">ABOUT: ${coinData.description} </Typography>
          {/* Add other properties as needed */}
        </Grid>
        {/* Add more Grid items for other details */}
      </Grid>
    </Box>
  );
};

export default CoinProfilePage;
