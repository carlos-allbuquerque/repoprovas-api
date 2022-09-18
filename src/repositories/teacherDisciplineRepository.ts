import { prisma } from "../database/db.js";

export async function findDisciplines() {
    return prisma.disciplines.findMany();
  }