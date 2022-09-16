import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";

dotenv.config();

export default function validateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;

        const token = authorization?.replace('Bearer ', '');
        const dados = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch(error) {
        throw { code: "unauthorized", message: "invalid or tampered token"};
    }
}