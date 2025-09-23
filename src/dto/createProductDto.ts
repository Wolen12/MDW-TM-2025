import 
{
    IsString,
    IsNumber,
    IsNotEmpty,
    Min,
    IsOptional,
    ValidatorConstraintInterface,
    ValidatorConstraint,
    MinLength,
    MaxLength,
    Validate,
    ValidationArguments,
} from 'class-validator';

import { Product } from '../models/Product';

@ValidatorConstraint({ async: true })
class IsProductNameUnique implements ValidatorConstraintInterface
 {
    async validate(name: string) {
        const product = await Product.findOne({ name });
        return !product; 
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'El nombre del producto ya existe. Por favor, elige otro nombre.';
    }
}
export class CreateProductDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MinLength(5,{message: 'El nombre debe tener al menos 5 caracteres'})
    @MaxLength(20, {message:'El máximo de caracteres es 20'})
    @Validate(IsProductNameUnique)
    name!: string;

    @IsString({ message: 'La descripción debe ser string' })
    @MaxLength(20, {message:'El máximo de caracteres es 20'})
    @IsOptional({message: 'La descripción es opcional'})
    description!: string;


    @IsNotEmpty({message: 'El stock debe ser obligatorio'})
    @IsNumber({}, { message: 'El stock debe ser un número' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock!: number;

    @Min(0, { message: 'El precio debe ser mayor que 0' })
    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsNotEmpty({message: 'El precio debe ser obligatorio'})
    price!: number;


    @IsString({ message: 'La categoría debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    @MaxLength(50, { message: 'La categoría no puede tener más de 50 caracteres' })
    category!: string;

}