import { testData } from './../types/testTypes.js';
import { add } from "../repositories/testRepository.js";

export async function addTest(test: testData) {
    await add(test);
}