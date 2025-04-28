import { Router } from "express";

import {
  addRole,
  listRoles,
  assignRoleToUser,
  updateRole,
  deleteRole,
} from "../controllers/role.controller.js";

const roleRoutes = Router();

roleRoutes.get("/", listRoles);
roleRoutes.post("/", addRole);
roleRoutes.post("/assign", assignRoleToUser);

roleRoutes.put("/:id", updateRole); 
roleRoutes.delete("/:id", deleteRole); 

export default roleRoutes;
