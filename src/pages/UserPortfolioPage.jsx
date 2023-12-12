import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserPortfolioPage = () => {
  const userId = useSelector((bigPie) =>
    bigPie.authSlice.payload?.hasOwnProperty("_id")
      ? bigPie.authSlice.payload._id
      : null
  );

  const [userOwnedCoins, setUserOwnedCoins] = useState([]);
  const [userPorfolio, setUserPorfolio] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userData } = await axios.get(`/users/user/info`);
        const portfolio = Array.isArray(userData.portfolio)
          ? userData.portfolio
          : [];
        const { data: allCoinsData } = await axios.get(`/coins`);
        const userOwnedCoins = allCoinsData.filter((coin) =>
          portfolio.some((userCoin) => userCoin.coinId === coin._id)
        );

        setUserOwnedCoins(userOwnedCoins);
        setUserPorfolio(portfolio);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const tradeBtnClick = (id) => {
    navigate(`/coinTrade/${id}`);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" mb={4}>
          Your Portfolio
        </Typography>
        {userOwnedCoins.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>LOGO</TableCell>
                  <TableCell>Coin</TableCell>
                  <TableCell>Current Price</TableCell>
                  <TableCell>Amount </TableCell>
                  <TableCell>Worth in $ </TableCell>
                  <TableCell>ACTION </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userOwnedCoins.map((coin) => {
                  const userCoin = userPorfolio.find(
                    (userCoin) => userCoin.coinId === coin._id
                  );
                  const worth = userCoin
                    ? parseFloat(coin.price) * parseFloat(userCoin.amount)
                    : 0;

                  return (
                    <TableRow key={coin._id}>
                      <TableCell>
                        <img
                          src={coin.image.url}
                          alt={coin.image.alt}
                          style={{ width: "20px", height: "20px" }}
                        />
                      </TableCell>
                      <TableCell>{coin.name}</TableCell>
                      <TableCell>$ {coin.price}</TableCell>
                      <TableCell>
                        {userCoin ? userCoin.amount : "N/A"} {coin.codeName}
                      </TableCell>
                      <TableCell>$ {worth.toFixed(2)} </TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => tradeBtnClick(coin._id)}
                        >
                          TRADE
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">
            You don't have any coins in your portfolio yet.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default UserPortfolioPage;
