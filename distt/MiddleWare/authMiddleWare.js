"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_service_1 = require("../services/jwtService");
function authMiddleware(req, res, next) {
    const token = req.cookies.accessToken;
    try {
        const decoded = jwt_service_1.JwtService.verify(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        authRefreshToken(req, res, next);
    }
}
function authRefreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.status(401).json({ error: "Refresh token requerido" });
    try {
        const decoded = jwt_service_1.JwtService.verify(refreshToken);
        req.user = decoded;
        const newAccessToken = jwt_service_1.JwtService.sign({ id: decoded.id, email: decoded.email });
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 1000,
        });
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Refresh token inválido o expirado" });
    }
}