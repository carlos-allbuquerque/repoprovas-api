import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import error from "../types/errorType";

export function validateSchema(schema: Joi.ObjectSchema) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) throw <error> { code: "unprocessable", message: validation.error.message };

    next();
  };
}