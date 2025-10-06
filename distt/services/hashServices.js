"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class HashService {
    static async hash(password) {
        const salt = await bcrypt_1.default.genSalt(parseInt(process.env.BCRYPT_SALT || "10"));
        return bcrypt_1.default.hash(password, salt);
    }
    static async compare(password, hash) {
        return bcrypt_1.default.compare(password, hash);
    }
}
exports.HashService = HashService;