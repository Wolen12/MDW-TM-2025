import {
  registerUser,
  login
} from "../controllers/userController";
import express from "express";
import validationMiddleware from "../Middleware/middleware";
import { CreateUserDto } from "../dto/createUserDto";

const router = express.Router();

router.post("/register", validationMiddleware(CreateUserDto), registerUser);
router.post("/login", login);

export default router;