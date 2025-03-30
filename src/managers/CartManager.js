const fs = require('fs').promises;

class CartManager {
    constructor() {
        this.path = './src/data/carts.json';
    }

    // Lee todos los carritos
    async getCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') return [];
            throw error;
        }
    }

    // Crea un nuevo carrito
    async createCart() {
        const carts = await this.getCarts();
        const newId = carts.length ? Math.max(...carts.map(c => c.id)) + 1 : 1;
        const newCart = { id: newId, products: [] };
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    // Obtiene un carrito por ID
    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(c => c.id === id);
    }

    // Agrega un producto al carrito
    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(c => c.id === cartId);
        if (cartIndex === -1) return null;

        const productIndex = carts[cartIndex].products.findIndex(p => p.product === productId);
        if (productIndex === -1) {
            carts[cartIndex].products.push({ product: productId, quantity: 1 });
        } else {
            carts[cartIndex].products[productIndex].quantity += 1;
        }

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return carts[cartIndex];
    }
}

module.exports = CartManager;