import { handler } from "./handler";

export const commentController = () => {
    const { createComment, getCommentsByThreadId, getCommentById, updateComment, deleteComment } = commentUsecase();

    const saveComment = handler(async (req, res) => {
        await createComment(req.body.thread_id, req.body.content);
        res.status(201).json({ message: "Comment created" });
    });

    const getComments = handler(async (req, res) => {
        const comments = await getCommentsByThreadId(req.params.thread_id);
        res.status(200).json(comments);
    });

    const getComment = handler(async (req, res) => {
        const comment = await getCommentById(req.params.id);
        res.status(200).json(comment);
    });

    const editComment = handler(async (req, res) => {
        await updateComment(req.params.id, req.body.content);
        res.status(200).json({ message: "Comment updated" });
    });

    const removeComment = handler(async (req, res) => {
        await deleteComment(req.params.id);
        res.status(200).json({ message: "Comment deleted" });
    });

    return { saveComment, getComments, getComment, editComment, removeComment };
}