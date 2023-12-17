import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";

const AboutPage = () => {
  const cardStyle = {
    display: "flex",
    marginBottom: "16px",
  };

  const mediaStyle = {
    width: 300,
    objectFit: "cover",
  };

  const contentStyle = {
    flex: 1,
  };

  return (
    <div style={{ padding: "24px" }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        style={{ marginBottom: "16px" }}
      >
        Welcome to CryptoPlay Learning Hub
      </Typography>
      <Typography variant="body1" paragraph>
        Dive into the exciting world of cryptocurrencies with CryptoPlay, your
        ultimate destination for crypto education and trading. As part of my
        final project at HACKERU college, I present to you a platform built with
        React, Node.js, and Mui Material.
      </Typography>

      {/* Coin Information Section */}
      <Typography variant="h5" component="h2" style={{ marginBottom: "16px" }}>
        Explore Available Coins
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card style={cardStyle}>
            <CardMedia
              style={mediaStyle}
              component="img"
              alt="Bitcoin"
              image="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029"
              title="Bitcoin"
            />
            <CardContent style={contentStyle}>
              <Typography variant="h6" component="h3">
                Bitcoin (BTC)
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Learn about Bitcoin and other available coins. Use your 1000
                USDT to kickstart your crypto journey.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more cards for other coins */}
      </Grid>

      {/* Trading and Portfolio Section */}
      <Typography variant="h5" component="h2" style={{ marginBottom: "16px" }}>
        Trade and Track Your Portfolio
      </Typography>
      <Typography variant="body1" paragraph>
        Utilize your allocated 1000 USDT to trade various coins. Track your
        portfolio's performance and witness the excitement of crypto trading in
        real-time.
      </Typography>
      <Button variant="contained" color="primary">
        Start Trading
      </Button>

      {/* Contact Information */}
      <Typography variant="body1" style={{ marginTop: "16px" }}>
        This project is my final endeavor in my Full Stack Web studies. If you
        have any questions or job opportunities, feel free to reach out to me at{" "}
        <a href="mailto:benoved9@gmail.com">benoved9@gmail.com</a>. Thank you
        for being a part of CryptoPlay!
      </Typography>
    </div>
  );
};

export default AboutPage;
