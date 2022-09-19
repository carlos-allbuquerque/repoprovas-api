import { Router } from "express";
import { add } from "../controllers/testController.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { getByDiscipline, getDisciplines, getByTeacher } from "../controllers/testController.js";

const testRouter = Router();

testRouter.use(validateToken);

testRouter.post("/add-test", validateSchema(testSchema), add);
testRouter.get("/test/discipline/:id", getByDiscipline);
testRouter.get("/disciplines", getDisciplines);
testRouter.get("/test/teacher/:id", getByTeacher);

export default testRouter;