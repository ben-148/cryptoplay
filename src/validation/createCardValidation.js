import Joi from "joi";

import validation from "./validation";

const createCardSchema = Joi.object({
  name: Joi.string().required(),
  codeName: Joi.string().required(),
  url: Joi.string().regex(
    new RegExp(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    )
  ),
  // alt: Joi.string().min(2).max(256).required(),

  price: Joi.string().required(),
});

const ValidateCreateSchema = (userInput) =>
  validation(createCardSchema, userInput);

export default ValidateCreateSchema;
