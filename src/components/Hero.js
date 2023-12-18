import React from "react";
import "./Hero.css";
// import Crypto from "../assets/hero-img.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        {/* Left Side */}
        <div className="left">
          <p>Buy & Sell Crypto using the money that we giving you!</p>
          <h1>CryptoPlay - your crypto playground</h1>
          <p>
            your opportunity to learn and trade crypto without losing your pans
          </p>
          <div className="input-container">
            <input type="email" placeholder="Enter your email" />
            <button className="btn">Learn More</button>
          </div>
        </div>

        {/* Right Side */}
        <div className="right">
          <div className="img-container">
            <img
              src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
