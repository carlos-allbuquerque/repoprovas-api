import { prisma } from "../database/db.js"
import { userData } from "../types/authTypes.js";

export async function createUser(data: userData) {
    await prisma.user.create({
        data
    });
}

export async function search(email: string) {
    const result = await prisma.user.findUnique({
        where: {
            email
        },
    });
    return result;
}
