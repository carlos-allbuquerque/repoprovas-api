import {
    Categories,
    Disciplines,
    Teachers,
    TeacherDisciplines,
    Terms,
    Tests,
  } from "@prisma/client";
  
  export type CreateCategory = Omit<Categories, "id" | "createdAt">;
  export type CreateTest = Omit<Tests, "id" | "createdAt">;
  export type CreateTeacher = Omit<Teachers, "id" | "createdAt">;
  export type CreateDiscipline = Omit<Disciplines, "id" | "createdAt">;
  export type CreateTeacherDiscipline = Omit<TeacherDisciplines, "id" | "createdAt">;
  export type CreateTerm = Omit<Terms, "id" | "createdAt">;