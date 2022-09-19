import { TeacherDisciplines } from '@prisma/client';
import { testData } from './../types/testTypes.js';
import { add } from "../repositories/testRepository.js";
import * as testRepository from '../repositories/testRepository.js';
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";
import error from '../types/errorType.js';

export async function addTest(test: testData) {
    const categoryExists = testRepository.checksCategoty(test.categoryId);
    if (!categoryExists) throw <error> {code: "notFound", message: "Category does not exist"};

    const disciplineExists = testRepository.checksDiscipline(test.teacherDisciplineId);
    if (!disciplineExists) throw <error> {code: "notFound", message: "Discipline does not exist"};
    
    await add(test);
}

export async function getByDiscipline(disciplineId: number) {
const discipline = await testRepository.findByDiscipline(disciplineId);

return discipline;
}

export async function getDisciplines() {
const disciplines = await teacherDisciplineRepository.findDisciplines();

return disciplines;
}

export async function getByTeacher(teacherId: number) {
    const disciplines = await teacherDisciplineRepository.findByTeacher(teacherId);
  
    if (!disciplines)
      throw { type: "NotFound", message: "This teacher doesn't have any discipline" };
  
    const tests = await Promise.all(disciplines.map(async (teacherDiscipline: TeacherDisciplines) => {
      const discipline = await testRepository.findByTeacher(teacherDiscipline);
  
      return {
        discipline,
      };
    }));
  
    const disciplinesWithTests = tests.filter((test) => {
      return test.discipline.tests.length > 0;
    })
  
    return disciplinesWithTests;
  }