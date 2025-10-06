import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import dotenv from "dotenv";

dotenv.config();

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);
      res.cookie("refreshToken", result.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.cookie("accessToken", result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 1000,
      }
      );
      res.json({ accessToken: result.access_token, message: "Login exitoso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  static async logout(req: Request, res: Response) {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ message: "Logout exitoso" });
  }
}