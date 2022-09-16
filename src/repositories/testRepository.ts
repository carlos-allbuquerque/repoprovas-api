import { prisma } from "../database/db.js";
import { testData } from "../types/testTypes.js";

export async function add(data: testData) {
    await prisma.tests.create({
        data
    });
}