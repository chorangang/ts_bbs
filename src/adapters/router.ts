import express from "express";
import { createThreadController } from "./controllers/threadController";
import { createAuthController } from "./controllers/authController";
import { userController } from "./controllers/userController";

const router = express.Router();


// /* Authentication Routes */
const { register, login, logout } = createAuthController();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// /* User Routes */
const { showUser, indexUser, putUser, removeUser } = userController();
router.get("/user", showUser);
router.get("/users", indexUser);
router.put("/users/:id", putUser);
router.delete("/users/:id", removeUser);

// /* Thread Routes */
const { showThread, indexThread, saveThread, putThread, removeThread } = createThreadController();
router.get("/threads/:id", showThread);
router.get("/threads", indexThread);
router.post("/threads", saveThread);
router.patch("/threads/:id", putThread);
router.delete("/threads/:id", removeThread);

// /* Comment Routes */
// router.get("/api/comments/:id", getComment);
// router.get("/api/threads/:thread_id/comments", getComments);
// router.post("/api/comments", createComment);
// router.patch("/api/comments/:id", updateComment);
// router.delete("/api/comments/:id", deleteComment);

export { router };
