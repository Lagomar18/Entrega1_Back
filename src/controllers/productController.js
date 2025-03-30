const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager();

const getProducts = async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productManager.getProductById(parseInt(req.params.pid));
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newProduct = await productManager.addProduct({
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails: thumbnails || []
        });
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productManager.updateProduct(parseInt(req.params.pid), req.body);
        if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const result = await productManager.deleteProduct(parseInt(req.params.pid));
        if (!result) return res.status(404).json({ error: 'Product not found' });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};