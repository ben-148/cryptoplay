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
  const [updateCoinAmount, setupdateCoinAmount] = useState(null);
  const [user, setUser] = useState(null);

  //   console.log(
  //     "🚀 ~ file: CurrencyTradingPage.jsx:21 ~ CurrencyTradingPage ~ user:",
  //     user
  //   );
  const [tradeAmount, setTradeAmount] = useState("");

  useEffect(() => {
    // Fetch coin data by id
    axios
      .get(`/coins/${id}`)
      .then((response) => {
        console.log(
          "🚀 ~ file: CurrencyTradingPage.jsx:32 ~ useEffect ~ response:",
          response
        );
        return setCoinData(response.data);
      })
      .catch((error) => console.error("Error fetching coin data:", error));

    // Fetch user data separately
    axios
      .get(`/users/user/info`)
      .then((response) => {
        console.log(
          "🚀 ~ file: CurrencyTradingPage.jsx:45 ~ useEffect ~ response:",
          response
        );
        let { portfolio } = response.data;
        console.log(
          "🚀 ~ file: CurrencyTradingPage.jsx:51 ~ .then ~ portfolio:",
          portfolio
        );
        setupdateCoinAmount(
          portfolio.find((item) => item.coinId === id)
            ? portfolio.find((item) => item.coinId === id).amount
            : 0
        );

        return setUser(response.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);

  const handleTrade = async () => {
    const tradeAmountInCoins = Number(tradeAmount) / Number(coinData.price);
    console.log(
      "🚀 ~ file: CurrencyTradingPage.jsx:55 ~ handleTrade ~ Number(tradeAmount):",
      Number(tradeAmount)
    );

    console.log(
      "🚀 ~ file: CurrencyTradingPage.jsx:55 ~ handleTrade ~ Number(coinData.price):",
      Number(coinData.price)
    );
    // console.log(
    //   "🚀 ~ file: CurrencyTradingPage.jsx:55 ~ handleTrade ~ Number(coinData.price):",
    //   tradeAmountInCoins
    // );
    console.log(
      "🚀 ~ file: CurrencyTradingPage.jsx:51 ~ handleTrade ~ tradeAmountInCoins:",
      tradeAmountInCoins
    );

    try {
      const response = await axios.put(`/users/trade/${id}`, {
        coinId: id,
        tradeAmount: Number(tradeAmount),
        userId: user._id,
        coinAmount: Number(tradeAmountInCoins),
      });
      const updatedUser = response.data.updatedUser;
      console.log(
        "🚀 ~ file: CurrencyTradingPage.jsx:93 ~ handleTrade ~ updatedUser:",
        updatedUser
      );
      let { portfolio } = updatedUser;
      console.log(
        "🚀 ~ file: CurrencyTradingPage.jsx:98 ~ handleTrade ~ portfolio:",
        portfolio
      );

      /*       let coinAmountAfterTrade = portfolio.map((coin) => {
          if (coin.coinId === id) {
              return { ...coin, amount: coin.amount + Number(tradeAmountInCoins) };
            }
            return coin;
        });
        console.log(
            "🚀 ~ file: CurrencyTradingPage.jsx:96 ~ coinAmountAfterTrade ~ coinAmountAfterTrade:",
            coinAmountAfterTrade
            );
            */

      setUser(updatedUser);
      setTradeAmount("");
      const coin = updatedUser.portfolio.find((item) => item.coinId === id);
      console.log(
        "🚀 ~ file: CurrencyTradingPage.jsx:119 ~ handleTrade ~ coin:",
        coin
      );
      const updatedCoinAmount = (await coin) ? coin.amount : 0;

      setupdateCoinAmount(updatedCoinAmount);

      toast.success("Trade successful");
    } catch (error) {
      console.error("Error performing trade:", error);
      toast.error("Error performing trade");
    }
  };

  //   const getCoinAmountFromPortfolio = (coinId, portfolio) => {
  //     const coin = portfolio.find((item) => item.coinId === coinId);
  //     return coin ? coin.amount : 0;
  //   };

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
                    {/* Your Amount: {coinData.amountInUserPortfolio || 0} */}
                    your amount: {updateCoinAmount} {coinData.codeName}
                  </Typography>
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
                    onClick={handleTrade}
                  >
                    Trade
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
