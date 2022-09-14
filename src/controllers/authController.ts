import { Request, Response } from "express";
import { acess, create } from "../services/authServices.js";

export async function signup(req: Request, res: Response) {
        const user = req.body;

        await create(user);
        res.sendStatus(201);
}

export async function signin(req: Request, res: Response) {
    const loginData = req.body;

    const token = await acess(loginData);
    res.status(200).send(token);
}