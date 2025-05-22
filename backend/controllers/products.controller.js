const Product = require('../models/Product');

const getProduct = async (req, res) => {
    try {
        const products = await Product.findAll();
        if (products.length === 0) {
            return res.status(204).json({ message: 'No hay productos' });
        }
        res.status(200).json({ data: products, message: 'Productos encontrados en db' });
    } catch (error) {
        console.error("Error leyendo productos:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ data: product, message: 'Producto encontrado' });
    } catch (error) {
        console.error("Error leyendo producto:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const createProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        const repeatedProduct = await Product.findOne({ where: { name } });
        if (repeatedProduct) {
            return res.status(409).json({ message: `El producto '${name}' ya existe en el sistema.` });
        }

        const newProduct = await Product.create({ name, price, stock });
        res.status(201).json({ data: newProduct, message: 'Producto agregado correctamente' });
    } catch (error) {
        console.error("Error creando producto:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        
        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        if (stock !== undefined) product.stock = stock;

        await product.save();
        res.status(200).json({ data: product, message: 'Producto actualizado correctamente' });
    } catch (error) {
        console.error("Error actualizando producto:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        await product.destroy();
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error("Error eliminando producto:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
