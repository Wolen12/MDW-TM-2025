"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authService = new auth_service_1.AuthService();
class AuthController {
    static async register(req, res) {
        try {
            const result = await authService.register(req.body);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async login(req, res) {
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
            });
            res.json({ accessToken: result.access_token, message: "Login exitoso" });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async logout(req, res) {
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        res.json({ message: "Logout exitoso" });
    }
}
exports.AuthController = AuthController;