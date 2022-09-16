import { Router } from "express";
import { signin, signup } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";

import * as auth from "../schemas/authSchema.js"

const authRouter = Router();

authRouter.post("/signup", validateSchema(auth.registerSchema), signup);
authRouter.get("/signin", validateSchema(auth.loginSchema), signin); 

export default authRouter;
