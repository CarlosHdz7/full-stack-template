import { Router } from "express";

import {
  addPermission,
  assignPermissionToRole,
  listPermissions,
} from "../controllers/permission.controller.js";

const permissionRoutes = Router();

permissionRoutes.get("/", listPermissions);
permissionRoutes.post("/", addPermission);
permissionRoutes.post("/assign", assignPermissionToRole);

export default permissionRoutes;
