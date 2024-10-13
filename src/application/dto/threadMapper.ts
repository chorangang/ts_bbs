import { Thread } from '../../utils/types';

export const threadMapper = (thread: any): Thread|null => {
    if (!thread) {
        return null;
    }

    return {
        id: thread.id,
        user_id: thread.user_id,
        title: thread.title,
        body: thread.body,
        created_at: formatDate(thread.created_at),
        updated_at: formatDate(thread.updated_at)
    };
};

const formatDate = (dateString: string): string => {
        const date = new Date(dateString);

        return date.getUTCFullYear() + ":" +
            String(date.getUTCMonth() + 1).padStart(2, "0") + ":" +
            String(date.getUTCDate()).padStart(2, "0") + " " +
            String(date.getUTCHours()).padStart(2, "0") + ":" +
            String(date.getUTCMinutes()).padStart(2, "0") + ":" +
            String(date.getUTCSeconds()).padStart(2, "0");
};