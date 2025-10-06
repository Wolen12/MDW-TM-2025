"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const productroutes_1 = __importDefault(require("./routes/productroutes"));
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const carritoroutes_1 = __importDefault(require("./routes/carritoRoutes"));
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('MONGODB_URI no definido');
    process.exit(1);
}
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/api/products', productroutes_1.default);
app.use('/api/auth', authroutes_1.default);
app.use('/api/users', carritoroutes_1.default);
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    credentials: true,
}));
mongoose_1.default.connect(MONGODB_URI).then(() => {
    console.log('Conexión exitosa!');
}).catch((error) => {
    console.error('Conexión fallida:', error);
    process.exit();
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});