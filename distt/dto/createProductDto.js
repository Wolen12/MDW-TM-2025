"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
const Product_1 = require("../models/product");
let IsProductNameUnique = class IsProductNameUnique {
    async validate(name) {
        const product = await Product_1.Product.findOne({ name });
        return !product;
    }
    defaultMessage(validationArguments) {
        return 'El nombre del producto ya existe. Por favor, elige otro nombre.';
    }
};
IsProductNameUnique = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsProductNameUnique);
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto' }),
    (0, class_validator_1.MinLength)(5, { message: 'El nombre debe tener al menos 5 caracteres' }),
    (0, class_validator_1.MaxLength)(20, { message: 'El máximo de caracteres es 20' }),
    (0, class_validator_1.Validate)(IsProductNameUnique),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La descripción debe ser string' }),
    (0, class_validator_1.MaxLength)(20, { message: 'El máximo de caracteres es 20' }),
    (0, class_validator_1.IsOptional)({ message: 'La descripción es opcional' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El stock debe ser obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El stock debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'El stock no puede ser negativo' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.Min)(0, { message: 'El precio debe ser mayor que 0' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El precio debe ser un número' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El precio debe ser obligatorio' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La categoría debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La categoría es obligatoria' }),
    (0, class_validator_1.MaxLength)(50, { message: 'La categoría no puede tener más de 50 caracteres' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);