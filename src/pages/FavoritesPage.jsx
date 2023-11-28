import { Box, CircularProgress, Grid, Button } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CoinCardComponent from "../components/CoinCardComponent";

const FavoritesPage = () => {
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards/get-my-fav-coins")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {
        toast.error("Oops");
      });
  }, []);

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
      toast.success("🦄 Card deleted :)");
    } catch (err) {}
  };

  const handleDeleteFromFavorites = async (id) => {
    try {
      await axios.patch(`cards/card-like/${id}`);
      setCardsArr((prevArr) => prevArr.filter((card) => card._id !== id));
      toast.success("Card deleted successfully");
    } catch (err) {
      toast.error("Failed to delete card");
    }
  };

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`);
  };

  const cardProfileClick = (id) => {
    navigate(`/coinData/${id}`);
  };

  return (
    <Fragment>
      <Box textAlign="center">
        <h1>Your Favorite Cards</h1>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {Array.isArray(cardsArr) &&
            cardsArr.map((item) => (
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
                  title={item.title}
                  subTitle={item.subTitle}
                  description={item.description}
                  img={item.image ? item.image.url : ""}
                  onDelete={handleDeleteFromInitialCardsArr}
                  isItUsersCard={payload && payload._id === item.user_id}
                  onEdit={handleEditFromInitialCardsArr}
                  canEdit={
                    payload && payload.biz && payload._id === item.user_id
                  }
                  canDelete={
                    (payload && payload.isAdmin) ||
                    (payload && payload.biz && payload._id === item.user_id)
                  }
                  onImageClick={cardProfileClick}
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
        {!cardsArr && (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        )}
        {Array.isArray(cardsArr) && cardsArr.length === 0 && (
          <div style={{ textAlign: "center" }}>
            <h3>No cards found</h3>
          </div>
        )}
      </Box>
    </Fragment>
  );
};

export default FavoritesPage;
