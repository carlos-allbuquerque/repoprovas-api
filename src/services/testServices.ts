import { testData } from './../types/testTypes.js';
import { add } from "../repositories/testRepository.js";
import * as testRepository from '../repositories/testRepository.js';
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";
import error from '../types/errorType.js';

export async function addTest(test: testData) {
    const categoryExists = testRepository.checksCategoty(test.categoryId);
    if (!categoryExists) throw <error> {code: "notFound", message: "Category does not exist"};
    
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