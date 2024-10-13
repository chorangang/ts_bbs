import { Request, Response, NextFunction } from "express";
import {
    getThread,
    getThreads,
    createThread,
    editThread,
    destroyThread,
} from "../../application/usecases/threadUsecase";

// IDからThreadを取得する
export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await getThread(parseInt(req.params.id)));
    } catch (e: unknown) {
        next(e);
    }
};

// 検索条件でThreadsを取得する
export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await getThreads({
            page:    parseInt(req.query.page as string) || 1,      // デフォルト値を1に設定
            limit:   parseInt(req.query.limit as string) || 10,    // デフォルト値を10に設定
            keyword: (req.query.keyword as string) || "",          // 空文字をデフォルト
            sort:    (req.query.sort as "asc" | "desc") || "desc", // デフォルト値を"desc"に設定
        }));
    } catch (e: unknown) {
        next(e);
    }
};

// Threadを作成する
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createThread(parseInt(req.body.user_id), req.body.title, req.body.body)
        res.status(201).json({message: "Thread created"});
    } catch (e: unknown) {
        next(e);
    }
}

// Threadを更新する
export const edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await editThread(parseInt(req.params.id), req.body.title, req.body.body);
        res.status(200).json({message: "Thread updated"});
    } catch (e: unknown) {
        next(e);
    }
};

// Threadを削除する
export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await destroyThread(parseInt(req.params.id));
        res.status(200).json({message: "Thread deleted"});
    } catch (e: unknown) {
        next(e);
    }
};