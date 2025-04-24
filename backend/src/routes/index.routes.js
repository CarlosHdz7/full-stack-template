import { Router } from "express";

import permissionRoutes from "../modules/permissions/routes/permission.routes.js";
import roleRoutes from "../modules/role/routes/role.routes.js";
import userRoutes from "../modules/user/routes/user.routes.js";
import routerSwagger from "./swaggerDocsRoute.js";
import resourceRouter from "../modules/resource/routes/resource.routes.js";

const routers = Router();

routers.use("/", routerSwagger);

routers.use("/users", userRoutes);
routers.use("/roles", roleRoutes);
routers.use("/permissions", permissionRoutes);
routers.use("/resources", resourceRouter);

export default routers;
