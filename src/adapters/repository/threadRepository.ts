import { PrismaClient } from '@prisma/client';
import { indexParams, Thread } from '../../utils/types';
import { appError } from '../../utils/appError';

const prisma = new PrismaClient();

export const selectThread = async (id: number) => {
    try {
        return await prisma.thread.findUnique({
            where: {
                id: id,
            },
        });
    } catch (error: unknown) {
        throw new appError(400, 'Prisma Error');
    }
};

export const selectThreads = async (params: indexParams) => {
  const offset = (params.page - 1) * params.limit; // オフセットを計算

	try {
		return await prisma.thread.findMany({
			where: {
				title: {
				contains: params.keyword, // 部分一致検索
				},
			},
			take: params.limit, // 取得する件数
			skip: offset, // オフセット
			orderBy: {
				created_at: params.sort, // 新しい順にソート
			},
		});
	} catch (error: unknown) {
		throw new appError(400, "Prisma Error");
	}
};

export const insertThread = async (user_id: number, title: string, body: string) => {
	console.log(user_id, title, body);
	try {
    await prisma.thread.create({
		data: {
			user_id: user_id,
			title: title,
			body: body,
		},
		});
	} catch (error: unknown) {
		throw new appError(400, "Prisma Error");
	}
}

export const updateThread = async (id: number, title: string, body: string) => {
	try {
		await prisma.thread.update({
			where: {
				id: id,
			},
			data: {
				title: title,
				body: body,
			},
		});
	} catch (error: unknown) {
		throw new appError(400, "Prisma Error");
	}
}

export const deleteThread = async (threadId: number) => {
	try {
		await prisma.thread.delete({
			where: {
				id: threadId,
			},
		});
	} catch (error: unknown) {
		throw new appError(400, "Prisma Error");
	}
}