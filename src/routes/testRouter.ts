import { Router } from "express";
import { add } from "../controllers/testController.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import * as controller from "../controllers/testController.js";

const testRouter = Router();

testRouter.use(validateToken);

testRouter.post("/add-test", validateSchema(testSchema), add);
testRouter.get("/test/discipline/:id", controller.getByDiscipline);
testRouter.get("/disciplines", controller.getDisciplines);
testRouter.get("/test/teacher/:id", controller.getByTeacher);
testRouter.get("/teachers", controller.getTeachers);

export default testRouter;