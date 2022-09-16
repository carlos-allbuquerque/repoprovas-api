import { Router } from "express";
import { add } from "../controllers/testController.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";

const testRouter = Router();

testRouter.post("/add-test", validateToken, validateSchema(testSchema), add);

export default testRouter;