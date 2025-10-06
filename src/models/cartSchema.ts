import {Schema, model} from 'mongoose';

const cartItemSchema = new Schema(
    {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        cantidad: { type: Number, required: true, min: 1 },
        precio: { type: Number, required: true, min: 0 },
        nombre: { type: String, required: true },
    });

    const cartSchema = new Schema(
        {
            userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            items: [cartItemSchema],
            totalPrice: { type: Number, required: true, min: 0, default: 0 },
            createdAt: { type: Date, default: Date.now },
        }
    );

export const Cart = model('Cart', cartSchema);