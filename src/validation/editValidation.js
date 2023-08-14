import Joi from "joi";

import validation from "./validation";

const editCardSchema = Joi.object({
  name: Joi.string().min(2).max(256).required(),
  codeName: Joi.string().min(2).max(256).required(),
  price: Joi.number().min(0).max(99999999).allow("").optional(),
  img: Joi.string().min(6).max(25555).required(),
});

const editCardParamsSchema = Joi.object({
  id: Joi.string().min(1).required(),
});

const validateEditSchema = (userInput) => validation(editCardSchema, userInput);

const validateEditCardParamsSchema = (userInput) =>
  validation(editCardParamsSchema, userInput);

export { validateEditCardParamsSchema };

export default validateEditSchema;
