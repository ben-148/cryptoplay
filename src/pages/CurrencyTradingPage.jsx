// CurrencyTradingPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Input,
  Grid,
  CardHeader,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const CurrencyTradingPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [updateCoinAmount, setUpdateCoinAmount] = useState(null);
  const [user, setUser] = useState(null);
  const [tradeAmount, setTradeAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");

  useEffect(() => {
    // Fetch coin data by id
    axios
      .get(`/coins/${id}`)
      .then((response) => {
        setCoinData(response.data);
      })
      .catch((error) => console.error("Error fetching coin data:", error));

    // Fetch user data separately
    axios
      .get(`/users/user/info`)
      .then((response) => {
        const { portfolio } = response.data;
        setUpdateCoinAmount(
          portfolio.find((item) => item.coinId === id)
            ? portfolio.find((item) => item.coinId === id).amount
            : 0
        );

        setUser(response.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);

  // ...

  const handleTrade = async (action) => {
    try {
      let amountToTrade;
      if (action === "buy") {
        // Buying logic
        amountToTrade = Number(tradeAmount) / Number(coinData.price);
      } else if (action === "sell") {
        // Selling logic
        amountToTrade = Number(sellAmount);
      }

      const response = await axios.put(`/users/trade/${id}`, {
        coinId: id,
        tradeAmount: Number(tradeAmount),
        userId: user._id,
        coinAmount: amountToTrade,
        coinPrice: coinData.price,
        action,
      });
      const updatedUser = response.data.updatedUser;

      // Set the user state first
      setUser(updatedUser);
      setTradeAmount("");
      setSellAmount(""); // Clear the sell input
    } catch (error) {
      console.error("Error performing trade:", error);
      toast.error("Error performing trade");
    }
  };

  // useEffect to handle UI updates
  useEffect(() => {
    // Ensure that the user state is updated before updating the coin amount
    if (user) {
      const coin = user.portfolio.find((item) => item.coinId === id);
      const updatedCoinAmount = coin ? coin.amount : 0;
      setUpdateCoinAmount(updatedCoinAmount);
    }
  }, [user, id]);

  // ...

  return (
    <Box textAlign="center">
      <Typography variant="h3" mb={4}>
        Currency Trading
      </Typography>
      {coinData && user && (
        <>
          <Typography variant="h5" mb={2}>
            Trading {coinData.name} ({coinData.codeName})
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {/* Coin Card */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title={coinData.name}
                  subheader={coinData.codeName}
                  avatar={
                    <img
                      src={coinData.image.url}
                      alt={coinData.codeName}
                      width="40"
                      height="40"
                    />
                  }
                />
                <CardContent>
                  <Typography variant="body1">
                    Price: ${coinData.price}
                  </Typography>
                  <Typography variant="body1">
                    Your Amount: {updateCoinAmount} {coinData.codeName}
                  </Typography>
                  <Input
                    type="number"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    placeholder="Enter sell amount"
                    fullWidth
                    mb={2}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleTrade("sell")}
                  >
                    Sell
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* USDT Card */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="USDT"
                  avatar={
                    <img
                      src="https://w7.pngwing.com/pngs/520/303/png-transparent-tether-united-states-dollar-cryptocurrency-fiat-money-market-capitalization-bitcoin-logo-bitcoin-trade.png"
                      alt="USDT"
                      width="40"
                      height="40"
                    />
                  }
                />
                <CardContent>
                  <Typography variant="body1">
                    Your Amount: {user.amount}
                  </Typography>
                  <Input
                    type="number"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder="Enter trade amount"
                    fullWidth
                    mb={2}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleTrade("buy")}
                  >
                    Buy
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default CurrencyTradingPage;
