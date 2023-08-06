import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ListItemComponent from "../components/ListItemComponent";

const AdminZonePage = () => {
  const [coinsArr, setCoinsArr] = useState([
    {
      _id: "0123",
      name: "BITCOIN",
      codeName: "BTC",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png",
      price: "29,000",
    },
    {
      _id: "0124",
      name: "BINANCE",
      codeName: "BNB",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS4EmOUlbDTRu0yrNO55Bj796fuKDhtUyDvQlGdBYA&s",
      price: "248",
    },
    {
      _id: "0125",
      name: "ETHEREUM",
      codeName: "ETH",
      img: "https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png",
      price: "2000",
    },
  ]);

  /*   const handleDeleteFromInitialData = (id) => {
    let updatedCoinsArr = JSON.parse(JSON.stringify(coinsArr));
    updatedCoinsArr = updatedCoinsArr.filter((coin) => coin._id !== id);
    setCoinsArr(updatedCoinsArr =>{updatedCoinsArr.filter((coin) => coin._id !== id);
    });
  };
 */

  const handleDeleteFromInitialData = (id) => {
    setCoinsArr((prevCoinsArr) =>
      prevCoinsArr.filter((coin) => coin._id !== id)
    );
  };

  return (
    <Box textAlign="center">
      <Typography
        variant="h1"
        style={{ fontFamily: "'Leckerli One', cursive" }}
      >
        ADMIN ZONE Page
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {coinsArr.map((item) => (
          <Grid item xs={4} sm={6} md={4} lg={7} key={item._id}>
            <ListItemComponent
              {...item}
              onDelete={() => handleDeleteFromInitialData(item._id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminZonePage;
