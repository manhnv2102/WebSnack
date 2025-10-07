// controllers/user.controller.ts
import { Request, Response } from "express";
import { handleGetAllUser, registerNewUser } from "../models/user.model";

const getAllUserAPI = async (req: Request, res: Response) => {
  try {
    const data = await handleGetAllUser();
    return res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUserAPI = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body || {};
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    console.log("Body nhận được:", req.body);
    await registerNewUser(name, email, password, phone);
    return res.status(201).json({ message: "Create success" }); // sửa “sucsses”
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createUserAPI, getAllUserAPI };
