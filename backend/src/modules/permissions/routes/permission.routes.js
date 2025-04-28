import { Router } from "express";

import {
  addPermission,
  assignPermissionToRole,
  deletePermission,
  listPermissions,
  updatePermission,
} from "../controllers/permission.controller.js";

const permissionRoutes = Router();

permissionRoutes.get("/", listPermissions);
permissionRoutes.post("/", addPermission);
permissionRoutes.post("/assign", assignPermissionToRole);
permissionRoutes.put("/:id", updatePermission);
permissionRoutes.delete("/:id", deletePermission);



export default permissionRoutes;
