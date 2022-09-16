import { Request, Response } from "express";
import { testData } from "../types/testTypes.js";
import { addTest } from "../services/testServices.js";

export async function add(req: Request, res: Response) {
    const test: testData = req.body;
    await addTest(test);

    return res.sendStatus(201);
}