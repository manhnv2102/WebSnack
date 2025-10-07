import express, { Express } from "express";
import {
  createUserAPI,
  getAllUserAPI,
  postLoginAPI,
} from "../controllers/user.controller";

const router = express.Router();

const apiRoutes = (app: Express) => {
  router.get("/users", getAllUserAPI);
  router.post("/register", createUserAPI);
  router.post("/login", postLoginAPI);
  app.use("/api", router);
};

export { apiRoutes };
