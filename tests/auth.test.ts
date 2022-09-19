import { prisma } from './../src/database/db';
import app from '../src/index.js';
import supertest from "supertest";
import * as userFactory from "./userFactory.js";
import { encryptAccountPassword } from '../src/utils/passwordUtils';
import { createUser } from '../src/repositories/authRepository';

const agent = supertest(app);

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("POST /signup", () => {
    it("Create valid account must return 201", async () => {
        const user = userFactory.user();

        const body = {...user, confirmPassword: user.password};
        const result = await agent.post("/signup").send(body);

        expect(result.status).toBe(201);
    });

    it("different password and confirmPassword must return 422", async () => {
        const user = userFactory.user();

        const body = {...user, confirmPassword: `${user.password}qwe31`};
        const result = await agent.post("/signup").send(body);

        expect(result.status).toBe(422);
    });

    it("data format invalid must return 422", async () => {
        const user = {
            email: "test@gmail.com",
            invalidAtribute: "atribute name invalid",
            confirmPassword: "o2uch523rt"
        };

        const result = await agent.post("/signup").send(user);

        expect(result.status).toBe(422);
    });

    it("Create a account already exists 409", async () => {
        const user = userFactory.user();
        const body = { ...user, confirmPassword: user.password };
    
        await supertest(app).post("/signup").send(body);
        const result = await agent.post("/signup").send(body);
    
        const status = result.status;
        expect(status).toBe(409);
      });
});

describe("POST /signin", () => {
    it("login with nonexistent email must return status code 422", async () => {
        const user = userFactory.user();
        const result = await agent.post("/signin").send(user);

        expect(result.status).toBe(401);
    });

    it("login with valid data must return status code 200", async () => {
        const user = userFactory.user();
        const add = createUser(user);

        const result = await agent.post("/signin").send(user);

        expect(result.status).toBe(401);
    });

});
