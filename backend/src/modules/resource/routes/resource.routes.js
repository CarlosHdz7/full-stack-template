import express from "express";
import {
  addResource,
  deleteResource,
  listResources,
  updateResource,
} from "../controllers/resource.controller.js";

const resourceRouter = express.Router();

resourceRouter.post("/", addResource);
resourceRouter.get("/", listResources);
resourceRouter.put("/:id", updateResource);
resourceRouter.delete("/:id", deleteResource);

export default resourceRouter;
