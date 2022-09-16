import Joi from "joi";
import { testData } from "../types/testTypes";

export const testSchema = Joi.object<testData>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().required(),
    teacherDisciplineId: Joi.number().required()

  });
