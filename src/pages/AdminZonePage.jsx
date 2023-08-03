import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import ListItemComponent from "../components/ListItemComponent";

const AdminZonePage = () => {
  const cardsArr = [
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
  ];

  return (
    <Box textAlign="center">
      <Typography variant="h1">ADMIN ZONE Page</Typography>

      <List>
        {cardsArr.map((item) => (
          <ListItem key={item._id}>
            <ListItemComponent
              img={item.img}
              name={item.name}
              codeName={item.codeName}
              price={item.price}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminZonePage;
