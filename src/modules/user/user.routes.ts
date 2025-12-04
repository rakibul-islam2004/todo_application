import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// app.use("/users",userRoutes)

// routes -> controller -> service

// create user
router.post("/", userControllers.createUser);

// Get all users
router.get("/", auth("admin"), userControllers.getUsers);

// Get single user
router.get("/:id", userControllers.getSingleUser);

// Update User
router.put("/:id", userControllers.updateUser);

// Delete User
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
