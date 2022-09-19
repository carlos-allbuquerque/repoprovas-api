import { Request, Response } from "express";
import { testData } from "../types/testTypes.js";
import { addTest } from "../services/testServices.js";
import * as service from '../services/testServices.js';

export async function add(req: Request, res: Response) {
    const test: testData = req.body;
    await addTest(test);

    return res.sendStatus(201);
}

export async function getByDiscipline(req: Request, res: Response) {
    const id = Number(req.params.id);
    const tests = await service.getByDiscipline(id);
    res.status(200).send(tests);
  }

export async function getDisciplines(req: Request, res: Response) {
const disciplines = await service.getDisciplines();
res.status(200).send(disciplines);
}

export async function getByTeacher(req: Request, res: Response) {
  const id = Number(req.params.id);
  const tests = await service.getByTeacher(id);
  res.status(200).send(tests);
}