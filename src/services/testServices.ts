import { TeacherDisciplines } from '@prisma/client';
import { testData } from './../types/testTypes.js';
import { add } from "../repositories/testRepository.js";
import * as testRepository from '../repositories/testRepository.js';
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";

export async function addTest(test: testData) {
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