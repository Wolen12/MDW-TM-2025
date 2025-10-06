"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const hash_service_1 = require("./hash.service");
const jwt_service_1 = require("./jwt.service");
const user_1 = require("../models/user");
class AuthService {
    async register(data) {
        const exists = await user_1.User.findOne({ email: data.email });
        if (exists)
            throw new Error("El email ya está registrado");
        const hashedPassword = await hash_service_1.HashService.hash(data.password);
        const newUser = new user_1.User({
            username: data.username,
            email: data.email,
            password: hashedPassword,
        });
        await newUser.save();
        return { message: "Usuario registrado con éxito", userId: newUser._id };
    }
    async login(data) {
        const user = await user_1.User.findOne({ email: data.email });
        if (!user)
            throw new Error("Usuario no encontrado");
        const isPasswordValid = await hash_service_1.HashService.compare(data.password, user.password);
        if (!isPasswordValid)
            throw new Error("Credenciales inválidas");
        const token = jwt_service_1.JwtService.sign({ id: user._id, email: user.email });
        return { access_token: token, refresh_token: token };
    }
}
exports.AuthService = AuthService;