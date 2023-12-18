// Featured.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";
import "./Featured.css";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Featured = () => {
  const [data, setData] = useState(null);
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  const navigate = useNavigate();

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!data) return null;

  return (
    <div className={`featured ${isDarkTheme ? "dark-mode" : ""}`}>
      <div className="container">
        <div className="left">
          <h2>Explore top Crypto's Like Bitcoin, Ethereum, and Dogecoin</h2>
          <p>
            See our all available assets Cryptocurrencies that you can trade!
          </p>
          <button className="btn" onClick={() => navigate("/trade")}>
            SEE MORE COINS
          </button>
        </div>

        <div className="right">
          {data.slice(0, 6).map((coinData, index) => (
            <div className="card" key={index}>
              <div className="top">
                <img src={coinData.image} alt="" />
              </div>
              <div>
                <h5>{coinData.name}</h5>
                <p>${coinData.current_price.toLocaleString()}</p>
              </div>
              <span
                className={
                  coinData.price_change_percentage_24h < 0 ? "red" : "green"
                }
              >
                {coinData.price_change_percentage_24h < 0 ? (
                  <FiArrowDown className="icon" />
                ) : (
                  <FiArrowUpRight className="icon" />
                )}
                {coinData.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
