import { prisma } from './../src/database/db.js';
import app from '../src/index.js';
import supertest from "supertest";
import * as userFactory from "./factories/userFactory.js";
import * as testFactory from "./factories/testFactory.js";

const agent = supertest(app);

describe("POST /add-test", () => {
    it("Create a new test 201", async () => {
        const user = userFactory.user();
        const body = { ...user, confirmPassword: user.password };
        await agent.post("/signup").send(body);
    
        const result = await agent.post("/signin").send({ ...user });
        const token = result.body.token;
    
        const test = await testFactory.testFactory(true);
        const resultTest = await agent.post("/add-test").set("Authorization", `Bearer ${token}`).send(test);
        expect(resultTest.status).toBe(201);
    
        const checkTest = prisma.tests.findFirst({
            where: {
                id: resultTest.body.id
            },
        });
        expect(checkTest).toBeTruthy();
      });

    it("Create a new test without send token 401", async () => {
        const body = await testFactory.testFactory();
        const response = await supertest(app)
            .post("/add-test")
            .send(body);

        const status = response.status;
        expect(status).toBe(401);
    });

    it("Create a new test with ids not found 404", async () => {
        const user = userFactory.adminFactory();
        const login = await agent.post("/signin").send(user);

        const body = await testFactory.testFactory();
        const response = await supertest(app)
            .post("/test")
            .set("Authorization", `Bearer ${login.body.token}`)
            .send(body);

        const status = response.status;
        expect(status).toBe(404);
    });
});


describe("GET /test", () => {
    it("Get teacher's tests", async () => {
      const user = userFactory.adminFactory();
      const login = await agent.post("/signin").send(user);
  
      const test = await testFactory.testFactory(true);
      const insertTest = await agent.post("/add-test").set("Authorization", `Bearer ${login.body.token}`).send(test);
      expect(insertTest.status).toBe(201);
  
      const teacher = await testFactory.getTeacher();
  
      const response = await agent.get(`/test/teacher/${teacher.id}`).set("Authorization", `Bearer ${login.body.token}`);
      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty("discipline");
    });

    it("Get discipline's tests", async () => {
        const user = userFactory.adminFactory();
        const login = await agent.post("/signin").send(user);
    
        const test = await testFactory.testFactory(true);
        const insertTest = await agent.post("/add-test").set("Authorization", `Bearer ${login.body.token}`).send(test);
        expect(insertTest.status).toBe(401);
    
        const discipline = await testFactory.getDiscipline();
    
        const response = await agent.get(`/test/discipline/${2}`).set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("discipline");
      });
  
});