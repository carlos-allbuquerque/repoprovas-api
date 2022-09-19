import { prisma } from './../src/database/db';
import app from '../src/index.js';
import supertest from "supertest";
import * as userFactory from "./userFactory.js";

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
    })

    it("different password and confirmPassword must return 422", async () => {
        const user = userFactory.user();

        const body = {...user, confirmPassword: `${user.password}qwe31`};
        const result = await agent.post("/signup").send(body);

        expect(result.status).toBe(422);
    })
});