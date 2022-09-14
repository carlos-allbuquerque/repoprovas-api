import { newUserData } from './../types/authTypes';
import Joi from "joi";

export const registerSchema = Joi.object<newUserData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
  confirmPassword: Joi.ref('password')
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
  });
