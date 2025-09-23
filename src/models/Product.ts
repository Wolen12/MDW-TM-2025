import mongoose from 'mongoose';

const productschema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required:[true, 'El nombre del producto es obligatorio'],
            maxlength: [100, 'El nombre no puede tener mas de 100 caracteres'],
        },
        description:
        {
            type: String,
            required: [true, 'Descripcion obligatoria'],
        },
        price:
        {
            type: Number,
            required: [true, 'El precio es obligatorio'],
            min: [0, 'El precio no puede ser negativo'],
        },
        category: {
            type: String,
            required: [true, 'La categoría es obligatoria'],
            maxlength: [50, 'La categoría no puede tener más de 50 caracteres'],
        },
        stock: {
            type: Number,
            required: [true, 'El stock es obligatorio'],
            min: [0, 'El stock no puede ser negativo'],
            default: 0,
        },
        imageUrl: {
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    }
)
export const Product = mongoose.model('Product', productschema);