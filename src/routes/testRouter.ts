import { Router } from "express";
import { add } from "../controllers/testController.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import * as controller from "../controllers/testController.js";

const testRouter = Router();

testRouter.post("/add-test", validateToken, validateSchema(testSchema), add);
testRouter.get("/test/discipline/:id", validateToken, controller.getByDiscipline);
testRouter.get("/disciplines", validateToken, controller.getDisciplines);
testRouter.get("/test/teacher/:id", validateToken ,controller.getByTeacher);
testRouter.get("/teachers", validateToken, controller.getTeachers);

export default testRouter;