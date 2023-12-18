import React, { useState } from "react";
import "./Hero.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import validateLoginSchema from "../validation/loginValidation";
import { useSelector } from "react-redux";

import useLoggedIn from "../hooks/useLoggedIn";

const Hero = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const handleLogin = async () => {
    try {
      const joiResponse = validateLoginSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }

      const { data } = await axios.post("/users/login", inputState);
      localStorage.setItem("token", data.token);
      loggedIn();
      toast.success("🦄 Welcome back!");
      // Redirect to the homepage or another desired page
      navigate("/");
    } catch (err) {
      toast.error("🦄 Invalid email or password");
    }
  };

  const handleInputChange = (ev) => {
    let newInputState = { ...inputState };
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

  return (
    <div className="hero">
      <div className="container">
        {/* Left Side */}
        <div className="left">
          <h1>CryptoPlay - Your Crypto Playground</h1>

          {payload ? (
            <>
              <p>Welcome {payload.firstName}! </p>
              <p>Explore your CryptoPlay experience,</p>
              <p>Check out what yours portfolio telling you today</p>
              {/* <br /> */}
              <button className="btn" onClick={() => navigate("/portfolio")}>
                {payload.firstName}'s PORTFOLIO
              </button>
              {/* <button className="btn" onClick={() => navigate("/trade")}>
                TRADE
              </button> */}
            </>
          ) : (
            <>
              <p>Buy & Sell Crypto using the money that we giving you!</p>
              <p>
                create a new account and get $1000 immediately and start to
                play!{" "}
              </p>

              <p>
                The price of the coins is updated in real time! And this is your
                chance to learn and trade crypto without losing your pans.
              </p>

              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={inputState.email}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: isDarkTheme ? "#333" : "#fff",
                    color: isDarkTheme ? "#fff" : "#000",
                  }}
                />
                <button className="btn" onClick={handleLogin}>
                  LOG IN
                </button>
                {inputsErrorsState && inputsErrorsState.email && (
                  <Alert severity="warning">
                    {inputsErrorsState.email.map((item) => (
                      <div key={"email-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}

                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={inputState.password}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: isDarkTheme ? "#333" : "#fff",
                    color: isDarkTheme ? "#fff" : "#000",
                  }}
                />
                {inputsErrorsState && inputsErrorsState.password && (
                  <Alert severity="warning">
                    {inputsErrorsState.password.map((item) => (
                      <div key={"password-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </div>
              <p>
                Don't have an account yet?{" "}
                <Link to="/register" className="green-link">
                  Sign up!
                </Link>
              </p>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="right">
          <div className="img-container">
            <img
              src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029"
              alt=""
              style={{ maxWidth: "50%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
