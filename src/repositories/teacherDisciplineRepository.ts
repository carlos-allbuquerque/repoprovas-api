import { prisma } from "../database/db.js";

export async function findDisciplines() {
    return prisma.disciplines.findMany();
  }

  export async function findByTeacher(teacherId: number) {
    return prisma.teacherDisciplines.findMany({
      where: {
        teacherId,
      },
    });
  }