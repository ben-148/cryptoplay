import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import CoinCardComponent from "../components/CoinCardComponent";

const HomePage = () => {
  const coinsArr = [
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
              {...item}
              /*               id={item._id}
              name={item.name}
              codeName={item.codeName}
              price={item.price}
              img={item.img} */
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
