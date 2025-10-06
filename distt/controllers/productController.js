"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.deleteProduct = exports.updateProduct = exports.getProductByName = exports.getAllProducts = void 0;
const Product_1 = require("../models/Product");
const getAllProducts = async (req, res) => {
    try {
        const products = await Product_1.Product.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};
exports.getAllProducts = getAllProducts;
const getProductByName = async (req, res) => {
    try {
        const { name } = req.params;
        const product = await Product_1.Product.findOne({ name: name });
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al buscar el producto', error });
    }
};
exports.getProductByName = getProductByName;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product_1.Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product_1.Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};
exports.deleteProduct = deleteProduct;
const createProduct = async (req, res) => {
    try {
        const product = new Product_1.Product(req.body);
        await product.save();
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};
exports.createProduct = createProduct;