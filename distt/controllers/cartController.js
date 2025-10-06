"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeCartItem = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const CartSchema_1 = require("../models/CartSchema");
const Product_1 = require("../models/Product");
//Obtenemos carrito del usuario
const getCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await CartSchema_1.Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
};
exports.getCart = getCart;

const addToCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId, cantidad } = req.body;
        const product = await Product_1.Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        if (product.stock < cantidad) {
            return res.status(400).json({ message: 'No hay suficiente stock del producto' });
        }
        let cart = await CartSchema_1.Cart.findOne({ userId });
        if (!cart) {
            cart = new CartSchema_1.Cart({ userId, items: [], totalPrice: 0 });
        }
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.cantidad += cantidad;
        }
        else {
            cart.items.push({ productId, cantidad, precio: product.price, nombre: product.name });
        }
        cart.totalPrice += product.price * cantidad;
        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error });
    }
};
exports.addToCart = addToCart;
//actualizar cantidad de un producto en el carrito
const updateCartItem = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId, cantidad } = req.body;
        const product = await Product_1.Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        if (product.stock < cantidad) {
            return res.status(400).json({ message: 'No hay suficiente stock del producto' });
        }
        let cart = await CartSchema_1.Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (!existingItem) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }
        existingItem.cantidad = cantidad;
        cart.totalPrice = cart.items.reduce((total, item) => total + item.precio * item.cantidad, 0);
        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto en el carrito', error });
    }
};
exports.updateCartItem = updateCartItem;

const removeCartItem = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId } = req.body;
        let cart = await CartSchema_1.Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }
        const item = cart.items[itemIndex];
        cart.totalPrice -= item.precio * item.cantidad;
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto del carrito', error });
    }
};
exports.removeCartItem = removeCartItem;

const clearCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        let cart = await CartSchema_1.Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        cart.items.splice(0, cart.items.length);
        cart.totalPrice = 0;
        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al vaciar el carrito', error });
    }
};
exports.clearCart = clearCart;