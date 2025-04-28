import { Router } from "express";

import { addUser, deleteUser, listUsers, login, updateUser } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", listUsers);
userRoutes.post("/", addUser);
userRoutes.put('/:id', updateUser)
userRoutes.delete('/:id', deleteUser)
userRoutes.post("/login", login);

export default userRoutes;
