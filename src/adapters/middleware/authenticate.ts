import { Request, Response, NextFunction } from "express";
import { appError } from "../../utils/appError";
import { createAuthUsecase } from "../../application/usecases/authUsecase";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { verifyToken } = createAuthUsecase();

    const token = req.headers["authorization"];

    console.log("token:", token, "request headers:", req.headers);

    if(req.path === "/api/login" || req.path === "/api/register") {
        next();
        return;
    }

    if (!token) {
        throw new appError(401, "No token provided");
    }

    if (verifyToken(token)) {
        next();
    }
}