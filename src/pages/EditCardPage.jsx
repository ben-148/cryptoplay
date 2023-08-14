import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ROUTES from "../routes/ROUTES";
import validateEditSchema, {
  validateEditCardParamsSchema,
} from "../validation/editValidation";
import { CircularProgress } from "@mui/material";
import atom from "../logo.svg";
// import { toast } from "react-toastify";

import EditCardPageFieldComponent from "../components/EditCoinPageComponent";
import FormButtonsComponent from "../components/FormButtonsComponent";

const coinsArr = [
  {
    _id: "0123",
    name: "BITCOIN",
    codeName: "BTC",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png",
    price: "29,000",
  },
  {
    _id: "0124",
    name: "BINANCE",
    codeName: "BNB",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS4EmOUlbDTRu0yrNO55Bj796fuKDhtUyDvQlGdBYA&s",
    price: "248",
  },
  {
    _id: "0125",
    name: "ETHEREUM",
    codeName: "ETH",
    img: "https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png",
    price: "2000",
  },
];

const EditCardPage = () => {
  const { id } = useParams();

  // const [inputState, setInputState] = useState(null);
  const [disableEd, setDisableEdit] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();
  const arrOfInputs = [
    { inputName: "Name", idAndKey: "name", isReq: true },
    { inputName: "CODE", idAndKey: "codeName", isReq: true },
    { inputName: "price", idAndKey: "price", isReq: true },
    { inputName: "icon url", idAndKey: "img", isReq: true },
  ];

  const [inputState, setInputState] = useState(null);

  useEffect(() => {
    const errors = validateEditCardParamsSchema({ id });
    if (errors) {
      navigate("/");
      return;
    }

    // const idExists = coinsArr.some((item) => item._id === id);
    const coin = coinsArr.find((item) => item._id === id);

    if (!coin) {
      navigate("/");
    } else {
      setInputState(coin);
    }
  }, [id, navigate]);
  /* 
    name: "",
    codeName: "",
    price: "",
    img: "", */

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateEditSchema(newInputState);
    if (!joiResponse) {
      setInputsErrorsState(joiResponse);
      setDisableEdit(false);
      return;
    }
    setDisableEdit(true);
    const inputKeys = Object.keys(inputState);
    for (const key of inputKeys) {
      if (inputState && !inputState[key] && key !== ev.target.id) {
        if (joiResponse[key]) {
          joiResponse[key] = "";
        }
      }
    }
    setInputsErrorsState(joiResponse);
  };

  if (!inputState) {
    return <CircularProgress />;
  }

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const errors = validateEditCardParamsSchema({ id });
  //       if (errors) {
  //         navigate("/");
  //         return;
  //       }
  //       const { data } = await axios.get("/cards/card/" + id);
  //       let newInputState = {
  //         ...data,
  //       };
  //       if (data.image && data.image.url) {
  //         newInputState.url = data.image.url;
  //       } else {
  //         newInputState.url = "";
  //       }
  //       if (data.image && data.image.alt) {
  //         newInputState.alt = data.image.alt;
  //       } else {
  //         newInputState.alt = "";
  //       }
  //       delete newInputState.image;
  //       delete newInputState.likes;
  //       delete newInputState._id;
  //       delete newInputState.user_id;
  //       delete newInputState.bizNumber;
  //       delete newInputState.createdAt;
  //       delete newInputState.__v;
  //       setInputState(newInputState);
  //       if (!validateEditSchema(newInputState)) {
  //         setDisableEdit(false);
  //       }
  //     } catch (err) {}
  //   })();
  // }, [id, navigate]);

  /*   const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        await axios.put("/cards/" + id, inputState);
        // toast.success("🦄 You did it! edit success :) ");

        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log(
        "🚀 ~ file: EditCardPage.jsx:91 ~ handleSaveBtnClick ~ err:",
        err
      );
      toast.error("error");
    }
  };
 */ /*   const handleClearClick = () => {
    const cloneInputState = JSON.parse(JSON.stringify(inputState));
    const inputKeys = Object.keys(cloneInputState);
    for (const key of inputKeys) {
      if (typeof cloneInputState[key] === "string") {
        cloneInputState[key] = "";
      }
    }
    setInputsErrorsState(null);
    setInputState(cloneInputState);
  };
  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateEditSchema(newInputState);
    if (!joiResponse) {
      setInputsErrorsState(joiResponse);
      setDisableEdit(false);
      return;
    }
    setDisableEdit(true);
    const inputKeys = Object.keys(inputState);
    for (const key of inputKeys) {
      if (inputState && !inputState[key] && key !== ev.target.id) {
        if (joiResponse[key]) {
          joiResponse[key] = "";
        }
      }
    }
    setInputsErrorsState(joiResponse);
  };

  if (!inputState) {
    return <CircularProgress />;
  }
 */ return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit coin
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={inputState.img ? inputState.img : atom}
        />
        <br></br>
        <Grid container spacing={2}>
          {arrOfInputs.map((input) => (
            <Grid item xs={12} sm={6} key={input.inputName}>
              <EditCardPageFieldComponent
                nameOfInput={input.inputName}
                typeofInput={input.idAndKey}
                isReq={input.isReq}
                onInputeChange={handleInputChange}
                value={inputState[input.idAndKey]}
              />
              {inputsErrorsState && inputsErrorsState[input.idAndKey] && (
                <Alert severity="warning">
                  {inputsErrorsState[input.idAndKey].map((item) => (
                    <div key={input.idAndKey + "-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
          ))}
        </Grid>
        <FormButtonsComponent
          // onCancel={handleCancelBtnClick}
          // onReset={handleClearClick}
          // onRegister={handleSaveBtnClick}
          clickBtnText="Save"
          disableProp={disableEd}
        />
      </Box>
    </Container>
  );
};
export default EditCardPage;
