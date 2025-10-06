import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwtService";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.accessToken;
  try {
    const decoded = JwtService.verify(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    authRefreshToken(req, res, next);
  }
}

function authRefreshToken(req: Request, res: Response, next: NextFunction) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "Refresh token requerido" });
  try {
    const decoded = JwtService.verify(refreshToken);
    (req as any).user = decoded;
    const newAccessToken = JwtService.sign({ id: decoded.id, email: decoded.email });
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 1000,
    });
    next();
  } catch (error) {
    res.status(401).json({ error: "Refresh token inválido o expirado" });
  }
}