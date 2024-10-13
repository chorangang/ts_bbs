import express from "express";
import {show, index, create, edit, destroy} from "./controllers/threadController";

const router = express.Router();

// /* Authentication Routes */
// router.post("/api/register", register);
// router.post("/api/login", login);
// router.post("/api/logout", logout);

// /* User Routes */
// router.get("/api/user", getUser);
// router.get("/api/users", getUsers);
// router.put("/api/users/:id", updateUser);
// router.delete("/api/users/:id", deleteUser);

// /* Thread Routes */
router.get("/threads/:id", show);
router.get("/threads", index);
router.post("/threads", create);
router.patch("/threads/:id", edit);
router.delete("/threads/:id", destroy);

// /* Comment Routes */
// router.get("/api/comments/:id", getComment);
// router.get("/api/threads/:thread_id/comments", getComments);
// router.post("/api/comments", createComment);
// router.patch("/api/comments/:id", updateComment);
// router.delete("/api/comments/:id", deleteComment);

export { router };
