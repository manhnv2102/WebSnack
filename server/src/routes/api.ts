import express, { Express } from "express";
import { createUserAPI, getAllUserAPI } from "../controllers/user.controller";

const router = express.Router();

const apiRoutes = (app: Express) => {
  router.get("/users", getAllUserAPI);
  router.post("/users", createUserAPI);
  app.use("/api", router);
};

export { apiRoutes };
