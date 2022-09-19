import { prisma } from "../database/db.js";
import { testData } from "../types/testTypes.js";
import {TeacherDisciplines } from "@prisma/client";
import error from "../types/errorType.js";

export async function add(data: testData) {
  await prisma.tests.create({
      data
  });
}

export async function checksCategoty(id: number) {
  return await prisma.categories.findFirst({
    where: {
      id
    },
  });
}

export async function checksDiscipline(id: number) {
  try {
      return await prisma.teacherDisciplines.findFirst({
    where: {
      id
    },
  });
  } catch(error) {
    throw <error> {code: "notFound", message: "Discipline does not exist"};
  }
}

export async function findByTeacher(teacherDiscipline: TeacherDisciplines) {

  const discipline = await prisma.disciplines.findFirst({
    where: {
      id: teacherDiscipline.disciplineId,
    },
    select: {
      name: true,
      term: {
        select: {
          number: true,
        },
      },
    },
  });
  
  const teacher = await prisma.teachers.findFirst({
    where: {
      id: teacherDiscipline.teacherId,
    },
    select: {
      name: true,
    },
  });

  const tests = await prisma.tests.findMany({
    where: {
      teacherDisciplineId: teacherDiscipline.id,
    },
    select: {
      name: true,
      pdfUrl: true,
      categoryId: true,
    },
  });

  const testsWithCategory = await Promise.all(
    tests.map(async (test: any) => {
      const category = await prisma.categories.findFirst({
        where: {
          id: test.categoryId,
        },
        select: {
          name: true,
        },
      });

      return {
        name: test.name,
        pdfUrl: test.pdfUrl,
        category: category.name,
      };
    })
  );

  return {
    term: discipline.term.number,
    teacher: teacher.name,
    name: discipline.name,
    tests: testsWithCategory,
  };
}
  
export async function findByDiscipline(disciplineId: number) {
  const disciplines = await prisma.teacherDisciplines.findMany({
    where: {
      disciplineId,
    },
  });

  if (!disciplines)
    throw { type: "NotFound", message: "This discipline doesn't have classes" };

  const tests = await Promise.all(disciplines.map(async (teacherDiscipline: TeacherDisciplines) => {
    const discipline = await findByTeacher(teacherDiscipline);

    return {
      discipline,
    };
  }));

  const disciplinesWithTests = tests.filter((test) => {
    return test.discipline.tests.length > 0;
  })

  return disciplinesWithTests;
}