import express from "express";
import {
  addResource,
  listResources,
} from "../controllers/resource.controller.js";

const resourceRouter = express.Router();

resourceRouter.post("/", addResource);
resourceRouter.get("/", listResources);

export default resourceRouter;
