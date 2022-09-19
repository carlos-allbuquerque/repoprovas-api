import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database/db.js";

export async function testFactory(testValid: boolean = false) {
  const name = faker.lorem.words(3);
  const pdfUrl = faker.internet.url();
  let categoryId = 0;
  let teacherId = 0;
  let disciplineId = 0;

  if(testValid){
    const category = await prisma.categories.findFirst({ where: { name: "Projeto" } });
    categoryId = category.id;

    const teacher = await getTeacher();
    teacherId = teacher.id;

    const discipline = await getDiscipline();
    disciplineId = discipline.id;
  }

  return { name, pdfUrl, categoryId, teacherId, disciplineId };
}

export async function getTeacher() {
  return await prisma.teachers.findFirst({ where: { name: "Diego Pinho" } });
}

export async function getDiscipline() {
  return await prisma.disciplines.findFirst({ where: { name: "JavaScript" } });
}
