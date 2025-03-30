const CartManager = require('../managers/CartManager');
const cartManager = new CartManager();

const createCart = async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        next(error);
    }
};

const getCartById = async (req, res) => {
    try {
        const cart = await cartManager.getCartById(parseInt(req.params.cid));
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

const addProductToCart = async (req, res) => {
    try {
        const updatedCart = await cartManager.addProductToCart(
            parseInt(req.params.cid),
            parseInt(req.params.pid)
        );
        if (!updatedCart) return res.status(404).json({ error: 'Cart not found' });
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCart,
    getCartById,
    addProductToCart
};