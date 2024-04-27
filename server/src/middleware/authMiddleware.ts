import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as CustomRequest).body.token = decoded;

        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};