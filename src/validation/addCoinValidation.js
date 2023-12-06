import Joi from "joi";

import validation from "./validation";

const addCoinSchema = Joi.object({
  name: Joi.string().min(2).required(),
  codeName: Joi.string().min(2).required(),
  url: Joi.string().regex(
    new RegExp(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    )
  ),
  // alt: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(10).max(1000),

  price: Joi.string().required(),
});

const ValidateAddCoinSchema = (userInput) =>
  validation(addCoinSchema, userInput);

export default ValidateAddCoinSchema;