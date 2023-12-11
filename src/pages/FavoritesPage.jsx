import { Box, CircularProgress, Grid, Button } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CoinCardComponent from "../components/CoinCardComponent";

const FavoritesPage = () => {
  const [coinsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/coins/get-my-fav-coins")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {
        toast.error("Oops");
      });
  }, []);

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/coins/" + id);
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
      toast.success("🦄 Card deleted :)");
    } catch (err) {}
  };

  const handleDeleteFromFavorites = async (id) => {
    try {
      await axios.patch(`coins/coin-like/${id}`);
      setCardsArr((prevArr) => prevArr.filter((card) => card._id !== id));
      toast.success("Card deleted successfully");
    } catch (err) {
      toast.error("Failed to delete card");
    }
  };

  const cardProfileClick = (id) => {
    navigate(`/coinProfile/${id}`);
  };
  const buyBtnClick = (id) => {
    navigate(`/coinTrade/${id}`);
  };

  return (
    <Fragment>
      <Box textAlign="center">
        <h1>Your Favorite Cards</h1>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {Array.isArray(coinsArr) &&
            coinsArr.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item._id + Date.now()}
              >
                <CoinCardComponent
                  id={item._id}
                  name={item.name}
                  codeName={item.codeName}
                  price={item.price}
                  img={item.image ? item.image.url : ""}
                  onImageClick={cardProfileClick}
                  onBuyClick={buyBtnClick}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteFromFavorites(item._id)}
                >
                  <FavoriteBorderIcon />
                  Delete from favorites
                </Button>
              </Grid>
            ))}
        </Grid>
        {!coinsArr && (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        )}
        {Array.isArray(coinsArr) && coinsArr.length === 0 && (
          <div style={{ textAlign: "center" }}>
            <h3>No coins found</h3>
          </div>
        )}
      </Box>
    </Fragment>
  );
};

export default FavoritesPage;
