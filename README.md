# Ecommerce API

API RESTful para gestionar productos y carritos de compra.

## Requisitos
- Node.js v16 o superior
- Postman (para pruebas)

## Collection:

## Productos:
GET http://localhost:8080/api/products (listar productos).

GET http://localhost:8080/api/products/1 (obtener producto por ID).

POST http://localhost:8080/api/products (crear producto, con un body 

JSON como {"title": "Producto 1", "description": "Descripción", "code": "ABC123", "price": 100, "stock": 10, "category": "Categoría"}).

PUT http://localhost:8080/api/products/1 (actualizar producto, con body JSON).

DELETE http://localhost:8080/api/products/1 (eliminar producto).

## Carritos:

POST http://localhost:8080/api/carts (crear carrito).

GET http://localhost:8080/api/carts/1 (obtener carrito por ID).

POST http://localhost:8080/api/carts/1/product/1 (agregar producto al carrito).


1. Clonar el repositorio:
```bash
git clone <https://github.com/Lagomar18/Preentrega1_Back.git>   