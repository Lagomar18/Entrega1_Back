const fs = require('fs').promises;

class ProductManager {
    constructor() {
        this.path = './src/data/products.json';
    }

    // Lee todos los productos del archivo
    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') return [];
            throw error;
        }
    }

    // Obtiene un producto por ID
    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id);
    }

    // Agrega un nuevo producto
    async addProduct(product) {
        const products = await this.getProducts();
        const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { id: newId, status: true, ...product };
        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    // Actualiza un producto existente
    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;
        products[index] = { ...products[index], ...updatedFields, id };
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    // Elimina un producto por ID
    async deleteProduct(id) {
        const products = await this.getProducts();
        const filteredProducts = products.filter(p => p.id !== id);
        if (filteredProducts.length === products.length) return null;
        await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
        return true;
    }
}

module.exports = ProductManager;