import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserFromCRMPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [newPortfolio, setNewPortfolio] = useState([]); // Declare newPortfolio state
  const [portfolioValue, setPortfolioValue] = useState(0);
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users/${id}`);
        setUser(response.data);

        const { portfolio } = response.data;
        const { data: allCoinsData } = await axios.get(`/coins`);
        const userOwnedCoins = allCoinsData.filter((coin) =>
          portfolio.some((userCoin) => userCoin.coinId === coin._id)
        );
        console.log(
          "🚀 ~ file: UserFromCRMPage.jsx:23 ~ fetchData ~ userOwnedCoins:",
          userOwnedCoins
        );

        const calculatedNewPortfolio = portfolio.map((coin) => {
          const matchingCoin = userOwnedCoins.find(
            (ownedCoin) => ownedCoin._id === coin.coinId
          );

          return {
            coinId: coin.coinId,
            amount: coin.amount,
            price: matchingCoin ? matchingCoin.price : 0,
            name: matchingCoin ? matchingCoin.name : "",
            codeName: matchingCoin ? matchingCoin.codeName : "",
            imageUrl: matchingCoin ? matchingCoin.image.url : "",
          };
        });

        setNewPortfolio(calculatedNewPortfolio); // Update newPortfolio state
        console.log(
          "🚀 ~ file: UserFromCRMPage.jsx:44 ~ fetchData ~ calculatedNewPortfolio:",
          calculatedNewPortfolio
        );

        const totalValue =
          response.data.amount +
          calculatedNewPortfolio.reduce(
            (total, coin) => total + coin.amount * coin.price,
            0
          );

        setPortfolioValue(totalValue);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleNavigateToCRM = () => {
    // Navigate to /admin/crm when the button is clicked
    navigate("/admin/crm");
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <p>
          Name:{" "}
          {`${user.name.firstName} ${user.name.middleName} ${user.name.lastName}`}
        </p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Country: {user.address.country}</p>
        <p>City: {user.address.city}</p>
        {/* Add other user information as needed */}
      </div>
      <div>
        <h2>User Portfolio</h2>
        <ul>
          {newPortfolio.map((coin, index) => {
            const valueAmount = coin.amount * coin.price;
            const formattedAmount = parseFloat(coin.amount).toFixed(3);
            //ben
            return (
              <div key={index} className="coin-item">
                <li>
                  <img
                    src={coin.imageUrl}
                    alt={coin.name}
                    className="coin-logo"
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "8px",
                    }} // Set your desired width and height
                  />
                  {coin.name}, Amount: {formattedAmount} {coin.codeName} ,
                  Value: $ {valueAmount}
                </li>
              </div>
            );
          })}
          <li>
            <img
              src="https://static.vecteezy.com/system/resources/previews/007/164/551/original/tether-usdt-cryptocurrency-coins-usdt-logo-gold-coin-decentralized-digital-money-concept-free-vector.jpg"
              alt="tether"
              className="coin-logo"
              style={{
                width: "16px",
                height: "16px",
                marginRight: "8px",
              }} // Set your desired width and height
            />
            USDT CREDIT: $ {user.amount}
          </li>
        </ul>
      </div>
      <div>
        <h2>Total Portfolio Value</h2>
        <p> $ {portfolioValue}</p>
      </div>
      <div>
        <button onClick={handleNavigateToCRM}>Go to CRM</button>
      </div>
    </div>
  );
};

export default UserFromCRMPage;
