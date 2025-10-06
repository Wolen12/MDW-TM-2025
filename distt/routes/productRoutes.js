"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const createProductDto_1 = require("../dto/createProductDto");
const middleware_1 = __importDefault(require("../MiddleWare/middleWare"));
const router = express_1.default.Router();
const authmiddleware_1 = require("../Middleware/authMiddelWare");
const productcontroller_1 = require("../controllers/productController");
router.get('/', authmiddleware_1.authMiddleware, productcontroller_1.getAllProducts);
router.get('/:name', authmiddleware_1.authMiddleware, productcontroller_1.getProductByName);
router.put('/:id', authmiddleware_1.authMiddleware, productcontroller_1.updateProduct);
router.delete('/:id', authmiddleware_1.authMiddleware, productcontroller_1.deleteProduct);
router.post('/', (0, middleware_1.default)(createProductDto_1.CreateProductDto), productcontroller_1.createProduct);
exports.productRoutes = router;
exports.default = router;