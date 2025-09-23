import {
  registerUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  login,
} from "../controllers/userController";
import express from "express";
import validationMiddleware from "../Middleware/middleware";
import { CreateUserDto } from "../dto/createUserDto";
import { UpdateUserDto } from "../dto/updateUserDto";

const router = express.Router();

router.post("/", validationMiddleware(CreateUserDto), registerUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", validationMiddleware(UpdateUserDto), updateUser);
router.post("/login", login);

export default router;