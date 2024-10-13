import { indexParams, Thread } from "../../utils/types";
import { threadMapper } from "../dto/threadMapper";
import { newThread } from "../../domain/entity/thread";
import {
    insertThread,
    selectThread,
    selectThreads,
    updateThread,
    deleteThread,
} from '../../adapters/repository/threadRepository';
import { appError } from "../../utils/appError";

export const getThread = async (id: number) => {
    return threadMapper(await selectThread(id));
}

export const getThreads = async (params: indexParams) => {
    const result = await selectThreads(params);

    // Threadが取得できなかった場合はnullを返す
    if (!result) throw new appError(404, "Threads not found");

    return result.map((thread: any) => threadMapper(thread));
};

export const createThread = async (user_id: number, title: string, body: string) => {
    const thread = newThread(null, user_id, title, body);

    const result = await insertThread(thread.user_id, thread.title, thread.body);

    return result;
}

export const editThread = async (id: number, title: string, body: string) => {
    const selected: Thread|null = threadMapper(await selectThread(id));

    // Threadが取得できなかった場合はエラーメッセージを返す
    if (!selected) throw new appError(404, 'Thread not found');

    // updated_atはデフォルトでNowになるので設定しない
    const thread = newThread(selected.id, selected.user_id, title, body, selected.created_at);

    const result = await updateThread(thread.user_id, thread.title, thread.body);

    return result;

}

export const destroyThread = async (id: number) => {
    const result = await deleteThread(id);

    return result;
}