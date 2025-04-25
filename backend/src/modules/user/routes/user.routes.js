import { Router } from "express";

import { addUser, listUsers, login } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", listUsers);
userRoutes.post("/", addUser);
userRoutes.post("/login", login);

export default userRoutes;
