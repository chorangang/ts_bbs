import { formatDate } from '../../utils/helper';
import { Thread } from '../../utils/types';

export const threadMapper = (thread: any): Thread|null => {
    return {
        id: thread.id,
        user_id: thread.user_id,
        title: thread.title,
        body: thread.body,
        created_at: formatDate(thread.created_at),
        updated_at: formatDate(thread.updated_at)
    };
};
