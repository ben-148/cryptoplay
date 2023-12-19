// useCoinData.js
import { useEffect, useState } from "react";
import axios from "axios";

const useCoinData = () => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your server
        const serverResponse = await axios.get("/coins");
        const serverData = serverResponse.data;

        // Fetch data from the external API
        const apiResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
              locale: "en",
            },
          }
        );
        const apiData = apiResponse.data;

        const combinedData = serverData.map((coinFromServer) => {
          const matchingApiCoin = apiData.find(
            (coinFromApi) =>
              coinFromApi.symbol.toLowerCase() ===
              coinFromServer.codeName.toLowerCase()
          );

          if (matchingApiCoin) {
            // Update values in the server data based on API data
            return {
              ...coinFromServer,
              price: matchingApiCoin.current_price,
              change24: matchingApiCoin.price_change_percentage_24h,
              // Add other keys and values as needed
            };
          }

          // If no match found, return the original server data
          return coinFromServer;
        });

        // Update the state with the combined data
        setCombinedData(combinedData);

        // Update coins on the server
        const updateCoinsOnServer = async () => {
          try {
            const response = await axios.patch("/coins/bulk-update", {
              coins: combinedData.map((coinData) => ({
                id: coinData._id,
                price: coinData.price,
                // Add other fields as needed
              })),
            });

            console.log("Coins updated on server:", response.data);
          } catch (error) {
            console.error("Error updating coins on server:", error);
            // Add error handling logic if needed
          }
        };
        updateCoinsOnServer();
      } catch (error) {
        console.error("Error fetching data:", error);
        // Add error handling logic if needed
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  return combinedData;
};

export default useCoinData;
